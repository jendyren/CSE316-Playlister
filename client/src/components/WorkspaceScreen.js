import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import EditToolbar from './EditToolbar.js'
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
function WorkspaceScreen(props) {
    const { store } = useContext(GlobalStoreContext);
    const {idNamePair, published} = props;
    store.history = useHistory();
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let workspaceView = ""
    if(store.currentList){
        if(published){
            workspaceView = 
            <>
            <List 
                id="playlist-cards" 
                sx={{overflow: 'scroll', width: '100%', bgcolor: 'white', zIndex: '5', height:'240px'}}
            >
                {
                    store.currentList.songs.map((song, index) => (
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                            published={published}
                        />
                    ))  
                }
            </List>
            </>
            
        }
        else{
            workspaceView=
                <>
                <Box>
                    <List 
                    id="playlist-cards" 
                    sx={{overflow: 'scroll', width: '100%', bgcolor: 'white', height:'240px'}}
                    >
                    {
                        store.currentList.songs.map((song, index) => (
                            <SongCard
                                id={'playlist-song-' + (index)}
                                key={'playlist-song-' + (index)}
                                index={index}
                                song={song}
                                published={published}
                            />
                        ))  
                    }
                    </List>
                </Box>
                
                </>
        }
    }
    
    
    return (
        <Box id="list-selector-list">
        {workspaceView} 
        <EditToolbar
            idNamePair={idNamePair}
            published={published}
         />     
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;