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
  Menu $artistName
}

setMovieTitle () {
  printf " Enter the movie title here: ---> "
  read movieTitle
  Menu $movieTitle
}

setSongName () {
  printf " Enter the song name here: ---> "
  read songName
  Menu $songName
}

concertThis () {
  echo " calling liri.js ..."
  echo " passing: \"concert-this\" $artistName"
  #node liri.js "concert-this" $artistName
  ./liri.js "concert-this" "$artistName"
}

movieThis () {
  echo " calling liri.js ..."
  echo " passing: \"movie-this\" $movieTitle"
  #node liri.js "movie-this" $movieTitle
  ./liri.js "movie-this" "$movieTitle"
}

spotifyThis () {
  echo " calling liri.js ..."
  echo " passing: \"spotify-this-song\" $songName"
  #node liri.js "spotify-this-song" $songName
  ./liri.js "spotify-this-song" "$songName"
}


Menu () {
clear
echo 
echo "                                      LIRI Menu"
printf "                             "
date "+%A %B %e, A.D. %Y"
echo 
echo
echo " 1. Artist/Band Name: --------> $artistName"
echo " 2. Movie: -------------------> $movieTitle"
echo " 3. Song: --------------------> $songName"
echo
echo " 5. Get Event Listings for the Artis/Band"
echo " 6. Get Movie Details"
echo " 7. Get Song Information from Spotify"
echo
echo " Q. Quit"
echo
echo
printf " Choice: ---> "
read choice
case "$choice" in
     1) setArtistName ;;
     2) setMovieTitle ;;
     3) setSongName ;;
     5) #call: node liri.js "concert-this" $artistName
        concertThis ;;
     6) #call: node liri.js "movie-this" $movieTitle
        movieThis ;;
     7) #call: node liri.js "spotify-this-song" $songName
        spotifyThis ;;
     Q|q) clear
     echo " Type liri.sh to return to this menu."
     echo
     pwd
     exit ;;
     *) Menu
esac
}

Defaults () {
  artistName="The Rolling Stones"
  movieTitle="The Terminator"
  songName="Ring of Fire"
}
Defaults

# call up the menu
Menu
