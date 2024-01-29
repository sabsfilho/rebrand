#! /bin/bash

PSQL="psql --username=postgres --dbname=periodic_table --tuples-only -c"

if [[ -z $1 ]]
then
  echo "Please provide an element as an argument."
else
  Q=$(echo $1 | sed -E 's/^[0-9]+$/2/')
  if [[ $Q == $1 ]]; 
  then
    W="e.symbol='$1' or e.name='$1'"
  else
    W="e.atomic_number=$1"
  fi
  Q="select e.atomic_number, e.symbol, e.name, t.type, p.atomic_mass, p.melting_point_celsius, p.boiling_point_celsius from elements e inner join properties p using(atomic_number) inner join types t using(type_id) where $W"

  INFO=$($PSQL "$Q")
  if [[ -z $INFO ]]
  then
    echo "I could not find that element in the database."
  else
    echo "$INFO" | while read atomic_number BAR symbol BAR name BAR type BAR atomic_mass BAR melting_point_celsius BAR boiling_point_celsius
    do
      echo "The element with atomic number $atomic_number is $name ($symbol). It's a $type, with a mass of $atomic_mass amu. $name has a melting point of $melting_point_celsius celsius and a boiling point of $boiling_point_celsius celsius."
    done
  fi

fi

