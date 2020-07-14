import React from 'react';
import Lessee from './Lessee';
import Lessor from './Lessor';
import { Container, Tab, Tabs } from 'react-bootstrap';

const Private = () => {
	return (
		<Container>
			<Tabs defaultActiveKey="1" id="uncontrolled-tab-example" dir="rtl">
				<Tab eventKey="1" title="שוכר">
					<Lessee />
				</Tab>
				<Tab eventKey="2" title="משכיר">
					<Lessor />
				</Tab>
			</Tabs>
		</Container>
	);
};

export default Private;
