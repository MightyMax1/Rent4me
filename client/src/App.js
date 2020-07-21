import React, { useState, useEffect } from 'react';
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
import HistoryLessee from './pages/historyLessee';
import BookingLessee from './pages/BookingLessee';
import CurrentLessee from './pages/CurrentLessee';

import Loading from './componets/Loading';
import Api from './Api.js';

function Messages(props) {
	return 'Messages';
}

function App() {
	const [user, setUser] = useState(null);

	const [loading, setLoading] = useState(true);

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

	// use effect run after render
	useEffect(() => {
		async function getCurrent() {
			const token = localStorage.getItem('token');
			if (!token) {
				return setLoading(false);
			}
			const data = await Api.getCurrentUser();
			if (data.err) {
				return setLoading(false);
			}
			setUser(data);
			setLoading(false);
		}
		getCurrent();
	}, []);

	if (loading) {
		// wait until fetch current user finish
		return (
			<Loading />
		)
	}

	return (
		<div className="App">
			<MainNavbar onLogin={onLogin} user={user} onLogout={onLogout} className=" mb-3" />
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/addItem" component={AddItem} />
					<Route exact path="/messages" component={Messages} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/register">
						<Register onLogin={onLogin} />
					</Route>

					{/* lessor section */}
					<Route exact path="/private/lessor/booking">
						<BookingLessor user={user} />
					</Route>
					<Route exact path="/private/lessor/current_rent" component={CurrentLessor} />
					<Route exact path="/private/lessor/history" component={HistoryLessor} />
					{/* lessee section */}
					<Route exact path="/private/lessee/booking" component={BookingLessee} />
					<Route exact path="/private/lessee/history" component={HistoryLessee} />
					<Route exact path="/private/lessee/current_rent" component={CurrentLessee} />

					<Route path="/private" component={PrivatePage} />
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
