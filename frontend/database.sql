CREATE TABLE questions (
    id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tag1 VARCHAR(255),
    tag2 VARCHAR(255),
    tag3 VARCHAR(255)
);

INSERT INTO questions (title, description, upvotes, downvotes, created_at, tag1, tag2, tag3)
VALUES ('Sample Question', 'This is a sample question description.', 10, 3, '2023-12-03 12:30:45', 'tag1_value', 'tag2_value', 'tag3_value');

CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    answer TEXT,
    user_name VARCHAR(255),
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO answers (question_id, answer, user_name, upvotes, downvotes, created_at)
VALUES (1, 'This is a sample answer.', 'JohnDoe', 5, 2, '2023-12-03 10:15:30');



