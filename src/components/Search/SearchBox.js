import React, { useEffect, useState } from 'react';
import BoldHeading from 'components/BoldHeading/BoldHeading';
import { setExteraRoute } from "redux/Reducers/LoggedSlice";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { BiRefresh } from "react-icons/bi";
import { Select } from 'antd';
import "assets/css/Search.css";
import {
  companyList,
  companyListParms
} from "redux/Actions/Company";
import {
  setInitialListParms
} from "redux/Reducers/CompanySlice";
import {
  loctaionsCountryList,
  loctaionsRegionList,
  memberSearch
} from "redux/Actions/Member";
import {
  setForSearchInit,
  setInitialState,
  setCountryList,
  setForSearch
} from 'redux/Reducers/MemberSlice';

const SearchBox = ({ heading, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    companyListData,
    ListParms
  } = useSelector(state => state.company);
  const {
    forSearch,
    regionList,
    countryList,
  } = useSelector(state => state.member);

  useEffect(() => {
    if (type === 'dashboard' && Object.keys(forSearch).length > 0) {
      dispatch(setExteraRoute('Licensee Search'));
      navigate('/membersearch');
    }
  }, [forSearch])

  useEffect(() => {
    if (Object.keys(companyListData).length === 0) {
      dispatch(companyList());
    }
    if (Object.keys(regionList).length === 0) {
      dispatch(loctaionsRegionList({}));
    }
    dispatch(setCountryList());
    window.scrollTo(0, 0);
  }, []);

  const [value, setValue] = useState({});
  const [searchLicensees, setSearchLicensees] = useState([]);
  const [searchContinent, setSearchContinent] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);

  useEffect(() => {
    let region = [];
    if (Object.keys(regionList).length > 0
      && regionList.data.length) {
      regionList.data.map(item => {
        region.push({
          value: item,
          label: item,
        })
      })  
    }
    setSearchContinent(region);

  }, [regionList])

  useEffect(() => {
    let company = [];
    if (Object.keys(ListParms).length > 0
      && ListParms.data.length > 0) {
      ListParms.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    } else if (Object.keys(companyListData).length > 0
      && companyListData.data.length > 0) {
      companyListData.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    }
    setSearchLicensees(company);
  }, [companyListData, ListParms])

  useEffect(() => {
    let country = [];
    if (Object.keys(countryList).length > 0
      && countryList.data.length) {
      countryList.data.map(item => {
        country.push({
          value: item,
          label: item
        })
      })
    }
    setSearchCountry(country);
  }, [countryList]);


  useEffect(() => {
    if (Object.keys(value).length > 0 && value.name === 'region') {
      dispatch(loctaionsCountryList({ region: value.value }));
    }
  }, [value])

  const ResetSearch = () => {
    dispatch(setInitialListParms());
    dispatch(setForSearchInit());
  }

  const handleOnChange = (value, name) => {
    if (typeof value !== 'undefined') {
      dispatch(setForSearch({ [name]: value }));
    } else {
      dispatch(setForSearch({}));
    }
    if (typeof value !== 'undefined' && name === 'region') {
      dispatch(companyListParms({ continent: value }));
    }
    if (typeof value === 'undefined' && name === 'region') {
      dispatch(setInitialListParms());
    }
  }

  useEffect(() => {
    if (Object.keys(forSearch).length > 0) {
      dispatch(memberSearch(forSearch))
    } else {
      dispatch(setInitialState());
    }
  }, [forSearch]);


  return (
    <>
      <div className="">
        <div className="widget-header">
          <div className="row">
            <div className="memberHeader col-xl-12 col-md-12 col-sm-12 col-12">
              <div className="widget-header">
                <BoldHeading
                  Boldheading={heading}
                />
              </div>
              <br />
            </div>
          </div>
        </div>
        <div className="card-box">
          <div className="col-12 col-md-12 d-flex flex-md-column flex-xl-row flex-lg-row flex-column justify-content-between gap-2">
            <div className='col-12 col-md-12 col-xl-4 col-lg-4 d-flex justify-content-start filtered-list-search'>
              <Select
                allowClear
                showSearch
                value={forSearch['company_name']}
                style={{ width: "100%" }}
                placeholder={"Search Licensees"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={searchLicensees}
                className={"searchAntd"}
                onChange={(value) => {
                  handleOnChange(value, 'company_name');
                }}
              />
            </div>
            <div className='col-12 col-md-12 col-xl-3 col-lg-3 d-flex contact-options'>
              <Select
                allowClear
                showSearch
                value={forSearch["region"]}
                style={{ width: "100%" }}
                placeholder={"Search Continent"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                // filterSort={(optionA, optionB) =>
                //   (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                // }
                options={searchContinent}
                onChange={(value) => {
                  handleOnChange(value, "region");
                  setValue({ name: "region", value: value })
                }}
              />
            </div>
            <div className='col-12  col-md-12 col-xl-3 col-lg-3 d-flex contact-options'>
              <Select
                allowClear
                showSearch
                value={forSearch["country"]}
                style={{ width: "100%" }}
                placeholder={"Search Country"}
                optionFilterProp={"children"}
                filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                filterSort={(optionA, optionB) =>
                  (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                }
                options={searchCountry}
                onChange={(value) => {
                  handleOnChange(value, "country");
                }}
                notFoundContent="Select Continent First"
              />
            </div>
            <div className="col-md-2 col-xl-2 col-lg-2 btn btn-sm btn-primaryss" onClick={() => ResetSearch()}>
              <div className='mt-1' >
                <i className="las la-arrow-left">
                  <BiRefresh style={{ fontSize: "20px" }} />
                </i>
                <span className='mt-2'>Reset</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SearchBox