DROP TABLE IF EXISTS users;
CREATE TABLE users (
	id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	username varchar(255),
	password varchar(255)
);

INSERT INTO users (username, password) VALUES
  ('Sansa', 'passwordexample2'),
  ('Bran', 'passwordexample2');
