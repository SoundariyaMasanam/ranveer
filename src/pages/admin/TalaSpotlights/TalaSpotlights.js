import React,{useEffect} from 'react'
import "assets/css/Spotlights/Spotlights.css"
import TalaSpotlightsCard from './TalaSpotlightsCard/TalaSpotlightsCard';

const TalaSpotlights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <div className="layout-px-spacing">
      <TalaSpotlightsCard />
    </div>
  )
}

export default TalaSpotlights;