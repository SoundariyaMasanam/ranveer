import React, { useState, useEffect } from 'react'
import SVQuoteCard from './SVQuoteCard/SVQuoteCard'
import SVQuoteForm from './SVQuoteForm/SVQuoteForm'
import SVQuoteTable from './SVQuoteTable/SVQuoteTable'
import SearchBox from 'components/Search/SearchBox'
import ReceiveQT from './SVQuoteTable/ReceiveQT'
import { useDispatch, useSelector } from 'react-redux';
import { receivedQuote, sendsQuotes } from "redux/Actions/SendQuote"
import { RotatingLines } from 'react-loader-spinner';

const SendViewQuote = () => {
  const [autoFill, setAutoFill] = useState([]);
  const [removeId, setRemoveId] = useState(false);
  const { isLoading, quoteList, sendQuoteList } = useSelector(state => state.sendquote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(receivedQuote());
    dispatch(sendsQuotes());
    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [])
  return (
    <>
      {!isLoading ?
        <>
          <div className="layout-px-spacing">
            <div className="row layout-spacing pt-4">
              <SearchBox heading="Send View Licensee Search" type="quote" />
              <SVQuoteCard setAutoFill={setAutoFill} removeId={removeId} />
              <SVQuoteForm autoFill={autoFill} setRemoveId={setRemoveId} />
              <SVQuoteTable quoteList={sendQuoteList} />
              <ReceiveQT quoteList={quoteList} />
            </div>
          </div>
        </> :
        <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
          <RotatingLines
            strokeColor="#bbce00"
            strokeWidth="5"
            animationDuration="1.00"
            width="70"
            visible={true}
          />
        </div>
      }
    </>
  )
}

export default SendViewQuote