#!/bin/bash
PSQL="psql -X --username=freecodecamp --dbname=number_guess --tuples-only -c"

echo "Enter your username:"
read NAME

USER_ID=$($PSQL "select user_id from users where name='$NAME'")

if [[ -z $USER_ID ]]
then
    echo "Welcome, $NAME! It looks like this is your first time here."
    USER_RETURN=$($PSQL "insert into users (name) values ('$NAME')")
    USER_ID=$($PSQL "select user_id from users where name='$NAME'")
else
    GAMEINFO=$($PSQL "select count(*) games, min(guesses) best from games where user_id=$USER_ID")
    echo "$GAMEINFO" | while read games bar best
    do
        if [[ $games > 0 ]]
        then
            echo "Welcome back, $NAME! You have played $games games, and your best game took $best guesses."
        fi
    done
fi

N=$(( RANDOM % 1000 + 1 ))
Q=0
NUM=0
echo "Guess the secret number between 1 and 1000:"
while [[ $NUM==0 ]]
do
    (( Q++ ))
    read NUM
    
    if [[ $NUM =~ ^[0-9]+$ ]]
    then
        if [[ $NUM > $N ]]                
        then
            echo "It's lower than that, guess again:"
        elif [[ $NUM < $N ]]
        then
            echo "It's higher than that, guess again:"
        else 
            USER_RETURN=$($PSQL "insert into games (user_id, guesses) values ($USER_ID, $Q)")
            echo "You guessed it in $Q tries. The secret number was $N. Nice job!"
            break
        fi
    else
        echo "That is not an integer, guess again:"
    fi
done
