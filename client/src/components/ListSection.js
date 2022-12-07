import React, { useContext, useEffect, useState } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import IconButton from '@mui/material/IconButton';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import WorkspaceScreen from './WorkspaceScreen'


const ListSection = () => {
    const { store } = useContext(GlobalStoreContext);
    const [expandedId, setExpandedId] = useState(-1);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleExpandClick(id){
        console.log("inside handleExpand click");
        console.log("expandedId: " + expandedId);
        console.log("Passed in id: " + id);
        store.findPlaylistById(id);
        setExpandedId(expandedId === id ? -1 : id);
    };


    // let workspace=""
    // if(store.currentList){
    //     workspace = <WorkspaceScreen
    //         idNamePair={idNamePair}
    //         published={published}
    //     />
    // }

    let listCard = "";
    if (store) {
        listCard = 
        <>  
        <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
        {   
            store.idNamePairs.map((pair, id) => (
                <Card key={id} sx={{padding: '0'}}>
                    <CardContent sx={{padding: '0'}}>
                        <Box sx={{backgroundColor: '#ebebf7', margin: '1px', display: 'flex', flexDirection:'row', margin: '0', padding: '5px'}}>
                            <ListCard
                                key={pair._id}
                                idNamePair={pair}
                                selected={false}
                                expandedId={expandedId}
                            />
                        
                            <IconButton 
                                aria-label="expand" 
                                onClick={() => {
                                    handleExpandClick(pair._id)
                                }}
                                aria-expanded={expandedId === pair._id}
                                sx={{textAlign: 'right'}}>
                                <KeyboardDoubleArrowDownIcon 
                                    aria-label="show more"
                                    sx={{transform: !(expandedId === pair._id) ? 'rotate(0deg)' : 'rotate(180deg)'
                                }}
                                />
                            </IconButton>
                        </Box>
                        {/* <Collapse in={expandedId === pair._id}  timeout="auto" unmountOnExit>
                            <CardContent sx={{width: '100%',minHeight: '300px', fontSize: '0.5em', display:'flex', flexDirection:'column'}}>
                                <WorkspaceScreen
                                    key={pair._id}
                                    idNamePair={pair}
                                    published={pair.isPublished}
                                />
                            </CardContent>
                        </Collapse> */}
                    </CardContent> 
                </Card>
            ))
            
        }
        </List>;
                
        </>

            
    }
    return (
        <div id="playlist-workspace">
            <Box sx={{bgcolor:"background.paper"}} id="list-selector-list">
                {
                    listCard
                }
                <MUIDeleteModal />
            </Box>
        </div>
    )
}

export default ListSection;



{/* <Box>
    <IconButton 
        aria-label="expand" 
        onClick={() => {
            handleExpandClick(idNamePair._id)
        }}
        aria-expanded={expanded}
        sx={{textAlign: 'right'}}>
        <KeyboardDoubleArrowDownIcon 
            aria-label="show more"
            sx={{transform: !expanded ? 'rotate(0deg)' : 'rotate(180deg)'
        }}
        />
    </IconButton>
</Box>
<Collapse in={expanded}  timeout="auto" unmountOnExit>
    <CardContent sx={{width: '100%',minHeight: '300px', fontSize: '0.5em', display:'flex', flexDirection:'column'}}>
        {workspace}
    </CardContent>
</Collapse> */}