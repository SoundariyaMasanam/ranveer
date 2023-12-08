import React, { useEffect } from 'react'
import "assets/css/Documents/Documents.css"
import How_to from "../Documents/How_to/How_to"
import Doc_Search from './Doc_Search/Doc_Search'
import { memberListDocuments } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux'

const Documents = () => {
  const dispatch = useDispatch();
  const { documentsList } = useSelector(state => state.member);
  
  useEffect(() => {
    dispatch(memberListDocuments({}));
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="layout-px-spacing">
      <Doc_Search />
      <div className="row layout-spacing pt-4">
        <How_to documentsList={documentsList} />
      </div>
    </div>
  )
}

export default Documents