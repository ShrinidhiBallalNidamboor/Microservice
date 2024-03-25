import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar';
import '../../css/Answers.css'
import { useAuth } from '../AuthProvider';

const AddQuestion = () => {
    const [answers, setAnswers] = useState([]);
    const [question, setquestion] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [userName, setUserName] = useState('');
    const [tag1, settag1] = useState('');
    const [tag2, settag2] = useState('');
    const [tag3, settag3] = useState('');

    
    const {user} = useAuth();
    
    const userid=user.userId;
    const orgid=user.orgId;


    function sanitizeInput(input) {
        // Replace single quotes with an empty string or escape them
        return input.replace(/'/g, ''); // This removes single quotes, modify as needed
    }

    // useEffect(() => {
    //     const fetchAnswers = async () => {
    //         const questionId = getUrlParameter('questionId');
    //         console.log(questionId)
    //         if (questionId) {
    //             try {
    //                 const response = await fetch(`http://localhost:9000/Qna/api/questions/${questionId}/answers`);
    //                 const data = await response.json();
                    
    //                 setAnswers(data);
    //             } catch (error) {
    //                 console.error('Error fetching answers:', error);
    //             }
    //         } else {
    //             console.error('Question ID not provided in URL parameters');
    //         }
    //     };

    //     fetchAnswers();
    // }, []);

    const handleAnswerSubmit = async (event) => {
        event.preventDefault();
        const questionId = getUrlParameter('questionId');

        try {
            const response = await fetch(`http://localhost:9000/Qna/AddQuestion?empid=${userid}&orgid=${orgid}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + user.token
                },
                body: JSON.stringify({
                    answer: sanitizeInput(answerText),
                    userName: sanitizeInput(userid),
                    question: sanitizeInput(question),
                    tag1: sanitizeInput(tag1),
                    tag2: sanitizeInput(tag2),
                    tag3: sanitizeInput(tag3)
                })
            });
            const data = await response.json();
            console.log(data.message);

            window.location.href = '/Trail';

            // Update answers state with the new answer
            setAnswers(prevAnswers => [
                ...prevAnswers,
                {
                    answer: answerText,
                    user_name: userName,
                    upvotes: 0, // Assuming new answer starts with 0 upvotes
                    downvotes: 0, // Assuming new answer starts with 0 downvotes
                    created_at: new Date().toISOString() // Current timestamp
                }
            ]);

            // Clear input fields
            setAnswerText('');
            setquestion('');
            setUserName('');
            settag1('');
            settag2('');
            settag3('');
        } catch (error) {
            console.error('Error submitting answer:', error);
        }
    };

    const handleUpvoteAnswer = async (answerId) => {
        try {
            const response = await fetch(`http://localhost:9000/Qna/answers/upvote/${answerId}?empid=${userid}&orgid=${orgid}`, { 
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            });
            const data = await response.json();
            console.log(data.message);

            // Update upvotes count in the answers state
            setAnswers(prevAnswers => prevAnswers.map(answer => {
                if (answer.id === answerId) {
                    return { ...answer, upvotes: answer.upvotes + 1 };
                }
                return answer;
            }));
        } catch (error) {
            console.error('Error upvoting answer:', error);
        }
    };

    const handleDownvoteAnswer = async (answerId) => {
        try {
            const response = await fetch(`http://localhost:9000/Qna/answers/downvote/${answerId}?empid=${userid}&orgid=${orgid}`, { 
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            });
            const data = await response.json();
            console.log(data.message);

            // Update downvotes count in the answers state
            setAnswers(prevAnswers => prevAnswers.map(answer => {
                if (answer.id === answerId) {
                    return { ...answer, downvotes: answer.downvotes + 1 };
                }
                return answer;
            }));
        } catch (error) {
            console.error('Error downvoting answer:', error);
        }
    };

    // Function to get URL parameters
    const getUrlParameter = (name) => {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    return (
        <div>
            <Navbar active="qna"></Navbar>
            {/* <header>
                <h1>QNA</h1>
            </header> */}
            <div className="container">
                {/* <h2>Existing Answers</h2> */}
                <div id="answersSection">
                    {answers.map(answer => (
                        <div key={answer.id} className="answer-card">
                            <div className="card">
                                <div className="card-body">
                                    <p className="card-text">Answer:<br /><br /> {answer.answer}</p>
                                    <p className="card-text">UserID: {answer.userid}</p>
                                    {/* <button onClick={() => handleUpvoteAnswer(answer.id)}>Upvote</button> */}

                                    <button onClick={() => handleUpvoteAnswer(answer.id)}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0"/>
                                </svg>Upvotes: {answer.upvotes}</span>
                            </button>

                                    {/* <span>Upvotes: <span id={`upvotes-${answer.id}`}>{answer.upvotes}</span></span> */}
                                    {/* <button onClick={() => handleDownvoteAnswer(answer.id)}>Downvote</button> */}
                                    
                                    <button onClick={() => handleDownvoteAnswer(answer.id)}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0"/>
                                </svg>Downvotes: {answer.downvotes}</span>
                            </button>
                                    
                                    {/* <span>Downvotes: <span id={`downvotes-${answer.id}`}>{answer.downvotes}</span></span> */}
                                    <p className="card-text">Posted on: {answer.created_at}</p>
                                </div>
                                <br />
                                <hr />
                            </div>
                        </div>
                    ))}
                </div>
                <hr />
                <h2>Add New Questions</h2>
                <form onSubmit={handleAnswerSubmit}>
                    <div className="form-group">
                    <label htmlFor="answer">Your Question:</label>
                        <textarea id="question" name="answer" rows="2" value={question} onChange={(e) => setquestion(e.target.value)} required></textarea>
                        <label htmlFor="answer">Description:</label>
                        <textarea id="answer" name="answer" rows="4" value={answerText} onChange={(e) => setAnswerText(e.target.value)} required></textarea>
                    </div>
                    <div className="form-group">
                    {/* <label htmlFor="userName">Your Name:</label>
                    <input type="text" id="userName" name="userName" value={userName} onChange={(e) => setUserName(e.target.value)} required /> */}
                    <br></br>
                    <label htmlFor="userName">Tag 1:</label>
                    <input type="text" id="tag1" name="userName" value={tag1} onChange={(e) => settag1(e.target.value)} required />
                    <br></br>
                    <label htmlFor="userName">Tag 2:</label>
                    <input type="text" id="tag2" name="userName" value={tag2} onChange={(e) => settag2(e.target.value)} required />
                    <br></br>
                    <label htmlFor="userName">Tag 3:</label>
                    <input type="text" id="tag3" name="userName" value={tag3} onChange={(e) => settag3(e.target.value)} required />
                    </div>
                    <button type="submit">Submit Question</button>
                </form>
            </div>            
        </div>
);
};

export default AddQuestion;
