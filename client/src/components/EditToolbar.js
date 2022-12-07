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
    const { idNamePair, published} = props;

    console.log(published);

    console.log("Inside Edit Toolbar");
    console.log(idNamePair);

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
    function handlePublish(){
        let updatedList = store.currentList;
        idNamePair.isPublished = true;
        updatedList.isPublished = true;
        updatedList.datePublished = new Date();
        console.log("PUBLISHING LIST: ")
        store.findPlaylistById(idNamePair._id);
        store.updateCurrentList(updatedList);
        // store.setCurrentList(idNamePair._id);
        console.log("Hopefully published");
    }

    function handleDuplicateList(event, id){
        event.stopPropagation();
        store.duplicateList(id);
    }
    
    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    let toolbarButtons = ""
    if(published){
        toolbarButtons = 
            <Box sx={{display:'flex', flexDirection:"row", backgroundColor: 'white'}}>
                <Button
                    id='delete-button' 
                    onClick={(event) => {
                                handleDeleteList(event, idNamePair._id)
                            }} 
                    variant="contained">
                        Delete
                </Button>
                <Button
                    id='duplicate-button' 
                    onClick={(event) => {
                        handleDuplicateList(event, idNamePair._id)
                    }} 
                    variant="contained">
                        Duplicate
                </Button>
            </Box>   
    }else{
        toolbarButtons = 
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
                    id='publish-button'
                    onClick={handlePublish}
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
                <Button
                    id='duplicate-button' 
                    onClick={(event) => {
                        handleDuplicateList(event, idNamePair._id)
                    }} 
                    variant="contained">
                        Duplicate
                </Button>
            </Box>
        </Box>
    }

    return (
        <>
        <div id="edit-toolbar">
            <Box>
            {toolbarButtons}
            </Box>
        </div>
        </>
        
    )
}

export default EditToolbar;