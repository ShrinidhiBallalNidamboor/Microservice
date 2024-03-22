// Home.js

import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import Link
// import SprintDashboard from './Analysis/SprintDashboard';
import ProjectSidebar from '../Project Management/ProjectSidebar'; 
import { useCookies } from 'react-cookie';
import '../../css/chat.scss';

const Chat = ({ socket }) => {

    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const { projectId } = useParams();

    const [cookies, setCookie] = useCookies(['token']);
    const token = cookies.token;

    if (!token) {
        navigate('/login');
    }
    console.log(token);
    console.log(socket.id);
    useEffect(() => {
        fetch("http://localhost:7000/chat/" + projectId)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setMessages(data);
            })
            .catch(err => {
                console.log(err);
            })
        // socket.on('output',(data) => { //recieves the entire chat history upon logging in between two users and displays them
        //     console.log(data);
        //     setMessages(data);
        //     // chatMessages.scrollTop=chatMessages.scrollHeight;
        // });

        socket.on('message', (data) => { //recieves a message and displays it

            console.log("Received message", data);
            // const newMessages = [...messages, data];
            // console.log(newMessages);
            // setMessages(newMessages);
            setMessages((prev) => {
                return [...prev, data];
            });
        });


        // setMessages([]);
        // console.log("Logging in");
        socket.emit('userDetails', { fromUser: token, toUser: projectId }); //emits details of established chat

        return () => socket.off("message"); // add this line to your code
    }, [socket]);


    const handleSubmitMessage = () => {
        console.log("Snending message", message);
        socket.emit('chatMessage', {
            from: token,
            to: projectId,
            msg: message,
        });
        setMessage("");
    }



    // socket.on('clear',() => { //recieves a message and displays it
    //     clear();
    //     console.log('Cleared workspace');
    //     chatMessages.scrollTop=chatMessages.scrollHeight;
    // });

    return (
        <div>
            <Navbar active="projects" />
            <div className='chat'>
                <div className="row">
                    <div className="col-2">
                        <ProjectSidebar active="chat" projectId={projectId}></ProjectSidebar>
                    </div>
                    <div className='col'>
                        <div class="chat-container">
                                <h3 className='mx-4 my-2'>Team Chat</h3>
                            <main class="chat-main">
                                {/* <div class="chat-sidebar"> */}
                                {/* <button class="btn2" onclick="join"><i class="fas fa-paper-plane"></i> Connect </button>                            <input id="from" type="hidden" value="<%-empID%>" /> */}
                                {/* <input id="to" type="hidden" value="<%-projectID%>" /> */}
                                {/* </div> */}
                                <div class="chat-messages">
                                    {messages?.map((message) => {
                                        return (
                                            <div className='message'>
                                                <p className='meta'>
                                                    {message.from}
                                                    <span>{message.time} {message.date}</span>
                                                </p>
                                                <p>
                                                    {message.message}
                                                </p>
                                            </div>

                                        )
                                    })}
                                </div>
                            </main>
                            <div class="chat-form-container">

                                <input
                                    id="msg"
                                    type="text"
                                    placeholder="Enter Message"
                                    required
                                    autocomplete="off"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                                <button class="btn btn-primary" onClick={handleSubmitMessage}> Send</button>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Chat;
