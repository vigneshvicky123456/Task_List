CREATE DATABASE tasklist;

CREATE TABLE todos(
    id SERIAL PRIMARY KEY,
    task VARCHAR(255) NOT NULL,
  completed BOOLEAN DEFAULT false
);

SELECT * FROM todos;

INSERT INTO todos (description) VALUES($1) RETURNING *, [description]
INSERT INTO todos (description) VALUES($1)

SELECT * FROM todos;

SELECT * FROM todos WHERE id = $1, [id]

