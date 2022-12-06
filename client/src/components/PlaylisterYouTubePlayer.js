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

export default function YouTubePlayerExample() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    const { store } = useContext(GlobalStoreContext);
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = ["HJ6-K3uxUEg"];

    console.log(store.currentList);
    if(store.currentList){
        playlist = [
            "HJ6-K3uxUEg",
            "8RbXIMZmVv8",
            "8UbNbor3OqQ"
        ]
    }

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;
    let [player, setPlayer] = useState({});


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
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        setPlayer({player: event.target});
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
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

    return (
        <>
        <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={onPlayerStateChange} />

        <Typography>Now Playing</Typography>
            <Box sx={{textAlign: 'left', padding:'10px'}}>
                <Typography>
                    Playlist: {(store.currentList)? store.currentList.name :''}
                </Typography>
                <Typography>
                    Song #: 
                </Typography>
                <Typography>
                    Song Title: 
                </Typography>
                <Typography>
                    Artist: 
                </Typography>
            </Box>
            <Box sx={{backgroundColor: 'white', margin:'10px'}}>
                <IconButton>
                    <SkipPreviousRoundedIcon/>
                </IconButton>
                <IconButton>
                    <StopRoundedIcon/>
                </IconButton>
                <IconButton>
                    <PlayArrowRounded/>
                </IconButton>
                <IconButton>
                    <SkipNextRoundedIcon/>
                </IconButton>
            </Box>
        </>
        
    );
}