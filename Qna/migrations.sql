drop database if exists qna;

create database qna;
use qna;

CREATE TABLE questions (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(255) NOT NULL,
    description text NOT NULL,
    upvotes int DEFAULT 0,
    downvotes int DEFAULT 0,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    tag1 varchar(255),
    tag2 varchar(255),
    tag3 varchar(255),
    userid varchar(50),
    orgid varchar(50)
);

CREATE TABLE answers (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id int,
    answer text,
    userid varchar(50),
    orgid varchar(50),
    upvotes int,
    downvotes int,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Table definition for answers_upvote
CREATE TABLE answers_upvote (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    answer_id INT,
    userid VARCHAR(50),
    orgid VARCHAR(50),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);

-- Table definition for questions_upvote
CREATE TABLE questions_upvote (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    userid VARCHAR(50),
    orgid VARCHAR(50),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Table definition for answers_downvote
CREATE TABLE answers_downvote (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    answer_id INT,
    userid VARCHAR(50),
    orgid VARCHAR(50),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);

-- Table definition for questions_downvote
CREATE TABLE questions_downvote (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    question_id INT,
    userid VARCHAR(50),
    orgid VARCHAR(50),
    FOREIGN KEY (question_id) REFERENCES questions(id)
);


INSERT INTO questions (title, description, upvotes, downvotes, created_at, tag1, tag2, tag3, userid, orgid) 
VALUES 
('How to create a React component?', 'I want to create a new component in React. Can anyone provide guidance on how to do it?', 0, 0, CURRENT_TIMESTAMP, 'React', 'Component', 'Guide', 'user123', 'org1'),
('What is the best database for a web application?', 'I am developing a web application and I am not sure which database to choose. Any recommendations?', 0, 0, CURRENT_TIMESTAMP, 'Database', 'Web', 'Application', 'user456', 'org2'),
('How to optimize SQL queries for better performance?', 'My SQL queries are taking too long to execute. How can I optimize them?', 0, 0, CURRENT_TIMESTAMP, 'SQL', 'Performance', 'Optimization', 'user789', 'org1'),
('What are the best practices for RESTful API design?', 'I am designing a RESTful API for my project. What are some best practices to follow?', 0, 0, CURRENT_TIMESTAMP, 'RESTful', 'API', 'Best Practices', 'user101', 'org3'),
('How to deploy a Node.js application on AWS?', 'I want to deploy my Node.js application on AWS. Any step-by-step guide available?', 0, 0, CURRENT_TIMESTAMP, 'Node.js', 'AWS', 'Deployment', 'user202', 'org2'),
('What are the benefits of using Docker for development?', 'I am considering using Docker for my development environment. What advantages does it offer?', 0, 0, CURRENT_TIMESTAMP, 'Docker', 'Development', 'Benefits', 'user303', 'org4'),
('How to implement authentication in a React app?', 'I need to add authentication to my React application. Any recommended libraries or tutorials?', 0, 0, CURRENT_TIMESTAMP, 'React', 'Authentication', 'Implementation', 'user404', 'org3'),
('What is the difference between PUT and PATCH in RESTful APIs?', 'I am confused about when to use PUT and when to use PATCH. Can someone clarify?', 0, 0, CURRENT_TIMESTAMP, 'RESTful', 'APIs', 'PUT vs PATCH', 'user505', 'org5'),
('How to handle state in React using hooks?', 'I want to manage state in my React components using hooks. Any tutorials or examples?', 0, 0, CURRENT_TIMESTAMP, 'React', 'State Management', 'Hooks', 'user606', 'org4'),
('What are the pros and cons of using TypeScript?', 'I am considering using TypeScript for my project. What are its advantages and disadvantages?', 0, 0, CURRENT_TIMESTAMP, 'TypeScript', 'Pros and Cons', 'Advantages', 'user707', 'org5');


INSERT INTO answers (question_id, answer, upvotes, downvotes, created_at, userid, orgid)
VALUES

(1, 'To create a React component, you can start by defining a functional or class component. Functional components are preferred with the use of hooks for state management and lifecycle methods.', 5, 0, CURRENT_TIMESTAMP, 'user999', 'org1'),
(1, 'You can use the `create-react-app` tool to quickly scaffold a new React project, and then create components within the `src` folder.', 3, 1, CURRENT_TIMESTAMP, 'user888', 'org2'),

(2, 'The best database for a web application depends on various factors such as scalability, data structure, and performance requirements. Some popular choices include MySQL, PostgreSQL, MongoDB, and Firebase.', 8, 2, CURRENT_TIMESTAMP, 'user777', 'org3'),
(2, 'Consider the specific needs of your web application such as relational data, real-time updates, or scalability when choosing a database.', 4, 1, CURRENT_TIMESTAMP, 'user666', 'org4'),

(3, 'Optimizing SQL queries involves various techniques such as indexing, using appropriate joins, optimizing subqueries, and minimizing database calls.', 7, 0, CURRENT_TIMESTAMP, 'user555', 'org5'),
(3, 'You can analyze query performance using database tools like EXPLAIN in MySQL or Query Execution Plans in SQL Server to identify bottlenecks.', 5, 1, CURRENT_TIMESTAMP, 'user444', 'org6'),

(4, 'Some best practices for RESTful API design include using meaningful resource URIs, proper HTTP methods (GET, POST, PUT, DELETE), versioning, and providing comprehensive documentation.', 9, 0, CURRENT_TIMESTAMP, 'user333', 'org7'),
(4, 'Consider implementing HATEOAS (Hypermedia as the Engine of Application State) to make your API more discoverable and self-descriptive.', 6, 2, CURRENT_TIMESTAMP, 'user222', 'org8'),

(5, 'To deploy a Node.js application on AWS, you can use services like Elastic Beanstalk, AWS Lambda, or EC2 instances. Configure your application, set up the necessary environment variables, and deploy using AWS CLI or through the AWS Management Console.', 8, 1, CURRENT_TIMESTAMP, 'user111', 'org9'),
(5, 'You can also use Docker containers to package your Node.js application for deployment on AWS ECS (Elastic Container Service) or EKS (Elastic Kubernetes Service) for better scalability and management.', 7, 3, CURRENT_TIMESTAMP, 'user000', 'org10'),

(6, 'Docker provides benefits such as consistent development environments, isolated application containers, simplified dependency management, and easier deployment across different environments.', 9, 0, CURRENT_TIMESTAMP, 'user123', 'org11'),
(6, 'By containerizing your applications with Docker, you can ensure that they run consistently regardless of the host environment, leading to fewer compatibility issues.', 5, 1, CURRENT_TIMESTAMP, 'user234', 'org12'),

(7, 'There are several libraries available for adding authentication to a React app, including Firebase Authentication, Auth0, Passport.js, and others. You can also implement custom authentication using JSON Web Tokens (JWT) and server-side validation.', 7, 2, CURRENT_TIMESTAMP, 'user345', 'org13'),
(7, 'Follow security best practices such as using HTTPS, securely storing credentials, and implementing measures like rate limiting and brute force protection to enhance authentication security.', 4, 1, CURRENT_TIMESTAMP, 'user456', 'org14'),

(8, 'PUT is used to update or replace an existing resource entirely, while PATCH is used to partially update an existing resource. PUT requires the client to send the entire updated resource, whereas PATCH only requires the client to send the changes to be applied.', 6, 0, CURRENT_TIMESTAMP, 'user567', 'org15'),
(8, 'In RESTful APIs, PUT is idempotent, meaning that multiple identical requests will have the same effect as a single request. PATCH, on the other hand, may not be idempotent if the same changes are applied multiple times.', 4, 1, CURRENT_TIMESTAMP, 'user678', 'org16'),

(9, 'To manage state in React using hooks, you can use the `useState` and `useEffect` hooks provided by React. useState allows you to add state variables to functional components, while useEffect allows you to perform side effects in functional components.', 8, 2, CURRENT_TIMESTAMP, 'user789', 'org17'),
(9, 'You can create custom hooks to encapsulate stateful logic and reuse it across multiple components, leading to cleaner and more maintainable code.', 5, 1, CURRENT_TIMESTAMP, 'user890', 'org18'),

(10, 'TypeScript offers advantages such as static type checking, enhanced code readability and maintainability, better tooling support, and improved collaboration in large projects.', 9, 1, CURRENT_TIMESTAMP, 'user901', 'org19'),
(10, 'However, using TypeScript may introduce a learning curve for developers unfamiliar with static typing, and it may require additional configuration for existing JavaScript projects.', 6, 0, CURRENT_TIMESTAMP, 'user012', 'org20');
