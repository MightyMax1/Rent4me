import React, { useState } from 'react';
import './App.css';

// Route - render component base on path
import { Route } from 'react-router-dom';

// import component
import MainNavbar from './componets/MainNavbar';
import FooterCont from './componets/FooterCont';

import Home from './pages/Home';
import Register from './pages/Register';
import AddItem from './pages/AddItem';
import PrivatePage from './pages/Private';
import CategoryPage from './pages/Category';

function Messages(props) {
	return 'Messages';
}

function Help(props) {
	return 'Help';
}

function App() {
	const [user, setUser] = useState(null);


	// when user login -> save user object in state 
	const onLogin = newUser => setUser(newUser);


	// when user log out -> delete user object and token
	const onLogout = () => {
		setUser(null);
		localStorage.removeItem('token');
	};

	return (
		<div className="App">
			<MainNavbar onLogin={onLogin} user={user} onLogout={onLogout} className=" mb-3" />
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/addItem" component={AddItem} />
				<Route exact path="/messages" component={Messages} />
				<Route exact path="/help" component={Help} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/private" component={PrivatePage} />
				<Route exact path="/category/:id">
					<CategoryPage />
				</Route>
			</div>
			<footer className="sticky-bottom mt-5">
				<FooterCont />
			</footer>
		</div>
	);
}

export default App;
