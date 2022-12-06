import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'

import Box from '@mui/material/Box'

import AuthContext from '../auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import SortRoundedIcon from '@mui/icons-material/SortRounded';
import CssBaseline from '@mui/material/CssBaseline';
import { Typography, TextField, InputAdornment, IconButton, Toolbar, Icon} from '@mui/material';

export default function HomeBanner() {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

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


    function handleHomeButton() {
        console.log("Handling Home Button");
        store.setCurrentView("HOME");
    }
    function handleAllUserButton() {
        console.log("Handling All User Button");
        store.setCurrentView("ALL_USER");
    }
    function handleOneUserButton() {
        console.log("Handling One User Button");
        store.setCurrentView("ONE_USER");
    }

    const handleSortByMenuOpen = (event) => {
        console.log("Handling sortByMenu");
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'sort-by-menu';
    let menu = "";
    const sortByMenuHome = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to='/login/' onClick={handleMenuClose}><Link to='/login/'>By Creation Date (Old-New)</Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>By Last Edit Date (New-Old) </Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>By Name (A-Z) </Link></MenuItem>
        </Menu>
    );

    const sortByMenuAll = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem component={Link} to='/login/' onClick={handleMenuClose}><Link to='/login/'>Name (A-Z)</Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>Publish Date (Newest) </Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>Listens (High - Low) </Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>Likes (High - Low) </Link></MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}><Link to='/register/'>Dislikes (High - Low) </Link></MenuItem>
        
        </Menu>
    );

    switch (store.currentView) {
        case 'HOME':
          console.log('HOMEEEEEEEEEEEEEEE');
          menu = sortByMenuHome;
          console.log('menu set to home');

          break;
        case 'ALL_USER':
          console.log('ALL_USERRRRRRRRRRRR');
          menu = sortByMenuAll;
          console.log('menu set to all');
          break;
        case 'ONE_USER':
          console.log('ONE_USERRRRRRRRRRRR');
          menu = sortByMenuAll;
          console.log('menu set to all');
          break;
    }

    return(
        <Box sx={homeBannerStyle}>
            <Box sx={homeScreenButtonStyle}>
                <IconButton sx={buttonStyle} onClick={handleHomeButton}>
                    <HomeRoundedIcon sx={{fontSize:'2.4rem'}}></HomeRoundedIcon>
                </IconButton>
                <IconButton sx={buttonStyle} onClick={handleAllUserButton}>
                    <PeopleRoundedIcon sx={{fontSize:'2.4rem'}}></PeopleRoundedIcon>
                </IconButton>
                <IconButton sx={buttonStyle} onClick={handleOneUserButton}>
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
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleSortByMenuOpen}
                >
                    <SortRoundedIcon color="inherit" sx={buttonStyle}></SortRoundedIcon>
                </IconButton>
            </Box>
            {
                menu
            }
        </Box>
        
    )
}
