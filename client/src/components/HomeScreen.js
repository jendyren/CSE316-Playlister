import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListSection from './ListSection';
import HomeBanner from './HomeBanner'

const HomeScreen = () => {
    const { store } = useContext(GlobalStoreContext);

    return (
        <>
        <HomeBanner/>
        {/* <ListSection/> */}
        </>
    )
}

export default HomeScreen;