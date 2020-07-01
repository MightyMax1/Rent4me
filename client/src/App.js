import React from 'react';
import './App.css';

// Route - render component base on path
import { Route } from 'react-router-dom';

// import component
import MainNavbar from './componets/MainNavbar';
import FooterCont from './componets/FooterCont';

import Home from './pages/Home';
import AddItem from './pages/AddItem';

function Messages(props) {
	return 'Messages';
}

function Help(props) {
	return 'Help';
}

function App() {
	return (
		<div className="App">
			<MainNavbar />
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/addItem" component={AddItem} />
				<Route exact path="/messages" component={Messages} />
				<Route exact path="/help" component={Help} />
			</div>
			<footer className='stickyFooter' >
				<FooterCont />
			</footer>
		</div>
	);
}

export default App;
