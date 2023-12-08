import React, { useState, useEffect, useRef } from 'react'
import QuoteForm from 'components/QuoteForm/QuoteForm'
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { useParams } from 'react-router-dom';

const SVQuoteForm = ({ autoFill, setRemoveId }) => {
  const [value, setValue] = useState('');
  const scrollRef = useRef(null);
  let { stype } = useParams();
  useEffect(() => {
    if (stype === 's') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stype])
  return (
    <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12 col-12 mb-4">
      <div className="widget-content widget-content-area">
        <div className="widget-header">
          <BoldHeading
            Boldheading="Send / View Quote"
          />
        </div>
        <br />
        <QuoteForm
          autoFill={autoFill}
          setRemoveId={setRemoveId}
          value={value}
          setValue={setValue}
          placeholder="Tala Quote"
        />
        <div ref={scrollRef}></div>
      </div>
    </div>
  )
}

export default SVQuoteForm