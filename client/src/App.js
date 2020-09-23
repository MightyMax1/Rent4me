import React, { useState, useEffect } from 'react';
import './App.css';

// Route - render component base on path
import { Route, useHistory, Switch } from 'react-router-dom';

import io from 'socket.io-client';

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
import LessorItems from './pages/LessorItems';
import BookingLessor from './pages/BookingLessor';
import CurrentLessor from './pages/CurrentLessor';
import HistoryLessor from './pages/HistoryLessor';
import HistoryLessee from './pages/historyLessee';
import BookingLessee from './pages/BookingLessee';
import CurrentLessee from './pages/CurrentLessee';
import MessagesList from './pages/MessagesList';
import Message from './pages/Message';
import Search from './pages/Search';

import Loading from './componets/Loading';
import Api from './Api';

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
			// let baseUrl = 'localhost:4000';
			// if (process.env.NODE_ENV === 'production') {
			// 	baseUrl = 'glacial-cliffs-91994.herokuapp.com';
			// }
			// window.socket = io(`https://${baseUrl}?token=${token}`);

			const url = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000' : '/';
			if (!window.socket.id) {
				window.socket = io(`${url}?token=${token}`);
				window.socket.on('connect', () => {
					console.log('client id', window.socket.id);
				});
			}

			const user = await Api.getCurrentUser();
			console.log('current:', user);
			console.log('curre111111111nt');

			setUser(user);
			setLoading(false);
		}

		getCurrent();
	}, []);

	//loading page effect
	if (loading) {
		// wait until fetch current user finish
		return <Loading />;
	}

	return (
		<div className="App">
			<MainNavbar onLogin={onLogin} user={user} onLogout={onLogout} className=" mb-3" />
			<div>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/addItem" component={AddItem} />
					<Route exact path="/help" component={Help} />
					<Route exact path="/messages">
						<MessagesList user={user} />
					</Route>
					<Route exact path="/messages/message/:id">
						<Message user={user} />
					</Route>
					<Route exact path="/register">
						<Register onLogin={onLogin} />
					</Route>
					<Route exact path="/search/:searchWord">
						<Search />
					</Route>

					{/* lessor section */}
					<Route exact path="/edit_items">
						<LessorItems user={user} />
					</Route>
					<Route exact path="/private/lessor/booking">
						<BookingLessor user={user} />
					</Route>
					<Route exact path="/private/lessor/current_rent">
						<CurrentLessor user={user} />
					</Route>
					<Route exact path="/private/lessor/history">
						<HistoryLessor user={user} />
					</Route>
					{/* lessee section */}
					<Route exact path="/private/lessee/booking">
						<BookingLessee user={user} />
					</Route>
					<Route exact path="/private/lessee/current_rent">
						<CurrentLessee user={user} />
					</Route>
					<Route exact path="/private/lessee/history">
						<HistoryLessee user={user} />
					</Route>

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
