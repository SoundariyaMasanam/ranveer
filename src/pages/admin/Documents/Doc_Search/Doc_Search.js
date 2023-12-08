import React, { useEffect, useState } from 'react'
import "assets/css/Announcements/Announcements.css"
import { Input } from 'antd';
import { DatePicker, Space } from 'antd';
import { useDispatch } from 'react-redux';
import { memberListDocuments } from "redux/Actions/Member";

const Doc_Search = () => {
  const { RangePicker } = DatePicker;
  const dispatch = useDispatch();
  const [SV, setSV] = useState(false);
  const [SD, setSD] = useState(false);
  useEffect(() => {
    const data = {}
    if (SV) { data.title = SV }
    if (SD) { data.date = SD }
    if(SV || SD || SV === ''){
      dispatch(memberListDocuments(data));
    }    
  }, [SV,SD]);

  const onChange = (date, dateString) => {    
    const fdate = (dateString[0] !== '') ? `${dateString[0]},${dateString[1]}`:false;
    setSD(fdate)
  };
  const { Search } = Input;
  const onSearch = (value) => {
    setSV(value)
  }
  return (
    <div className="card-box" style={{ marginTop: "25px" }}>
      <div className="col-12 col-md-12 d-flex flex-md-row flex-column justify-content-between">
        <div className='col-md-5'></div>
        <div className="col-12 col-md-7 d-flex flex-md-row flex-column gap-2">
          <div className='col-12 col-md-7 d-flex justify-content-start filtered-list-search'>
            <Search
              placeholder="Search"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
              className='onlysearch'
            />
          </div>
          <div className='col-12 col-md-5 d-flex contact-options'>
            <Space direction="vertical">
              {/* <DatePicker onChange={onChange} className='datepicker' /> */}
              <RangePicker onChange={onChange}/>
            </Space>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Doc_Search
