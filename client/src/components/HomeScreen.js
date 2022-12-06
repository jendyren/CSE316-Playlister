import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListSection from './ListSection';
import HomeBanner from './HomeBanner'
import YoutubeSection from './YoutubeSection';
import Box from '@mui/material/Box';
import Statusbar from './Statusbar';
import AddPlaylist from './AddPlaylist';

import AuthContext from '../auth';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    console.log("*********************");
    console.log("Updated View is: ");
    console.log(store.currentView);
    console.log("*********************");



    let listSection = ""
    switch (store.currentView) {
        case 'HOME':
          console.log('HOMEEEEEEEEEEEEEEE');
          break;
        case 'ALL_USER':
          console.log('ALL_USERRRRRRRRRRRR');
          break;
        case 'ONE_USER':
          console.log('ONE_USERRRRRRRRRRRR');
          break;
    }
    return (
        <>
        <HomeBanner/>
        <Box sx={{display:'flex', flexDirection:'row'}}>
            <ListSection/>
            <YoutubeSection/>
        </Box>
        <AddPlaylist/>
        </>
    )
}

export default HomeScreen;