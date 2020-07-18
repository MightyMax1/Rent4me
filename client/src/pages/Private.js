import React from 'react';
import Lessee from './Lessee';
import Lessor from './Lessor';
import { Container, Tab, Tabs, Nav } from 'react-bootstrap';

import { Route, NavLink, Redirect, Switch, Link, Item } from 'react-router-dom';

const Private = props => {
	console.log('ppp', props);
	const { path } = props.match;
	return (
		<Container>

			<div>
				{/* <Nav variant="pills" fill defaultActiveKey="link-1"> */}
				<Nav variant="tabs" fill >
					<Nav.Item>
						<Nav.Link as={Link} to={`${path}/lessee`} eventKey="link-1">שוכר</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link as={Link} to={`${path}/lessor`} eventKey="link-2">משכיר</Nav.Link>
					</Nav.Item>
				</Nav>
			</div>
			<Switch>
				<Route exact path={`${path}/lessee`}>
					<Lessee />
				</Route>
				<Route exact path={`${path}/lessor`}>
					<Lessor />
				</Route>
				{/* on first enter to private path (default route) */}
				<Redirect to={`${path}/lessee`} />
			</Switch>
		</Container>
	);
};

export default Private;
