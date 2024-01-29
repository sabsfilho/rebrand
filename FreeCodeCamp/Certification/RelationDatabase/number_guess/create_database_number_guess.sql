create database number_guess;
\c guessing;
create table users(
    user_id serial primary key,
    name varchar(22) not null unique
);
create table games(
    game_id serial primary key,
    user_id int not null references users(user_id),
    game_date date not null default(now()),
    guesses int not null
);
