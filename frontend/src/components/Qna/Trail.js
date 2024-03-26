import React, { useEffect, useState } from 'react';
import Navbar from "../Navbar";
import { Link } from "react-router-dom";
import '../../css/Qna.css'
import { useAuth } from '../AuthProvider';

// const Sidebar = () => {
//     // Simulated user data
//     const userData = {
//         username: "JohnDoe",
//         organization: "ABC Inc.",
//         numQuestionsPosted: 10,
//         numQuestionsAnswered: 5
//     };

//     return (
//         <div className="sidebar">
//             <h2>User Information</h2>
//             <p><strong>Username:</strong> {userData.username}</p>
//             <p><strong>Organization:</strong> {userData.organization}</p>
//             <p><strong>Questions Posted:</strong> {userData.numQuestionsPosted}</p>
//             <p><strong>Questions Answered:</strong> {userData.numQuestionsAnswered}</p>
//         </div>
//     );
// };

const Content = () => {
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    const { user } = useAuth();

    const userid = user.userId;
    const orgid = user.orgId;

    const [searchValue, setSearchValue] = useState('');

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            redirectToTagQuestion();
        }
    };

    const redirectToTagQuestion = () => {
        window.location.href = `/TagQuestion?tag=${searchValue}`;
    };
    // Define getUrlParameter function
    const getUrlParameter = (name) => {
        // Implementation of getUrlParameter function
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(window.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    useEffect(() => {
        // Fetch questions from the backend when the component mounts
        fetch(`http://localhost:9000/Qna/questions?empid=${userid}&orgid=${orgid}`, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(questionsData => {
                setQuestions(questionsData);
            })
            .catch(error => console.error('Error fetching questions:', error));

        // Fetch answers for the specified question ID
        const questionId = getUrlParameter('questionId');
        if (questionId) {
            fetch(`http://localhost:9000/Qna/api/questions/${questionId}/answers?empid=${userid}&orgid=${orgid}`, {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            })
                .then(response => response.json())
                .then(answersData => {
                    setAnswers(answersData);
                })
                .catch(error => console.error('Error fetching answers:', error));
        }
    }, []);

    // Function to handle upvoting a question
    const upvoteQuestion = (questionId) => {
        fetch(`http://localhost:9000/Qna/upvote/${questionId}?empid=${userid}&orgid=${orgid}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Update the state to reflect the upvote
                if (data.message !== 'Upvote already recorded for this question') {
                    setQuestions(prevQuestions => {
                        return prevQuestions.map(question => {
                            if (question.id === questionId) {
                                return { ...question, upvotes: question.upvotes + 1 };
                            } else {
                                return question;
                            }
                        });
                    });
                }
            })
            .catch(error => console.error('Error upvoting question:', error));
    };

    // Function to handle downvoting a question
    const downvoteQuestion = (questionId) => {
        fetch(`http://localhost:9000/Qna/downvote/${questionId}?empid=${userid}&orgid=${orgid}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Update the state to reflect the downvote
                if (data.message !== 'Downvote already recorded for this question') {
                    setQuestions(prevQuestions => {
                        return prevQuestions.map(question => {
                            if (question.id === questionId) {
                                return { ...question, downvotes: question.downvotes + 1 };
                            } else {
                                return question;
                            }
                        });
                    });
                }
            })
            .catch(error => console.error('Error downvoting question:', error));
    };

    // Function to handle redirecting to answers page
    const addAnswer = (questionId) => {
        // Redirect to the answers page with the question ID as a URL parameter
        window.location.href = `answers.html?questionId=${questionId}`;
    };

    return (
        <div className="content">
            <Navbar active="qna"></Navbar>
            <header>
                <h1>QNA</h1>
            </header>
            <div className="ask-question-button" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <a href="/AddQuestion" className="btn">Ask Question</a>
                <span style={{ marginLeft: '10px' }}></span>
                <a href="/MyQuestion" className="btn">My Questions</a>
            </div>
            <div style={{ marginLeft: 'auto' }}>
                <input 
                    type="text" 
                    placeholder="Search by tag..." 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)} 
                    onKeyPress={handleKeyPress} 
                    style={{ marginLeft: 'auto' }} 
                />
                {/* You can add additional styling or functionality to the search bar as needed */}
            </div>
        </div>
            <br></br>
            <div className="container" id="questionList">
                {questions.map(question => (
                    <div key={question.id} className="question">
                        <h2>{question.title}</h2>
                        <p>{question.description}</p>
                        <div className="tags">
                            {question.tag1 && (
                                <button className="tag"><Link to={`/TagQuestion?tag=${question.tag1}`} className="tag" style={{ textDecoration: 'none', color: 'white' }}>#{question.tag1}</Link></button>
                            )}
                            {question.tag2 && (
                                <button className="tag"><Link to={`/TagQuestion?tag=${question.tag2}`} className="tag" style={{ textDecoration: 'none', color: 'white' }}>#{question.tag2}</Link></button>
                            )}
                            {question.tag3 && (
                                <button className="tag"><Link to={`/TagQuestion?tag=${question.tag3}`} className="tag" style={{ textDecoration: 'none', color: 'white' }}>#{question.tag3}</Link></button>
                            )}
                        </div>

                        <br></br>

                        <div className="actions">
                            <button onClick={() => upvoteQuestion(question.id)}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0" />
                                </svg>Upvotes: {question.upvotes}</span>
                            </button>
                            <button onClick={() => downvoteQuestion(question.id)}>
                                <span><svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                                    <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
                                </svg>Downvotes: {question.downvotes}</span>
                            </button>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="35" height="25" fill="currentColor" className="bi bi-plus-circle" viewBox="0 0 16 16">
                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                                </svg><Link to={`/answers?questionId=${question.id}`} style={{ textDecoration: 'none', color: 'white' }}>Add Answer</Link>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const QuestionList = () => {
    return (
        <div>
            <Content />
        </div>
    );
};

export default QuestionList;


