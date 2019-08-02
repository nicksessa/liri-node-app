#!/bin/bash
# Script Name: liri.sh
# Author: Nicholas Vito Sessa
# Date Created: August 1, AD 2019
#
# Purpose: Menu for the liri.js file.
# Calls: liri.js
# Called by: none
#----------------------------------------------------------------------------------------------

setArtistName () {
  printf " Enter name here: ---> "
  read artistName
  mainMenu $artistName
}

setMovieTitle () {
  printf " Enter the movie title here: ---> "
  read movieTitle
  mainMenu $movieTitle
}

setSongName () {
  printf " Enter the song name here: ---> "
  read songName
  mainMenu $songName
}

concertThis () {
  echo " calling liri.js ..."
  echo " passing: \"concert-this\" $artistName"
  #node liri.js "concert-this" $artistName
  node ./liri.js "concert-this" "$artistName"
  #read -p "Press <ENTER> to return to the menu."
  read -p $'Press \e[93m<ENTER>\e[92m to return to the menu.'
  mainMenu
}

movieThis () {
  echo " calling liri.js ..."
  echo " passing: \"movie-this\" $movieTitle"
  #node liri.js "movie-this" $movieTitle
  node ./liri.js "movie-this" "$movieTitle"
  #read -p "Press <ENTER> to return to the menu."
  read -p $'Press \e[93m<ENTER>\e[92m to return to the menu.'
  mainMenu
}

spotifyThis () {
  echo " calling liri.js ..."
  echo " passing: \"spotify-this-song\" $songName"
  #node liri.js "spotify-this-song" $songName
  node ./liri.js "spotify-this-song" "$songName"
  #read -p "Press <ENTER> to return to the menu."
  read -p $'Press \e[93m<ENTER>\e[92m to return to the menu.'
  mainMenu
}


mainMenu () {
clear
echo 
echo -e "\e[92m                                      LIRI Menu"
printf "                             "
date "+%A %B %e, A.D. %Y"
echo 
echo
echo -e " Artist/Band Name: --------> \e[96m $artistName"
echo -e "\e[92m Movie: -------------------> \e[96m $movieTitle"
echo -e "\e[92m Song: --------------------> \e[96m $songName"
echo -e "\e[92m"
echo " 1. Get Event Listings for the Artis/Band"
echo " 2. Get Movie Details"
echo " 3. Get Song Information from Spotify"
echo
echo " 4. Change Artist/Band"
echo " 5. Change Movie Title"
echo " 6. Change Song"
echo 
echo " Q. Quit"
echo
echo
printf " Choice: ---> "
read choice
case "$choice" in
     1) #call: node liri.js "concert-this" $artistName
        concertThis ;;
     2) #call: node liri.js "movie-this" $movieTitle
        movieThis ;;
     3) #call: node liri.js "spotify-this-song" $songName
        spotifyThis ;;
     4) setArtistName ;;
     5) setMovieTitle ;;
     6) setSongName ;;
     Q|q) clear
     echo " Type liri.sh to return to this menu."
     echo
     pwd
     exit ;;
     *) mainMenu
esac
}

defaults () {
  artistName="The Rolling Stones"
  movieTitle="The Terminator"
  songName="Ring of Fire"
}
defaults

# call up the menu
mainMenu
