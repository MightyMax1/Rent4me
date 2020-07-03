import React from 'react';

import { Tab, Tabs } from 'react-bootstrap';

const Private = () => {
	return (
		<Tabs defaultActiveKey="1" id="uncontrolled-tab-example">
			<Tab eventKey="1" title="שוכר">
				שוכר
			</Tab>
			<Tab eventKey="2" title="משכיר">
				משכיר
			</Tab>
		</Tabs>
	);
};

export default Private;
