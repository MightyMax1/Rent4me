async function myFetch(url, method, body) {
	try {
		const token = localStorage.getItem('token');
		const options = {
			headers: { 'Content-Type': 'application/json', token: token },
			method: method || 'GET',
		};
		options.body = body ? JSON.stringify(body) : undefined;

		const res = await fetch(`http://localhost:4000${url}`, options);
		const data = await res.json();
		return data;
	} catch (err) {
		return {
			err: err.message,
		};
	}
}

function Api() {
	return {
		getOrdersByUserId: async userId => {
			const data = await myFetch(`/products/ordersByUserId?id=${userId}`);
			return data;
		},
		getCurrentUser: async () => await myFetch('/auth/currentUser'),

		login: async body => {
			const data = await myFetch('/auth/login', 'POST', body);
			return data;
		},

		approveBooking: async orderId => myFetch('/orders/approveBooking', 'POST', { orderId: orderId }),
	};
}

const api = Api();

export default api;
