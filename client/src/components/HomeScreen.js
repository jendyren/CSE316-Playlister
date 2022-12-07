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
  console.log(store.currentList);

  let currentPlaylist = {
    _id: Number,
    name: String, 
    songs: Object,
  }

  if(store.currentList){
    currentPlaylist._id = store.currentList._id;
    currentPlaylist.name = store.currentList.name;
    currentPlaylist.songs = store.currentList.songs;
  }

  let listSection = ""
  const homeListSection = (
    <>
    <Box sx={{display:'flex', flexDirection:'row'}}>
        <ListSection/>
        <YoutubeSection
            currentPlaylist={currentPlaylist}
        />
    </Box>
    <AddPlaylist/>
    </>
  );

  const allUsersListSection = (
    <>
    <Box sx={{display:'flex', flexDirection:'row'}}>
        <ListSection/>
        <YoutubeSection
            currentPlaylist={currentPlaylist}
        />
    </Box>
    <Statusbar/>
    </>
);

  switch (store.currentView) {
      case 'HOME':
        console.log('HOMEEEEEEEEEEEEEEE');
        listSection = homeListSection;
        break;
      case 'ALL_USER':
        console.log('ALL_USERRRRRRRRRRRR');
        listSection = allUsersListSection;
        break;
      case 'ONE_USER':
        console.log('ONE_USERRRRRRRRRRRR');
      //   listSection = homeListSection;
        break;
  }
  return (
      <>
      <HomeBanner/>
      <Box>
          {listSection}
      </Box>
      </>
  )
}

export default HomeScreen;