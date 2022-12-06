import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListSection from './ListSection';
import HomeBanner from './HomeBanner'
import YoutubeSection from './YoutubeSection';
import Box from '@mui/material/Box';

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <>
        <HomeBanner/>
        <Box sx={{display:'flex', flexDirection:'row'}}>
            <ListSection/>
            <YoutubeSection/>
        </Box>
        
        </>
    )
}

export default HomeScreen;