#! /bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=postgres --dbname=worldcuptest -t --no-align -c"
else
  #PSQL="psql --username=freecodecamp --dbname=worldcup -t --no-align -c"
  PSQL="psql --username=postgres --dbname=worldcup -t --no-align -c"
fi

# Do not change code above this line. Use the PSQL variable above to query your database.

echo "$($PSQL "TRUNCATE teams,games")"
echo "$($PSQL "alter sequence teams_team_id_seq restart with 1")"
echo "$($PSQL "alter sequence games_game_id_seq restart with 1")"

INSERT_TEAM() {
  TEAM_ID="$($PSQL "SELECT team_id FROM teams where name='$1'")"
  if [[ -z $TEAM_ID ]]
  then
    TEAM_R="$($PSQL "INSERT INTO teams(name) VALUES ('$1')")"
    if [[ $TEAM_R == "INSERT 0 1" ]]
    then
      INSERT_TEAM "$1"
    fi
  fi
}

cat games.csv | while IFS="," read year round winner opponent winner_goals opponent_goals
do
  #echo $year $winner $opponent
  if [[ $winner != winner ]]
  then
    INSERT_TEAM "$winner"
    WINNER_ID=$TEAM_ID
    INSERT_TEAM "$opponent"
    OPPONENT_ID=$TEAM_ID

    echo "$($PSQL "INSERT INTO games(year,round,winner_id,opponent_id,winner_goals,opponent_goals) VALUES ($year,'$round',$WINNER_ID,$OPPONENT_ID,$winner_goals,$opponent_goals)")"
  fi
done

echo teams="$($PSQL "SELECT count(*) FROM teams")"
echo games="$($PSQL "SELECT count(*) FROM games")"
