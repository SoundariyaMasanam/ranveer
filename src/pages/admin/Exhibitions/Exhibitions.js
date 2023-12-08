import React,{useEffect} from 'react'
import ExhibitionCard from '../Exhibitions/ExhibitionCard/ExhibitionCard'

const Exhibitions = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  return (
    <ExhibitionCard />
  )
}

export default Exhibitions