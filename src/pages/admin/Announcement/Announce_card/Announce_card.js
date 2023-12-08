import React from 'react'
import "assets/css/Announcements/Announcements.css"
import Cards from 'components/Cards/Cards'

const Announce_card = () => {
    
    const para = `Check out the latest updates from TALA management on internal news, accomplishments, new licensee announcements, management updates, and more.`;
    return (
        <Cards
            heading="Announcements"
            Para={para}
        />
    )
}

export default Announce_card