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
		getOrdersByUserId: async (userId, userType) => {
			const data = await myFetch(`/products/ordersByUserId?id=${userId}&userType=${userType}`);
			return data;
		},

		confirmReceivingItem: async (orderId, userType) => {
			const data = await myFetch('/orders/confirmReceiveItem', 'POST', { userType, orderId });
			return data;
		},

		approveBooking: async orderId => {
			const userType = 'lessor';
			const data = await myFetch('/orders/approveBooking', 'POST', { orderId, userType });
			return data;
		},

		login: async body => {
			const data = await myFetch('/auth/login', 'POST', body);
			return data;
		},

		getCurrentUser: async () => await myFetch('/auth/currentUser'),

		getCategories: async () => await myFetch('/products/categories'),

		getProductsByCategoryId: async id => await myFetch(`/products/category/${id}`),

		getDataHomePage: async () => await myFetch('/products/homePage'),

		getItemById: async id => await myFetch(`/products/item/${id}`),

		addNewItem: async body => await myFetch('/products/addItem', 'POST', body),

		addNewUser: async body => await myFetch('/auth/signup', 'POST', body),

		addNewOrder: async body => {
			const data = await myFetch('/products/orderItem', 'POST', body);
			return data;
		},

	};
}

const api = Api();

export default api;
