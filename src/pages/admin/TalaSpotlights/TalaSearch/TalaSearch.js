import React, { useState, useEffect } from 'react'
import "assets/css/Spotlights/Spotlights.css";
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { Input, Select } from 'antd';
import {
  getSpotlightListing,
  getSpotlightCategoryListing
} from "redux/Actions/Spotlight";


const TalaSearch = () => {

  // let navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   navigate("/spotlightsubmission")
  // }
  const { spotlightCatgoryListing } = useSelector(state => state.spotlight);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    dispatch(getSpotlightCategoryListing());
  }, []);
  useEffect(() => {
    let c = [];
    if (Object.keys(spotlightCatgoryListing).length > 0
      && spotlightCatgoryListing.data.length) {
      spotlightCatgoryListing.data.map((item, key) => {
        c.push({
          value: item.id,
          label: item.title,
        })
      })
    }
    c.push({
      value: -1,
      label: 'Latest Post',
    })
    setCategory(c)
  }, [spotlightCatgoryListing]);
  const [SV, setSV] = useState(false);
  const [SC, setSC] = useState(false);
  useEffect(() => {
    const data = {}
    if (SV) { data.title = SV }
    if (SC) { data.id_category = SC }
    dispatch(getSpotlightListing(data));
  }, [SV, SC]);

  const { Search } = Input;
  const handleOnChange = (value) => {
    setSC(value);
  }
  const onSearch = (value) => {
    setSV(value)
  }

  return (
    <div className="col-xl-12 col-lg-4 col-md-12 col-sm-12 col-12 mb-4">
      <div className="widget-content searchable-container grid">
        <div className="card-box">
          {/* <div className='col-12 col-md-12 d-flex justify-content-end mb-3'>
            <button type="primary" shape="round" size={`large`} onClick={handleClick} className='submitspotlights'>
              Submit Spotlights
            </button>
          </div> */}
          <div className="col-12 col-md-12 d-flex flex-md-row flex-column  gap-3">
            <div className='col-12 col-md-6 d-flex justify-content-start filtered-list-search'>
              <Search
                placeholder="Search Spotlight"
                allowClear
                enterButton="Search"
                size="large"
                onSearch={onSearch}
              />
            </div>
            <div className='col-12 col-md-6 d-flex justify-content-start filtered-list-search'>
              <Select
                allowClear
                showSearch
                style={{ width: "100%" }}
                placeholder={'Latest Post'}
                optionFilterProp={'children'}
                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={category}
                onChange={(value) => {
                  handleOnChange(value);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TalaSearch