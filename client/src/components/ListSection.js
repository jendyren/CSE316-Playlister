import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'

import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Box from '@mui/material/Box'


const ListSection = () => {
    const { store } = useContext(GlobalStoreContext);

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{width: '100%', bgcolor: 'background.paper', mb:"20px" }}>
            {
                store.idNamePairs.map((pair, id) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        cardId={id}
                    />
                ))
                
            }
            </List>;
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