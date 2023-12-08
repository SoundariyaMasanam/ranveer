import React, { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import BoldHeading from 'components/BoldHeading/BoldHeading';

const MeetMembersForm = () => {
  const [value, setValue] = useState('');
  return (
    <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12 mb-4">
      <div className="widget-content widget-content-area">
        <div className="widget-header">
          <BoldHeading
            Boldheading="Send Message"
          />
        </div>
        <br />
        <>
          <div className="w-100">
            <div className="form-group row">
              <div className="col-lg-6">
                <label className='mb-2'>From:</label>
                <input type="email" className="form-control" />
              </div>
              <div className="col-lg-6">
                <label className='mb-2'>Cc:</label>
                <input type="email" className="form-control" />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label className='mb-2'>To:</label>
                <div className="input-group">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-6">
                <label className='mb-2'>Subject:</label>
                <div className="input-group">
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="col-lg-12">
                <br /><br />
                <div className="">
                  <div className="form-group row">
                    <label className='mb-2'>Message</label>
                    <div className="col-lg-12 col-sm-12">
                      <ReactQuill
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        placeholder='Type Your Message'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="widget-footer text-right">
            <button type="button" className="btn btn-primary mr-2">Submit</button>
          </div>
        </>
      </div>
    </div>
  )
}

export default MeetMembersForm