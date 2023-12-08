import React,{useEffect} from 'react'
import Announce_card from './Announce_card/Announce_card'
import Announce_Doc from './Announce_Doc/Announce_Doc'
import Announce_Search from './Announce_Search/Announce_Search'


const Announcement = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
      }, [])
    return (
        <div className="layout-px-spacing mt-3">
            <Announce_Search/>
            <Announce_card />
            <Announce_Doc />
        </div>
    )
}

export default Announcement