import React from 'react';
import Lessee from './Lessee';
import Lessor from './Lessor';
import { Container, Tab, Tabs } from 'react-bootstrap';

import { Route, NavLink, Redirect, Switch } from 'react-router-dom';

const Private = props => {
	console.log('ppp', props);
	const { path } = props.match;
	return (
		<Container>
			{/* <Tabs defaultActiveKey="1" id="uncontrolled-tab-example" dir="rtl">
				<Tab eventKey="1" title="שוכר"></Tab>
				<Tab eventKey="2" title="משכיר"></Tab>
			</Tabs> */}
			<div>
				<NavLink to={`${path}/lessee`}>Lessee</NavLink>
				<NavLink to={`${path}/lessor`}>Lessor</NavLink>
			</div>
			<Switch>
				<Route exact path={`${path}/lessee`}>
					<Lessee />
				</Route>
				<Route exact path={`${path}/lessor`}>
					<Lessor />
				</Route>
				<Redirect to={`${path}/lessee`} />
			</Switch>
		</Container>
	);
};

export default Private;
