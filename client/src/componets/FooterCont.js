import React from 'react';
import { Row, Col, Media, Button } from 'react-bootstrap';
import { ReactComponent as Facebook } from './036-facebook.svg'
import { ReactComponent as Twitter } from './008-twitter.svg'
import { ReactComponent as Instagram } from './029-instagram.svg'
import { ReactComponent as YouTube } from './001-youtube.svg'

function FooterCont(props) {
	return (
		<div className='container'>
			<Row>
				<Col className='Follow'> עקבו אחרינו
					<Row>
						<Col>
							<Media as="li">
								<Media.Body>
									<Facebook width={100}/>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<YouTube width={100}/>
								</Media.Body>
							</Media>
						</Col>
						<Col>
							<Media as="li">
								<Media.Body>
									<Twitter width={100}/>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<Instagram width={100}/>
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
									<div className="footerText">Registerd users</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">Num of products</div>
								</Media.Body>
							</Media>
							<Media as="li">
								<Media.Body>
									<div className="footerText">Succesfull Deals</div>
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
							<Button variant="light">About Us</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button variant="light">Terms & Conditions</Button>
						</Media.Body>
					</Media>
					<Media as="li">
						<Media.Body>
							<Button variant="light">About Us</Button>
						</Media.Body>
					</Media>
				</Col>
			</Row>
		</div>
		)
}

export default FooterCont;