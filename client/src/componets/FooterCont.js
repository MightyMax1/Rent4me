import React from 'react';
import { Row, Col, Media, Button } from 'react-bootstrap';

function FooterCont(props) {
	return (
		<div className='container'>
			<Row dir="rtl">
				<Col className="text-right">
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
				<Col> 
					<h5 className='text-right font-weight-bold'>אנחנו במספרים</h5>
					<Row>
						<Col>
							<Media as="li">
								<Media.Body>
									<div className="text-right">משתמשים רשומים</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="text-right">סה"כ מוצרים</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="text-right">עסקאות מוצלחות</div>
								</Media.Body>
							</Media>
						</Col>
						<Col>
							<Media as="li">
								<Media.Body>
									<div className="text-left">####</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="text-left">####</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="text-left">####</div>
								</Media.Body>
							</Media>
						</Col>
					</Row>
				</Col>
				<Col>
				<h5 className='text-right font-weight-bold'>עקבו אחרינו</h5>
					<Row>
						<Col>
							<Media as="li">
								<Media.Body>
									<img className="img-fluid" src="./036-facebook.svg" width={100} />
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src="./001-youtube.svg" width={100} />
								</Media.Body>
							</Media>
						</Col>
						<Col>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src="./008-twitter.svg" width={100} />
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<img img className="img-fluid" src="./029-instagram.svg" width={100} />
								</Media.Body>
							</Media>
						</Col>
					</Row>
				</Col>
			</Row>
		</div>
	)
}

export default FooterCont;