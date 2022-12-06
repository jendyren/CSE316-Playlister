import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, TextField, InputAdornment, IconButton, Toolbar, Icon} from '@mui/material';

export default function HomeBanner() {

    const homeScreenButtonStyle ={
        width: '25%',
        textAlign: 'center',
    }
    const buttonStyle = {
        color: "var(--red)",
        width: '50px',
        margin: '10px',
        fontSize: '2rem',
        '&:hover': {
            color: 'var(--darkred)',
            borderRadius: '0'
        },
    }
    const searchBarStyle = {
        width: '50%',
        textAlign: 'center',
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'center'
    }

    const sortStyle = {
        width: '25%',
        textAlign: 'center',
        display: 'flex',
        flexDirection:'row'
    }

    const homeBannerStyle ={
        marginTop: '5px',
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: 'white',
        postion: 'relative',
        zIndex: '9'
    }

    return(
        <Box sx={homeBannerStyle}>
            <Box sx={homeScreenButtonStyle}>
                <IconButton sx={buttonStyle}>
                    <HomeRoundedIcon sx={{fontSize:'2.4rem'}}></HomeRoundedIcon>
                </IconButton>
                <IconButton sx={buttonStyle}>
                    <PeopleRoundedIcon sx={{fontSize:'2.4rem'}}></PeopleRoundedIcon>
                </IconButton>
                <IconButton sx={buttonStyle}>
                    <PersonRoundedIcon sx={{fontSize:'2.4rem'}}></PersonRoundedIcon>
                </IconButton>
            </Box>
            <Box sx={searchBarStyle}>
                <TextField
                    id="input-with-icon-textfield"
                    label="Search"
                    sx={{width: '60%', margin: 'auto'}}
                    variant="outlined"
                    InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                        <SearchRoundedIcon />
                        </InputAdornment>
                    ),
                    }}
                />
            </Box>
            <Box sx={sortStyle}>
                <Typography sx={{display: 'flex', alignItems: 'center'}}>Sort By</Typography>
                <IconButton
                aria-label="account of current user"
                aria-haspopup="true"
                >
                    <SortRoundedIcon color="inherit" sx={buttonStyle}></SortRoundedIcon>
                </IconButton>
            </Box>
            
        </Box>
        
    )
}
