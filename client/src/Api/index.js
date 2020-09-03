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

		getOrdersByItemId: async (itemID) => {
			const data = await myFetch(`/products/ordersByItemId?id=${itemID}`);
			return data;
		},

		getItemsBySearchWord: async word => {
			const data = await myFetch(`/products/itemsBySearch?searchWord=${word}`);
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

		sendItemReview: async body => myFetch('/products/addReview', 'POST', body),

		getReviews: async id => myFetch(`/products/getReview?itemID=${id}`),

		login: async body => {
			const data = await myFetch('/auth/login', 'POST', body);
			return data;
		},

		// users
		getCurrentUser: async () => await myFetch('/auth/currentUser'),

		getUserById: async id => await myFetch(`/users/${id}`),

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

		getItemsByLessorID: async userId => {
			const data = await myFetch(`/products/getItemsByLessorID?id=${userId}`);
			return data;
		},


		getMessageByChatId: async id => myFetch(`/messages/chat/${id}`),


		getChatsByUserId: async id => await myFetch(`/chats/user/${id}`),

		getFooterData: async () => await myFetch('/footerData'),

		getLastMessageByChatID: async chatID => await myFetch(`/messages/chatLastMsg/${chatID}`),
	};

}

const api = Api();

export default api;
