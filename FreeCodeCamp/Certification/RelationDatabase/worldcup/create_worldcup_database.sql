--psql --username=freecodecamp -U postgres < create_worldcup_database.sql
CREATE DATABASE worldcup;

\c worldcup;

CREATE TABLE teams(
    team_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
);

CREATE TABLE games(
    game_id SERIAL PRIMARY KEY,
    year int NOT NULL,
    round VARCHAR(50) NOT NULL,
    winner_id int NOT NULL REFERENCES teams(team_id),
    opponent_id int NOT NULL REFERENCES teams(team_id),
    winner_goals int NOT NULL,
    opponent_goals intNOT NULL
);