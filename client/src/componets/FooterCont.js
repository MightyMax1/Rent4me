import React from 'react';
import { Row, Col, Media, Button } from 'react-bootstrap';

function FooterCont(props) {
	return (
		<div className='container'>
			<Row>
				<Col className='Follow'> עקבו אחרינו
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
				<Col className='OurNumbers'> אנחנו במספרים
					<Row>
						<Col>
							<Media as="li">
								<Media.Body>
									<div className="footerText">משתמשים רשומים</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">סה"כ מוצרים</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">עסקאות מוצלחות</div>
								</Media.Body>
							</Media>
						</Col>
						<Col>
							<Media as="li">
								<Media.Body>
									<div className="footerText">####</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">####</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">####</div>
								</Media.Body>
							</Media>
						</Col>
					</Row>
				</Col>
				<Col className='Bar'>
					<Media as="li">
						<Media.Body>
							<Button variant="light">אודות</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button variant="light">תנאי תקנון</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button variant="light">צור קשר</Button>
						</Media.Body>
					</Media>
				</Col>
			</Row>
		</div>
	)
}

export default FooterCont;