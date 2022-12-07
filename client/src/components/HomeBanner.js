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

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleSearch(event){
        console.log("Handling Searching Button");
        let filteredPlaylists = "";
        console.log(store.idNamePairs);
        if(event.key === 'Enter'){
            console.log('You search is: ' + event.target.value)
            let inputText = event.target.value;
            filteredPlaylists = store.idNamePairs.filter(playlist => playlist.name.includes(inputText));
              // display the matching playlists in the UI
            console.log(filteredPlaylists);
            filteredPlaylists.forEach(playlist => {
                console.log(playlist.name); // Happy, Happy Yay
            });
        }
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
            <MenuItem component={Link} to='/login/' onClick={handleMenuClose}>
                By Creation Date (Old-New)
            </MenuItem>
            <MenuItem component={Link} to='/register/' onClick={handleMenuClose}>
                By Last Edit Date (New-Old)
            </MenuItem>
            <MenuItem component={Link} to='/register/' onClick={handleMenuClose}>
                By Name (A-Z)
            </MenuItem>
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
            <MenuItem component={Link} to='/login/' onClick={handleMenuClose}>
                Name (A-Z)
            </MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}>
                Publish Date (Newest) 
            </MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}>
                Listens (High - Low) 
            </MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}>
                Likes (High - Low)
            </MenuItem>
            <MenuItem component={Link} to='/register/'onClick={handleMenuClose}>
                Dislikes (High - Low)
            </MenuItem>
        
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
                    onKeyDown={handleSearch}
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
