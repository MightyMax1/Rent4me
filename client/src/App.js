import React from 'react';
import logo from './logo.svg';
import './App.css';

// Route - render component base on path
import { Route } from 'react-router-dom';

// import component
import Navbar from './componets/Navbar';

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
			<Navbar />
			<div>
				<Route exact path="/" component={Home} />
				<Route exact path="/addItem" component={AddItem} />
				<Route exact path="/messages" component={Messages} />
				<Route exact path="/help" component={Help} />
			</div>
		</div>
	);
}

export default App;
