import React, { useState, useEffect } from 'react';
import { Container, Jumbotron, Row, Col, Button, Card, Image, Form } from 'react-bootstrap';

import { useParams } from 'react-router-dom';

import { format } from 'date-fns';

import Api from '../Api';

const Message = ({ user }) => {
	const { id } = useParams();
	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [friendOBJ, setFriend] = useState({});



	useEffect(() => {
		async function getAllMessages() {
			const data = await Api.getMessageByChatId(id);
			console.log('data', data);
			setMessages(data);

			const friendID = (data[0].sender._id != user._id) ? data[0].sender._id : data[0].receiver._id;
			const friendObj = await Api.getUserById(friendID);
			setFriend(friendObj);

		}

		getAllMessages();
	}, []);

	const onMessage = e => {
		const { value } = e.target;
		setMessage(value);
	};

	const sendMessage = e => {
		e.preventDefault();
		// send message to server with socket
		window.socket.emit('MESSAGE', { user, message, receiver: friendOBJ });
		document.getElementById('textAreaMSG').value = '';
	};

	return (
		<Container>
			<h3></h3>
			<Jumbotron>
				{messages.map(messageObj => {
					return (
						<Card className="mt-2" message={messageObj._id}>
							<Card.Header as={Row} className="" dir="rtl">
								<Col md={1} sm={2} xs={2} className=" text-right">
									<svg
										width="3em"
										height="3em"
										viewBox="0 0 16 16"
										class="bi bi-person-circle"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg">
										<path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z" />
										<path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
										<path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" />
									</svg>
								</Col>
								<Col md={2} className="pt-3 text-right">
									<Card.Title>{messageObj.sender.firstName}</Card.Title>
								</Col>
							</Card.Header>
							<Card.Body as={Row} className="text-right">
								<p>{messageObj.message.text}</p>
							</Card.Body>
							<Card.Footer className="text-right">{format(messageObj.message.date, 'dd-MM-yyyy HH:mm')}</Card.Footer>
						</Card>
					);
				})}
				<Form className='mt-3' dir='rtl'>
					<h3 className='text-center'>
						שלח הודעה
					</h3>
					<Row>
						<Col xl='12'>
							<Form.Control as="textarea" rows="3" id="textAreaMSG" name="message" onChange={onMessage} placeholder='רשום הודעה כאן' />
						</Col>
						<Col className='mt-3 ' xl='3' >
							<Button variant="primary" onClick={sendMessage} block >
								שלח
							</Button>
						</Col>
					</Row>

				</Form>
			</Jumbotron>
		</Container >
	);
};

export default Message;
