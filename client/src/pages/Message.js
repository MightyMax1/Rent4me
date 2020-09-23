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

	const onMessageSocket = ({ message }) => {
		console.log('on Message', message);
		console.log('aaa', messages);
		console.log('bb', [...messages, message]);
		setMessages([...messages, message]);
	};

	useEffect(() => {
		async function getAllMessages() {
			const data = await Api.getMessageByChatId(id);
			console.log('data', data);
			setMessages(data);
			if (!data[0]) return;

			const friendID = data[0].sender._id != user._id ? data[0].sender._id : data[0].receiver._id;
			const friendObj = await Api.getUserById(friendID);
			setFriend(friendObj);
		}

		getAllMessages();
	}, []);

	useEffect(() => {
		window.socket.on('NEW_MESSAGE', onMessageSocket);
		return () => {
			window.socket.off('NEW_MESSAGE', onMessageSocket);
		};
	}, [messages]);

	const onMessage = e => {
		const { value } = e.target;
		setMessage(value);
	};

	const sendMessage = e => {
		e.preventDefault();
		// send message to server with socket
		window.socket.emit('MESSAGE', { user, message, receiver: friendOBJ }, newMessage => {
			setMessages([...messages, newMessage]);
		});
		document.getElementById('textAreaMSG').value = '';
	};

	console.log('messages', messages);

	return (
		<Container>
			<h3></h3>
			<Jumbotron>
				{messages.map(messageObj => {
					return (
						<Card className="bm-5" xl={8} className="mt-2" message={messageObj._id}>
							<Card.Header as={Row} className="" dir="rtl">
								<Col md={{ span: 1, offset: 1 }} sm={3} xs={10}>
									<Image style={{ height: '85px', width: '85px' }} src={messageObj.sender.profilepPic} roundedCircle />
								</Col>
								<Col md={8} sm={8} xs={8} className="pt-3 text-right">
									<Card.Title>{`${messageObj.sender.firstName} ${messageObj.sender.lastName}`}</Card.Title>
								</Col>
							</Card.Header>
							<Card.Body className="text-right">
								<p>{messageObj.message.text}</p>
							</Card.Body>
							<Card.Footer className="text-right">{format(messageObj.message.date, 'dd-MM-yyyy HH:mm')}</Card.Footer>
						</Card>
					);
				})}
				<Form className="mt-3" dir="rtl">
					<h3 className="text-center">שלח הודעה</h3>
					<Row>
						<Col xl="12">
							<Form.Control
								as="textarea"
								rows="3"
								id="textAreaMSG"
								name="message"
								onChange={onMessage}
								placeholder="רשום הודעה כאן"
							/>
						</Col>
						<Col className="mt-3 " xl="3">
							<Button variant="primary" onClick={sendMessage} block>
								שלח
							</Button>
						</Col>
					</Row>
				</Form>
			</Jumbotron>
		</Container>
	);
};

export default Message;
