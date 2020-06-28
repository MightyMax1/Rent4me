import React, { useState } from 'react';

// history hook for use browser history api
import { useHistory } from 'react-router-dom';

import { Form, FormGroup, FormLabel, Button, Container, Col, Row, Image } from 'react-bootstrap'

// convert file to base64
const toBase64 = file =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = error => reject(error);
	});

function AddItem() {
	const [form, setForm] = useState({});
	// create history instance
	const history = useHistory();

	// on form change callback
	async function onChange(event) {
		// read data from input that changed (event.target)
		const { name, value, files } = event.target;

		// handle change for input name images
		if (name == 'images') {
			const newImages = [];
			if (files) {
				// for every file that user upload, convert it to base64
				for (let image of files) {
					const res = await toBase64(image);
					newImages.push(res);
				}
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
		const res = await fetch('http://localhost:4000/products', {
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
			<form dir="rtl" className="form" onChange={onChange} onSubmit={onSubmit} >
				<Container fluid={true} style={{ maxWidth: "430px", }} >
					<FormGroup as={Row} className="title">
						<FormLabel  >
							כותרת:
						</FormLabel>
						<Form.Control size="sm" type="text" name="title" placeholder="הכנס כותרת" />
					</FormGroup>
					<FormGroup as={Row} className="description">
						<FormLabel>
							תיאור מוצר:
					</FormLabel>
						<Form.Control size="sm" type="text" name="description" placeholder="הכנס תיאור מוצר" />
					</FormGroup>
					<FormGroup as={Row} className="category">
						<FormLabel>קטגוריה</FormLabel>
						<Form.Control size="sm" as="select" name="category" id="">
							<option value="1">itme</option>
							<option value="2">itme</option>
							<option value="3">itme</option>
						</Form.Control>
					</FormGroup>
					<Form.Row xl={12}>
						<FormGroup as={Col} md={6} >
							<FormLabel>
								מחיר לפי שעה:
							</FormLabel>
							<Form.Control size="sm" type="text" name="priceHour" placeholder='הכנס מחיר לפי שעה בש"ח' />
						</FormGroup>
						<FormGroup as={Col} md={6} >
							<FormLabel>
								מחיר לפי יום:
							</FormLabel>
							<Form.Control size="sm" type="text" name="priceDay" placeholder='הכנס מחיר ליום בש"ח' />
						</FormGroup>
					</Form.Row>
					<FormGroup as={Row} className="images">
						<FormLabel>
							הוסף תמונות :
						</FormLabel>
						<Form.File name="images" multiple />
					</FormGroup>
					<Button type="submit" variant="primary" size="md" block>הוסף מוצר</Button>
				</Container>
			</form>
			<Row className="imagesPreviw">
				{form.images &&
					form.images.map((img, i) => {
						return (
							<FormGroup as={Col}>
								<Form.Check />
								<Image width="170" height="180" key={i} src={img} alt="prev" rounded />
							</FormGroup>

						);
					})}
			</Row>
		</Container>

	);
}

export default AddItem;
