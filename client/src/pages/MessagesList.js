import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import Api from '../Api';



const MessagesList = ({ user }) => {
	const [messages, setMessages] = useState({});
	const [chats, setChats] = useState([]);

	useEffect(() => {
		console.log('use effect');

		async function getChats() {
			let newChats = [];
			const chats = await Api.getChatsByUserId(user._id);
			for (const chat of chats) {
				const friendId = chat.participants.find(id => id !== user._id);
				const friend = await Api.getUserById(friendId);

				newChats.push({
					chat,
					friend,
				});
			}

			setChats(newChats);
		}

		getChats();
	}, []);

	const history = useHistory();

	console.log('chats', chats);

	return (
		<Container>
			{chats.map(({ chat, friend }) => {
				return (
					<Card key={chat._id} onClick={() => history.push(`messages/message/${chat._id}`)} >
						<Card.Body as={Row} dir="rtl" className="card-hover">
							<Col md={1} sm={1} xs={2}>
								<Image src={friend.profilepPic} style={{ height: "50px", width: "50px" }} roundedCircle />
							</Col>
							<Col md={{ span: 2, offset: 6 }} sm={3} xs={5} className="mt-2">
								<Card.Title>
									{friend.firstName} {friend.lastName}
								</Card.Title>
							</Col>
							<Col md={{ span: 2 }} sm={3} xs={5} className="text-muted mt-2">
								18/18/2018 18:00
							</Col>
						</Card.Body>
					</Card>
				);
			})}
		</Container>
	);
};

export default MessagesList;
