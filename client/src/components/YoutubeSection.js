import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import PlaylisterYouTubePlayer from './PlaylisterYouTubePlayer'
import {Box, Typography} from '@mui/material';

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import {IconButton} from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

const YoutubeSection = (props) => {
    // const tabStyle = {
    //     // width: '100%',
    //     // float: 'left',
    //     // height: '65vh',
    //     // padding: '0'
    // }
    const { store } = useContext(GlobalStoreContext);
    const [value, setValue] = useState('1');
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
                    <PlaylisterYouTubePlayer />
                    
                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext>
        </div>
        </>
    );
}

export default YoutubeSection;