import * as React from 'react';
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth'
import { Typography } from '@mui/material';
import GlobalStoreContext from '../store';



export default function SplashScreen() {
    const { auth} = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    const history = useHistory();

    const handleGuest = (event) => {
        event.stopPropagation();
        console.log("Inside handleGuest");
        auth.loginGuest();
        // console.log(auth.guest);
        // history.push('/');
    };

    const handleRegister = (event) => {
        event.stopPropagation();
        console.log("Inside handleRegister");
        history.push("/register");
    };

    const handleLogin = (event) => {
        event.stopPropagation();
        console.log("Inside handleLogin");
        history.push("/login")
    };

    const buttonStyle = {
        background: "var(--red)",
        '&:hover': {
            backgroundColor: 'var(--darkred)',
            color: 'white',
        },
    }

    const normalText = {
        fontWeight: "300",
        fontSize: "16px",
        fontFamily: "var(--my-font-family)"
    }

    const subheaderText = {
        fontWeight: "600",
        fontSize: "32px",
        fontFamily: "var(--my-font-family)"
    }

    return (
        <>
        <div id="splash-screen">
            <div id="splash-screen-card">
                <img id="splashscreen-img" src="/assets/playlister-logo.png"></img>
                {/* <div class="heading-text"> Playlister </div> */}
                <div id="splashscreen-subheading">
                    <Typography sx={subheaderText}>
                    Welcome!
                    </Typography>
                </div>
                <div id="splashscreen-description">
                    <Typography sx={normalText}>
                    The Playlister software allows you to create playlists of YouTube music videos
                    and play them. A user can create, edit, and play playlists and share them so
                    that others can play and comment.
                    </Typography>
                </div>
                <Box sx={{ p: 2}}>
                    <Button variant="contained" sx={buttonStyle} onClick={handleLogin}>Log In</Button>
                </Box>
                <div id="sign-up">
                    <Typography sx={normalText}> 
                        Don't have an account? 
                        <Button sx={normalText} onClick={handleRegister}> Sign Up</Button>
                    </Typography>
                </div>
                <div id="continue-guest">
                    <Typography sx={normalText}>
                        Just here to take a peek?
                        <Button sx={normalText} onClick={handleGuest}> Continue as Guest</Button>
                    </Typography>
                </div>
                
                <div id="copyright">
                    <Typography sx={normalText}>
                        Student Developer: @jendyren
                    </Typography>
                </div>
            </div>

        </div>
        </>
    )
}