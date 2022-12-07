import React from 'react';
import YouTube from 'react-youtube';
import { useState } from 'react';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store/index.js'

import {Box, Typography} from '@mui/material';
import {IconButton} from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import {Button} from '@mui/material';

export default function YouTubePlayerExample(props) {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    const { store } = useContext(GlobalStoreContext);

    const {currentPlaylist} = props;
    
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    
    let [player, setPlayer] = useState({});
    let [currentSong, setCurrentSong] = useState(0);
    let [title, setTitle] = useState("");
    let [artist, setArtist] = useState("");

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    // console.log(store.currentList);
    console.log("~~~~~~~~~~~~~~~~~~~~");
    console.log(store.currentList);
    console.log(currentPlaylist);
    if(store.currentList && currentPlaylist.songs){
        let songList = currentPlaylist.songs;
        console.log(songList);
        playlist = songList.map(song => song.youTubeId)
        console.log(playlist);
    }

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = (currentPlaylist.songs[currentSong]) ? currentPlaylist.songs[currentSong].youTubeId : "";
        // console.log(song);
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        if(currentSong <= currentPlaylist.songs.length){
            currentSong++;
            // currentSong = currentSong % playlist.length;
            setCurrentSong(currentSong);
            let newTitle = currentPlaylist.songs[currentSong].title;
            let newArtist = currentPlaylist.songs[currentSong].artist;
            setTitle(newTitle);
            setArtist(newArtist);
        }    
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function decSong() {
        if(currentSong > 0){
            currentSong--;
            // currentSong = currentSong % playlist.length;
            setCurrentSong(currentSong);
            let newTitle = currentPlaylist.songs[currentSong].title;
            let newArtist = currentPlaylist.songs[currentSong].artist;
            setTitle(newTitle);
            setArtist(newArtist);
        }
    }

    function onPlayerReady(event) {
        setPlayer({player: event.target});
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    function handleNextSong(player){
        console.log("Handling moving to next song");
        incSong();
        loadAndPlayCurrentSong(player);
    }

    function handlePreviousSong(player){
        console.log("Handling moving previous song");
        decSong()
        loadAndPlayCurrentSong(player);
    }

    function handleStopPlayer(){
        player.player.pauseVideo();
        console.log("Handling stopping player");

    }

    function handlePlayPlayer(){
        player.player.playVideo();
        console.log("Handling playing player");

    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        // console.log("EVENT HERE*****")
        // console.log(event);
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    //If no playlist is selected, the youtubePlayerview will display different screens
    let youtubePlayerView = "";
    if(store.currentList){
        youtubePlayerView = 
        <>
        <Typography>Now Playing</Typography>
        <Box sx={{textAlign: 'left', padding:'10px'}}>
            <Typography>
                Playlist: {(store.currentList)? store.currentList.name :''}
            </Typography>
            {/* <Button onClick={displayCurrentPlaylist}>HERE</Button> */}
            <Typography>
                Song #:  {currentSong + 1}
            </Typography>
            <Typography>
                Song Title: {(currentPlaylist.songs[currentSong])? currentPlaylist.songs[currentSong].title : title}
            </Typography>
            <Typography>
                Artist: {(currentPlaylist.songs[currentSong])? currentPlaylist.songs[currentSong].artist : artist}
            </Typography>
        </Box>
        <Box sx={{backgroundColor: 'white', margin:'10px'}}>
            <IconButton 
                onClick={(event) => {
                    event.stopPropagation();
                    // console.log("*HERE HERE*")
                    // console.log(event);
                    handlePreviousSong(player.player)
                }
                }>
                <SkipPreviousRoundedIcon/>
            </IconButton>
            <IconButton onClick={handleStopPlayer}>
                <StopRoundedIcon/>
            </IconButton>
            <IconButton 
                onClick={handlePlayPlayer}>
                <PlayArrowRounded/>
            </IconButton>
            <IconButton 
                onClick={
                    (event) => {
                        event.stopPropagation();
                        // console.log("*HERE HERE*")
                        // console.log(event);
                        handleNextSong(player.player)
                    }
                }>
                <SkipNextRoundedIcon/>
            </IconButton>
        </Box>
        </>
    }else{
        youtubePlayerView = <Typography>Select a playlist to begin playing</Typography>
    }

    return (
        <>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />

        {youtubePlayerView}
        </>
        
    );
}