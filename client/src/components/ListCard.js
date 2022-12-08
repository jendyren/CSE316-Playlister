import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import EditToolbar from './EditToolbar';
import {Link} from '@mui/material';

import { Typography } from '@mui/material';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import ThumbUpAltRoundedIcon from '@mui/icons-material/ThumbUpAltRounded';
import ThumbDownAltRoundedIcon from '@mui/icons-material/ThumbDownAltRounded';
import WorkspaceScreen from './WorkspaceScreen'


/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected, expandedId } = props;
    let published = idNamePair.isPublished;

    const [expanded, setExpanded] = useState(false);
    // const [expandedId, setExpandedId] = useState(-1);

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    function handleAddDislike(){
        console.log("Adding Disliker")
        store.findPlaylistById(idNamePair._id);
        if(store.currentList){
            let playlist = store.currentList;
            console.log("*******");
            console.log(playlist);
            console.log(auth.user.userName)
    
            if (playlist.dislikers.includes(auth.user.username)){
                playlist.dislikers.splice(playlist.dislikers.indexOf(auth.user.username),1)
                
            }else if (playlist.likers.includes(auth.user.username)){
                playlist.dislikers.push(auth.user.username);
                playlist.likers.splice(playlist.likers.indexOf(auth.user.username),1)
            }else{
                playlist.dislikers.push(auth.user.username);
            }
            
            store.updateCurrentList(playlist);
        }
        
        
    }

        
    function handleDoubleClick(event) {
        if (event.detail === 2) {
            event.stopPropagation();
            handleToggleEdit(event);
        }
    }
    function handleExpandClick(id){
        // handleLoadList(event, idNamePair._id);
        setExpanded(!expanded);
        store.findPlaylistById(id);  
        console.log(store.currentList);
    };

    // function handleExpandClick(id){
    //     console.log("inside handleExpand click");
    //     console.log("expandedId: " + expandedId);
    //     console.log("Passed in id: " + id);
    //     store.findPlaylistById(id);
    //     console.log(store.foundList);
    //     setExpandedId(expandedId === id ? -1 : id);
    // };

    let selectClass = "unselected-list-card";
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    const publishedCardStyle = {
        borderRadius:"25px", 
        p: "10px", 
        bgcolor: '#8000F02B', 
        display: 'flex', 
        p: 1, 
        fontSize: '0.5em',
        display:'flex', 
        flexDirection:'column'
    }
    const unpublishedCardStyle = {
        borderRadius:"25px", 
        p: "10px", 
        bgcolor: '#8000F00F', 
        display: 'flex', 
        p: 1, 
        fontSize: '0.5em',
        display:'flex', 
        flexDirection:'column'
    }


    let publishedCard = 
        <Card
            id={idNamePair._id}
            sx={publishedCardStyle}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt', padding:'0'}}
            onClick={handleDoubleClick}
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
            <CardContent sx={{ width:'90%', display:'flex', flexDirection:'row', margin:'auto',padding:'0'}}>
                <Box sx={{ width:'100%', display:'flex', flexDirection:'column', paddingTop: '10px'}}>
                    <Box sx={{ display:'flex', flexDirection:'row', justifyContent: 'space-between'}}>
                        <Box>
                            <Box sx={{fontSize: '0.3em', fontWeight:'bold'}}>
                                {idNamePair.name}
                            </Box>
                            <Box sx={{fontSize: '0.2em'}}>
                                By {idNamePair.userName}
                            </Box>
                        </Box>
                        <Box sx={{ display:'flex', flexDirection:'row'}}>
                            <IconButton aria-label="like">
                                <ThumbUpOffAltOutlinedIcon style={{fontSize:'1.5em'}} />
                            </IconButton>
                            <Typography sx={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                                {idNamePair.likers.length}
                            </Typography>
                            <IconButton aria-label="dislike" onClick={handleAddDislike}>
                                <ThumbDownOffAltOutlinedIcon style={{fontSize:'1.5em'}} />
                            </IconButton>
                            <Typography sx={{display: 'flex', alignItems: 'center', marginRight: '10px'}}>
                                {idNamePair.dislikers.length}
                            </Typography>
                        </Box>
                    </Box>
                   
                    <Box>
                        <Box sx={{display:'flex', flexDirection:'row', marginTop: '20px'}}>
                            <Box sx={{fontSize: '0.2em', marginRight: '50%'}}>
                                Published {idNamePair.datePublished}
                            </Box>
                            <Box sx={{fontSize: '0.2em'}}>
                                Listens {idNamePair.listens}
                            </Box>
                        </Box>
                    </Box>
  
                </Box>
            </CardContent>
            <Collapse in={expandedId === idNamePair._id}  timeout="auto" unmountOnExit>
                <CardContent sx={{width: '100%',minHeight: '300px', fontSize: '0.5em', display:'flex', flexDirection:'column'}}>
                    <WorkspaceScreen
                        idNamePair={idNamePair}
                        published={idNamePair.isPublished}
                    />
                </CardContent>
            </Collapse>
        </Card>

    let unpublishedCard = 
        <Card
            id={idNamePair._id}
            sx={unpublishedCardStyle}
            style={{transform:"translate(1%,0%)", width: '98%', fontSize: '48pt', padding:'0'}}
            onClick={handleDoubleClick}
            // onClick={(event) => {
            //     handleLoadList(event, idNamePair._id)
            // }}
        >
            <CardContent sx={{ width:'90%', display:'flex', flexDirection:'row', margin:'auto', padding:'0'}}>
                <Box sx={{ width:'100%', display:'flex', flexDirection:'column', paddingTop: '10px'}}>
                    <Box sx={{fontSize: '0.3em', fontWeight:"bold"}}>
                        {idNamePair.name}
                    </Box>
                    <Box sx={{fontSize: '0.2em'}}>
                        By {idNamePair.userName}
                    </Box>
                </Box>
            </CardContent>
            <Collapse in={expandedId === idNamePair._id}  timeout="auto" unmountOnExit>
                <CardContent sx={{width: '100%',minHeight: '300px', fontSize: '0.5em', display:'flex', flexDirection:'column'}}>
                    <WorkspaceScreen
                        idNamePair={idNamePair}
                        published={idNamePair.isPublished}
                    />
                </CardContent>
            </Collapse>
            
        </Card>


    let cardElement = ""
    if(published){
        cardElement = publishedCard;
    }else{
        cardElement = unpublishedCard
    }
       

    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        <>
        {cardElement}
        </>
        
    );
}

export default ListCard;