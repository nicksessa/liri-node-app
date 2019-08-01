#!/bin/bash
echo $1
echo $2

if [ ! -z "$1" ] 
then 
  echo " liri.js received $1"
fi

if [ ! -z "$2" ]
then
  echo " liri.js received $2"
fi
