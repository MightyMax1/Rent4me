import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Media, Button, Table } from 'react-bootstrap';
import Api from '../Api';

function FooterCont(props) {

	const [totalItems, setTotalItems] = useState(0);
	const [totalDeals, setTotalDeals] = useState(0);
	const [totalUsers, setTotaUsers] = useState(0);

	useEffect(() => {
		async function getFooterData() {
			const data = await Api.getFooterData();
			setTotaUsers(data.totalUsers);
			setTotalDeals(data.totalOrders);
			setTotalItems(data.totalItems);
		}

		getFooterData();
	}, []);



	return (
		<Container>
			<Row dir="rtl">
				<Col xl={3} md={3} sm={10} xs={10} className="text-right">
					<Media as="li">
						<Media.Body>
							<Button className='text-right' variant="light">אודות</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button className='text-right' variant="light">תנאי תקנון</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button className='text-right' variant="light">צור קשר</Button>
						</Media.Body>
					</Media>
				</Col>
				<Col xl={4} md={4} sm={10} xs={10}>
					<h3 className='text-center'>אנחנו במספרים</h3>
					<Table striped bordered hover>
						<tbody className='text-right'>
							<tr>
								<td>משתמשים רשומים</td>
								<td>{totalUsers}</td>
							</tr>
							<tr>
								<td>סה"כ מוצרים</td>
								<td>{totalItems}</td>
							</tr>
							<tr>
								<td>עסקאות מוצלחות</td>
								<td>{totalDeals}</td>
							</tr>
						</tbody>
					</Table>
				</Col>
				<Col xl={4} md={4} sm={10} xs={10}>
					<h5 className='text-center  font-weight-bold'>עקבו אחרינו</h5>
					<Row className=' mt-3 '>
						<Col>
							<Media as="li">
								<Media.Body>
									<img className="img-fluid" src={process.env.PUBLIC_URL + "/036-facebook.svg"} style={{ width: '75px ', height: '75px' }} />
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src={process.env.PUBLIC_URL + "/001-youtube.svg"} style={{ width: '75px ', height: '75px' }} />
								</Media.Body>
							</Media>
						</Col>
						<Col>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src={process.env.PUBLIC_URL + "/008-twitter.svg"} style={{ width: '75px ', height: '75px' }} />
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src={process.env.PUBLIC_URL + "/029-instagram.svg"} style={{ width: '75px ', height: '75px' }} />
								</Media.Body>
							</Media>
						</Col>
					</Row>
				</Col>
			</Row>
		</Container>
	)
}

export default FooterCont;