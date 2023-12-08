import React, { useEffect, useState } from 'react'
import QuoteForm from 'components/QuoteForm/QuoteFormNew'
import "assets/css/MemberSearch/MemberSearch.css"
import { useSelector } from 'react-redux';

const SendQuote = ({member}) => {
  const { clickedMember } = useSelector(state => state.loggedin);  
  const [autoFill, setAutoFill] = useState([]);
  useEffect(() => {
    if (clickedMember) {
      setAutoFill([{
        email: clickedMember.email,
        id: clickedMember.id
      }])
    }
  }, [])
  return (
    <>
      <div className="col-xl-12 col-lg-4 col-md-4 col-sm-12 mb-4 mt-4">
        <div className="widget-content widget-content-area">
          <div className="widget-header">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12 col-12 mt-3">
                <h4>Send Quote</h4><br />
              </div>
            </div>
          </div>
          <QuoteForm
            autoFill={autoFill}
            member={member}
            placeholder="Tala Quote"
          />
        </div>
      </div>
    </>
  )
}

export default SendQuote