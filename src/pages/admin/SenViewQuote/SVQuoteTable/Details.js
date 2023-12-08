import React from 'react'
import Modal from 'react-bootstrap/Modal';
import "assets/css/ModalPage.css"
import { Tooltip } from 'antd';

const Details = ({ title, viewData }) => {
  let images = [];
  if (viewData && viewData?.attachment_url) {
    images = viewData?.attachment_url.split(',');
  }
  
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title className=''>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='quate-details'>
          <div className='col-12 d-flex flex-md-row flex-column gap-md-3'>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>From</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData?.from ? viewData?.from : '-'}
              </div>
            </div>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>To Company</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData?.to_company ? viewData?.to_company : '-'}
              </div>
            </div>
          </div>
          <div className='col-12 d-flex flex-md-row flex-column gap-md-3'>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>CC</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData?.cc ? viewData?.cc : '-'}
              </div>
            </div>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>Posted By</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData?.posted_by ? viewData?.posted_by : '-'}
              </div>
            </div>
          </div>
          <div className='col-12 d-flex flex-md-row flex-column gap-md-3'>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>Quote Number</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData?.quote_number ? viewData?.quote_number : '-'}
              </div>
            </div>
            <div className='col-md-6 col-12 d-flex flex-row'>
              <div className='textLabel col-3'>Subject</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData ? (viewData?.subject.length > 45 ?
                  <Tooltip placement="center" title={viewData?.subject}>
                    {viewData && viewData?.subject.slice(0, 45)}<span >...</span>
                  </Tooltip>
                  : viewData?.subject) : '-'}
              </div>
            </div>
          </div>
          <div className='col-md-6 col-12 d-flex flex-row'>
            <div className='textLabel col-3'>Status</div>
            <div className='textLabel col-1'>:</div>
            <div className='textContent col-7'>
              {viewData?.status === 1 ? 'active' : 'Not active'}
            </div>
          </div>

          <div className='col-12 msgbox'>
            <div className='col-md-6 col-12 d-flex flex-row mt-3'>
              <div className='textLabel col-3'>Message</div>
              <div className='textLabel col-1'>:</div>
              <div className='textContent col-7'>
                {viewData.message ? <div dangerouslySetInnerHTML={{ __html: viewData.message }} ></div> : '-'}
              </div>
            </div>
          </div>
          <div className='col-md-6 col-12 d-flex flex-row'>
            <div className='textLabel col-3'>Attachments</div>
            <div className='textLabel col-1'>:</div>
            <div className='textContent col-6'>
              {images.length > 0 ? images.map((item, index) => {
                const indexvalue = index + 1
                return (
                  <a key={`svi${index}`} target='_blank' href={item}>
                    <div className='d-flex flex-column'>
                      <div className='textContent'>{indexvalue}. Click to Preview</div>
                    </div>
                  </a>
                )
              }) : '-'}
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  )
}

export default Details
