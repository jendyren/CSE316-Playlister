import { useContext, useState, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylisterYouTubePlayer from './PlaylisterYouTubePlayer'
import {Box, Typography} from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

const YoutubeSection = (props) => {
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('1');

    const {currentPlaylist} = props;

    console.log("++++++++++++++++++++");
    console.log("Current Playlist is: ");
    console.log(currentPlaylist);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(store.currentList);


    return (
        <>
        <div id="youtube-workspace">
            
            <TabContext value={value}>
                <Box sx={{borderColor: 'divider', float:"left", width:"100%", display:"flex", flexDirection:"row"}}>
                    <TabList onChange={handleChange} aria-label="PLAYLIST TABS">
                        <Tab value="1" label="Player" />
                        <Tab value="2" label="Comments" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <PlaylisterYouTubePlayer 
                        currentPlaylist={currentPlaylist}
                    />
                    
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </div>
        </>
    );
}

export default YoutubeSection;