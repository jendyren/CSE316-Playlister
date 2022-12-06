import Link from '@mui/material/Link';
import PlaylisterYouTubePlayer from './PlaylisterYouTubePlayer'
import { useState } from 'react';
import {Box, Typography} from '@mui/material';


const YoutubeSection = () => {
    // const tabStyle = {
    //     // width: '100%',
    //     // float: 'left',
    //     // height: '65vh',
    //     // padding: '0'
    // }
    const [value, setValue] = useState('1');
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    return (
        <>
        <div id="youtube-workspace">
            <PlaylisterYouTubePlayer />
            <Typography>Now Playing</Typography>
            {/* <TabContext value={value}>
                <Box sx={{borderColor: 'divider', float:"left", width:"100%", display:"flex", flexDirection:"row"}}>
                    <TabList onChange={handleChange} aria-label="PLAYLIST TABS">
                        <Tab value="1" label="Player" />
                        <Tab value="2" label="Comments" />
                    </TabList>
                </Box>
                <TabPanel value="1">

                </TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
            </TabContext> */}
        </div>
        </>
    );
}

export default YoutubeSection;