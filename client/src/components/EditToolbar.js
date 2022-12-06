import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';
import CloseIcon from '@mui/icons-material/HighlightOff';
import { Box } from '@mui/material';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar(props) {
    const { store } = useContext(GlobalStoreContext);
    const { idNamePair } = props;

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        store.closeCurrentList();
    }
    
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    return (
        <div id="edit-toolbar">
            <Box sx={{display:'flex', flexDirection:"column", backgroundColor: 'white'}}>
                <Button
                    disabled={!store.canAddNewSong()}
                    id='add-song-button'
                    onClick={handleAddNewSong}
                    variant="contained">
                        Add
                </Button>
                <Box>
                    <Button 
                        disabled={!store.canUndo()}
                        id='undo-button'
                        onClick={handleUndo}
                        variant="contained">
                            Undo
                    </Button>
                    <Button 
                        disabled={!store.canRedo()}
                        id='redo-button'
                        onClick={handleRedo}
                        variant="contained">
                            Redo
                    </Button>
                    <Button 
                        disabled={!store.canClose()}
                        id='close-button'
                        onClick={handleClose}
                        variant="contained">
                            Publish
                    </Button>
                    <Button
                        id='delete-button' 
                        onClick={(event) => {
                                    handleDeleteList(event, idNamePair._id)
                                }} 
                        variant="contained">
                            Delete
                    </Button>
                </Box>
            </Box>
            
            
        </div>
    )
}

export default EditToolbar;