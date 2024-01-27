#! /bin/bash

PSQL="psql --username=freecodecamp --dbname=salon --tuples-only -c"

echo -e "\n~~~~~ Salon Appointment Scheduler ~~~~~\n"

MAIN_MENU(){

  if [[ $1 ]]
  then
    echo -e "\n$1"
  fi  
  
  echo -e "\nHere are the services we have available:
1) Hair
2) Nails
3) Barbering"
  read SERVICE_ID_SELECTED
  
  if [[ ! $SERVICE_ID_SELECTED =~ ^[0-9]+$ ]]
  then
    MAIN_MENU "Please enter a valid service number."
  else
      SERVICE_NAME=$($PSQL "select name from services where service_id=$SERVICE_ID_SELECTED")
      if [[ -z $SERVICE_NAME ]]
      then
        MAIN_MENU "Please enter a valid service number."
      else
        echo -e "\nWhat's your phone number?"
        read CUSTOMER_PHONE
        CUSTOMER_NAME=$($PSQL "select name from customers where phone='$CUSTOMER_PHONE'")

        if [[ -z $CUSTOMER_NAME ]]
        then
          echo -e "\nWhat's your name?"
          read CUSTOMER_NAME
          
          INSERT_CUSTOMER_RESULT=$($PSQL "insert into customers (phone,name) values ('$CUSTOMER_PHONE', '$CUSTOMER_NAME')")
        fi

        echo -e "\nWhat's your appointment time?"
        read SERVICE_TIME

        CUSTOMER_ID=$($PSQL "select customer_id from customers where phone='$CUSTOMER_PHONE'")

        INSERT_RENTAL_RESULT=$($PSQL "insert into appointments (customer_id,service_id,time) values ($CUSTOMER_ID, $SERVICE_ID_SELECTED, '$SERVICE_TIME')")

        echo -e "I have put you down for a$SERVICE_NAME at $SERVICE_TIME, $(echo $CUSTOMER_NAME | sed -E 's/^ *| *$//g')."

      fi
  fi

}

MAIN_MENU