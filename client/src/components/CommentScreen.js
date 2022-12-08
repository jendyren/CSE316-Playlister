import YouTube from 'react-youtube';
import { useContext, useState } from 'react';
import GlobalStoreContext from '../store';
import AuthContext from '../auth';
import {Box, Typography, IconButton, Card, Grid, List, TextField, Divider} from '@mui/material';
import {Send} from '@mui/icons-material';

export default function CommentScreen(props) {
    const {store} = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [text,setText] = useState('');
    const {currentPlaylist} = props;

    function handleAddComment(event){
        console.log("Inside handleAddComment");
        console.log(event);

        let newComment = {
            username: auth.user.userName,
            comment: text
        }
        setText(' ');
        store.addComment(newComment);
        
    }
    
    let comments = ""
    let commentTextField=""
    let listCounter = 0;

    if(store.currentList && store.currentList.isPublished){
        comments = 
        <List sx={{overflow:'auto', width: '90%', left: '5%', height: '100%'}}>
            {
                store.currentList.comments.map((commentCard) => (
                    <Card key={listCounter++} sx={{height:'75px', backgroundColor:'#e8eab6', margin: '5px'}}>
                        <Typography>{commentCard.username}</Typography>
                        <Divider/>
                        <Typography>
                            {commentCard.comment}
                        </Typography>
                    </Card>
                ))
            }
        </List>;

        commentTextField = 
        <Grid container justifyContent='space-between' alignItems='center' >
            <Grid item xs={10}>
            <TextField 
                value={text}
                onChange={(newValue) => 
                    setText(newValue.target.value)
                }
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
                >
                    <Send/>
                </IconButton>
            </Grid>
        </Grid>
    }


    return (
        <Box>
            <Card height='100px' sx={{backgroundColor:'white'}}>
                {comments}
                {commentTextField}
            </Card>
        </Box>
    )
}
