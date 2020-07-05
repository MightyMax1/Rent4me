import React, { useState } from 'react';
import './App.css';

// Route - render component base on path
import { Route } from 'react-router-dom';

// import component
import MainNavbar from './componets/MainNavbar';
import FooterCont from './componets/FooterCont';

import Home from './pages/Home';
import Help from './pages/Help';
import AddItem from './pages/AddItem';
import PrivatePage from './pages/Private';
import CategoryPage from './pages/Category';

function Messages(props) {
	return 'Messages';
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
			<MainNavbar onLogin={onLogin} user={user} onLogout={onLogout} />
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/addItem" component={AddItem} />
				<Route exact path="/messages" component={Messages} />
				<Route exact path="/help" component={Help} />
				<Route exact path="/private" component={PrivatePage} />
				<Route exact path="/category/:id">
					<CategoryPage />
				</Route>
			</div>
			<footer className="stickyFooter">
				<FooterCont />
			</footer>
		</div>
	);
}

export default App;
