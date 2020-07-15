import React, { useState } from 'react';
import './App.css';

// Route - render component base on path
import { Route, useHistory, Switch } from 'react-router-dom';

// import component
import MainNavbar from './componets/MainNavbar';
import FooterCont from './componets/FooterCont';

import Home from './pages/Home';
import Register from './pages/Register';
import Help from './pages/Help';
import AddItem from './pages/AddItem';
import PrivatePage from './pages/Private';
import CategoryPage from './pages/Category';
import Item from './pages/Item';
import BookingLessor from './pages/BookingLessor';
import CurrentLessor from './pages/CurrentLessor';
import HistoryLessor from './pages/HistoryLessor';

function Messages(props) {
	return 'Messages';
}

function App() {
	const [user, setUser] = useState(null);

	const history = useHistory();

	// when user login -> save user object in state
	const onLogin = newUser => setUser(newUser);

	// when user log out -> delete user object and token
	const onLogout = () => {
		setUser(null);
		localStorage.removeItem('token');

		//redirect to homePage when logOut
		history.push('/');
	};

	return (
		<div className="App">
			<MainNavbar onLogin={onLogin} user={user} onLogout={onLogout} className=" mb-3" />
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/addItem" component={AddItem} />
					<Route exact path="/messages" component={Messages} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/private/lessor/booking">
						<BookingLessor user={user} />
					</Route>
					<Route exact path="/private/lessor/current_rent" component={CurrentLessor} />
					<Route exact path="/private/lessor/history" component={HistoryLessor} />
					<Route path="/private" component={PrivatePage} />
					<Route exact path="/register">
						<Register onLogin={onLogin} />
					</Route>
					<Route exact path="/category/:id">
						<CategoryPage />
					</Route>
					<Route exact path="/item/:id">
						<Item user={user} />
					</Route>
				</Switch>
			</div>
			<footer className="sticky-bottom mt-5">
				<FooterCont />
			</footer>
		</div>
	);
}

export default App;
