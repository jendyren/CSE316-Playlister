import YouTube from 'react-youtube';
import { useContext, useState, useEffect } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid, List, TextField, Divider} from '@mui/material';
import {Send} from '@mui/icons-material';

export default function CommentScreen(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [text,setText] = useState('');
    const {currentPlaylist} = props;

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            // store.changeListName(id, text);
        }
    }

    function handleAddComment(event){
        console.log("Inside handleAddComment");
        console.log(event);
        if (event.target.value.length !== 0){
            console.log("Inside handleAddComment");
            event.target.value=""
            let newComment = {
                username: auth.user.userName,
                comment: text
            }
            store.currentList.comments.push(newComment)
            store.updateCurrentList(store.currentList)
            console.log("Reached Here")
            setText("")
        }
    }
    

    let comments = ''
    if(store.currentList){
        comments = 
        <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.currentList.comments.map((comment) => (
                    <Card sx={{height:'120px'}}>
                        <Typography>{comment.userName}</Typography>
                        <Divider/>
                        <Typography>
                            {comment.message}
                        </Typography>
                    </Card>
                ))
            }
        </List>;
    }
    return (
        <Box>
            <Card height='100px' sx={{backgroundColor:'white'}}>
                {comments}
                <Grid container justifyContent='space-between' alignItems='center' >
                    <Grid item xs={10}>
                        <TextField 
                            onKeyPress={handleKeyPress}
                            onChange={(newValue) => 
                                setText(newValue.target.value)
                            }
                            // disabled={auth.guest} 
                            id={"comment-" + currentPlaylist._id}
                            className='comment-card'
                            label='Comment' 
                            variant="outlined" 
                            sx={{width:'100%',padding:'2px'}} 
                            autoFocus
                            />
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton 
                            onClick={(event) => {
                                handleAddComment(event)
                            }} 
                            // disabled={auth.guest}
                        >
                                <Send/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}



{/* <Box sx={{width:"50%"}} >
    <Stack>
        <Box >
            <Stack  spacing={0.5} sx={{ minHeight:335, maxHeight:335, overflowY:"scroll"}}>
                {top5List.comments.map((comment,index) => (
                    <Box key={"comment" + index} sx={{bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} pl={2}>
                        <Typography sx={{marginTop:1,fontSize:13}}>{comment.owner}</Typography>
                        <Typography sx={{fontSize:25}}>{comment.body}</Typography>
                    </Box>
                ))}
            </Stack>
            
        </Box>
        <Stack>
            <TextField  disabled={auth.isGuest || (top5List.datePublished === null)} onChange={(event) => setText(event.target.value)}  onKeyUp={(event) => addComment(event)} changevariant="filled" label="Add Comment"  sx={{ background:"white",marginTop:1}}></TextField>
        </Stack>
    </Stack>
</Box> */}