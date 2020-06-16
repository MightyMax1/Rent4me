import React, { useState } from 'react';

// history hook for use browser history api
import { useHistory } from 'react-router-dom';

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

		// handle chang for input name images
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

      // send request ot server add new product 
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
		<div>
			<form className="form" onChange={onChange} onSubmit={onSubmit}>
				<div className="title">
					title: <input type="text" name="title" />
				</div>
				<div className="description">
					description: <input type="text" name="description" />
				</div>
				<div className="category">
					category:
					<select name="category" id="">
						<option value="1">itme</option>
						<option value="2">itme</option>
						<option value="3">itme</option>
					</select>
				</div>

				<div className="price_hour">
					price_hour:
					<input type="text" name="priceHour" />
				</div>
				<div className="price_day">
					price_day:
					<input type="text" name="priceDay" />
				</div>
				<div className="images">
					images:
					<input type="file" name="images" multiple />
				</div>
				<button>Add Item</button>
			</form>
			<div className="imagesPreviw">
				{form.images &&
					form.images.map((img, i) => {
						return (
							<div>
								<input type="checkbox" />
								<img width="200" height="200" key={i} src={img} alt="prev" />
							</div>
						);
					})}
			</div>
		</div>
	);
}

export default AddItem;
