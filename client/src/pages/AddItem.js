import React, { useState, useEffect } from 'react';
// history hook for use browser history api
import { useHistory } from 'react-router-dom';
import { Form, FormGroup, FormLabel, Button, Container, Col, Row, Image } from 'react-bootstrap'

//TODO: add user id in serverSide (db->products.js)

// convert file to base64
const toBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

function AddItem() {
	//add creation time of item
	//time format "dd/mm/yyyy"
	const [form, setForm] = useState({});

	const [categories, setCategories] = useState([]);

	// create history instance
	const history = useHistory();

	useEffect(() => {
		async function getCategories() {
			const res = await fetch('http://localhost:4000/products/categories');
			const data = await res.json();

			console.log('data', data);
			setCategories(data.categories);
		}
		getCategories(); // function call
	}, []);




	// on form change callback
	async function onChange(event) {
		// read data from input that changed (event.target)
		const { name, value, files } = event.target;

		// handle change for input name images
		if (name == 'images') {
			const showImgSection = document.querySelector("#imagesPreviwTitle");
			const newImages = [];
			if (files) {
				// for every file that user upload, convert it to base64
				for (let image of files) {
					const res = await toBase64(image);
					newImages.push(res);
				}
				//show title on image preview
				showImgSection.classList.remove("invisible")
			}
			// update state with new files of base64
			return setForm({ ...form, [name]: newImages });
		}
		// other inputs handler
		setForm({ ...form, [name]: value });
	}

	async function onSubmit(event) {
		// prevent form refresh page (default behavior of html forms)
		event.preventDefault();

		// send request to server add new product 
		const res = await fetch('http://localhost:4000/products/addItem', {
			method: 'POST',
			body: JSON.stringify(form),
			headers: {
				'Content-Type': 'application/json',
				token:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im15ZW1haWwiLCJpYXQiOjE1OTIzMTY4OTB9.Al1XPGmfzjZOELnKigIPBFNEZ0Nbfi3_J2iNLUFADNM',
			},
		});
		const data = await res.json();
		console.log('data', data);

		// use history instance for redirect to private page
		history.push('/private');
	}

	console.log('form', form);
	return (
		<Container >
			<form onChange={onChange} onSubmit={onSubmit} dir="rtl"  >
				<Container fluid={true} className={"border-right border-left px-5"} style={{ maxWidth: "430px", }} >
					<FormGroup as={Row} className="title" >
						<FormLabel  >
							כותרת:
						</FormLabel>
						<Form.Control size="sm" type="text" name="title" placeholder="הכנס כותרת" minlength="2" required />
					</FormGroup>
					<FormGroup as={Row} size="sm" className="description">
						<FormLabel>
							תיאור מוצר:
						</FormLabel>
						<Form.Control as="textarea" name="description" rows="3" placeholder=" הכנס תיאור מוצר עד 255 תווים" maxlength="255" required />
					</FormGroup>
					<FormGroup as={Row} className="category">
						<FormLabel>קטגוריה</FormLabel>
						<Form.Control size="sm" as="select" name="category" required>
							<option value="">בחר קטגוריה...</option>
							{categories.map((cat) => {
								return <option value={cat._id}>{cat.name}</option>
							})}
						</Form.Control>
					</FormGroup>
					<Form.Row xl={12}>
						<FormGroup as={Col} md={6} >
							<FormLabel>
								מחיר לפי שעה:
							</FormLabel>
							<Form.Control size="sm" type="number" name="priceHour" placeholder='הכנס מחיר לפי שעה בש"ח' min="1" step="0.5" max="10000" required />
						</FormGroup>
						<FormGroup as={Col} md={6} >
							<FormLabel>
								מחיר לפי יום:
							</FormLabel>
							<Form.Control size="sm" type="number" name="priceDay" placeholder='הכנס מחיר ליום בש"ח' min="1" step="0.5" max="10000" required />
						</FormGroup>
					</Form.Row>
					<FormGroup as={Row} className="images">
						<FormLabel>
							הוסף תמונות :
						</FormLabel>
						<Form.File name="images" multiple required />
					</FormGroup>
					<Button type="submit" variant="primary" size="md" block>הוסף מוצר</Button>
				</Container>
				<Container>
					<p as={Row} className="text-muted text-center invisible " id="imagesPreviwTitle">בחר תמונה ראשית</p>
					<Row className="imagesPreviw" >
						{form.images &&
							form.images.map((img, i) => {
								return (
									<FormGroup key={i} as={Col} xl={3} md={3} sm={6} xs={6}>
										<Form.Check required="required" type="radio" name="mainImg" value={img} />
										<Image width="170" height="180" src={img} alt="prev" rounded />
									</FormGroup>
								);
							})}
					</Row>
				</Container>
			</form>

		</Container>

	);
}

export default AddItem;
