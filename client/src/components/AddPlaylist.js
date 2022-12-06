import { useContext } from 'react'
import AuthContext from '../auth'
import { GlobalStoreContext } from '../store'
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'

/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/

function AddPlaylist() {
    function handleCreateNewList() {
        store.createNewList();
    }

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    return (
        <>
        <div id="list-selector-heading">
        <Fab sx={{transform:"translate(-20%, 0%)"}}
            color="primary" 
            aria-label="add"
            id="add-list-button"
            onClick={handleCreateNewList}
        >
            <AddIcon />
        </Fab>
            Your Playlists
        </div>
        </>
        
    )
}

export default AddPlaylist;