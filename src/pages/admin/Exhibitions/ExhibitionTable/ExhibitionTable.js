import React, { useState, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getExhibitionList, getExhibition } from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";
import { FaPaperPlane } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { getTeamMembers } from "redux/Actions/EventExhibition";
import Exhibition from "../ExhibitionDetails/Exhibition"
import { Select } from 'antd';
import { companyList } from "redux/Actions/Company";
import { loctaionsCountryList } from "redux/Actions/Member";
import { RotatingLines } from 'react-loader-spinner';
import { setClickedMember } from "redux/Reducers/LoggedSlice";
import { toast } from 'react-toastify';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";

const columns = [

  {
    title: 'Company Name',
    dataIndex: 'company_name',
    key: 'company_name'
  },
  Table.EXPAND_COLUMN,
  {
    title: 'Licensee Name',
    dataIndex: 'member_name',
    key: 'member_name'
  },
  {
    title: 'Team Member Name',
    dataIndex: 'team_members',
    key: 'team_members'
  },
  {
    title: 'Location',
    dataIndex: 'country',
    key: 'country'
  },
  {
    title: 'Event Name',
    dataIndex: 'exhibition_name',
    key: 'exhibition_name',
  },
  {
    title: 'Event Month',
    dataIndex: 'month',
    key: 'month',
  },
  {
    title: 'Booth No',
    dataIndex: 'booth_number',
    key: 'booth_number'
  },
  // {
  //   title: 'Connect',
  //   dataIndex: 'connecticon',
  //   key: 'connect'
  // },
];

const ExhibitionTable = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { id } = useParams();
  const {
    exhibitionDetails,
    teamMember,
    isSuccess } = useSelector(state => state.exhibition);
  const [eventHead, setEventHead] = useState(false);
  useEffect(() => {
    if (typeof id !== 'undefined') {
      const data = exhibitionDetails.data.find((item) => item.id == id);
      dispatch(getTeamMembers());
      const ye = data?.year.split('/');
      setEventHead(data);
      if (isSuccess) {
        if (Object.keys(isSuccess).length > 0
          && typeof isSuccess.msg !== 'undefined') {
          toast.success(`${isSuccess.msg}`, {
            toastId: 'success',
            autoClose: 1000
          })
        }
        dispatch(setInitialState(false));
        dispatch(getExhibition({ year: ye[2] }))
      }
      dispatch(getExhibitionList({ event_id: id }))
    } else {
      dispatch(getExhibitionList({}));
    }


  }, [id, isSuccess, exhibitionDetails])

  const { isLoading, tokenExp, exhibitionList } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);
  const [exhibition, setExhibition] = useState([]);
  const [rowSeleted, setRowSelected] = useState(false);
  useEffect(() => {
    if (rowSeleted) {
      if (Object.keys(exhibitionList).length > 0
        && exhibitionList.data.length > 0) {
        dispatch(setClickedMember(rowSeleted));
        navigate(`/companyprofile/${rowSeleted.company_id}/${rowSeleted.member_id}`)
      }
    }
  }, [rowSeleted])

  useEffect(() => {
    let tex = [];
    if (Object.keys(exhibitionList).length > 0
      && Object.keys(exhibitionList.data).length > 0) {
      exhibitionList.data.map((item, index) => {
        tex.push({
          key: index,
          allocated_id: item.allocated_id ? item.allocated_id : '-',
          arrival: item.arrival ? item.arrival : '-',
          attended_at: item.attended_at ? item.attended_at : '-',
          attending: item.attending ? item.attending : '-',
          booth_number: item.booth_number ? item.booth_number : '-',
          company_exhibiting: item.company_exhibiting ? item.company_exhibiting : '-',
          company_id: item.company_id ? item.company_id : '-',
          company_name: item.company_name ? item.company_name : '-',
          connect: item.connect ? item.connect : '-',
          country: item.country ? item.country : '-',
          departure: item.departure ? item.departure : '-',
          email: item?.member_email ? item?.member_email : '-',
          event_date: item?.event_date ? item?.event_date : '-',
          exhibition_name: item?.exhibition_name ? item?.exhibition_name : '-',
          id: item.member_id ? item.member_id : '-',
          is_canceled: item.is_canceled ? item.is_canceled : '-',
          member_email: item.member_email ? item.member_email : '-',
          member_id: item.member_id ? item.member_id : '-',
          member_name: item.member_name ? item.member_name : '-',
          month: item.month ? item.month : '-',
          other_team_members: item.other_team_members ? item.other_team_members : '-',
          team_members: item.team_members ? item.team_members : '-',
          connecticon: <FaPaperPlane style={{ cursor: "pointer" }} />
        })
      });
    }
    setExhibition(tex);
  }, [exhibitionList]);

  const { companyListData } = useSelector(state => state.company);
  const [company, setCompany] = useState([]);
  useEffect(() => {
    let company = [];
    if (Object.keys(companyListData).length > 0
      && companyListData.data.length) {
      companyListData.data.map(item => {
        company.push({
          value: item.company_name,
          label: item.company_name
        })
      })
    }
    setCompany(company);
  }, [companyListData])
  const { countryList } = useSelector(state => state.member);
  const [country, setCountry] = useState([]);
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

    setCountry(country);
  }, [countryList]);
  useEffect(() => {
    dispatch(companyList());
    dispatch(loctaionsCountryList());
  }, []);

  const [SCD, setSCD] = useState({});
  const handleOnChange = (value, name) => {
    setSCD({ [name]: value })
    let finaldata = {};
    if (typeof id !== 'undefined') {
      finaldata.event_id = id;
    }
    if (typeof value !== 'undefined') {
      finaldata[name] = value;
    }

    dispatch(getExhibitionList(finaldata));
  }

  return (
    <>
      {typeof id !== 'undefined' &&
        <>
          <Exhibition
            key={`ex54`}
            item={eventHead}
            teamMember={teamMember}
          />

        </>
      }
      <div className="layout-pxx-spacing col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12 mb-4">
        <div className="statbox widget box box-shadow">
          <div className="widget-header">
            <div className="col-12 d-flex flex-md-row flex-column mb-5 ">
              <div className="col-12 col-md-4">
                <h4 className='annualTitles'>Exhibition</h4><br />
              </div>
              <div className='col-12 d-flex flex-md-row flex-column col-md-8 justify-content-md-end justify-content-start gap-3'>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.company}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Company Name'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={company}
                    onChange={(value) => {
                      handleOnChange(value, 'company');
                    }}
                  />
                </div>
                <div className='col-12 col-md-5 d-flex justify-content-end  contact-options'>
                  <Select
                    value={SCD?.country}
                    allowClear
                    showSearch
                    style={{ width: "100%", marginTop: "10px" }}
                    placeholder={'Select Country'}
                    filterOption={(input, option) => (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())}
                    optionFilterProp={'children'}
                    options={country}
                    onChange={(value) => {
                      handleOnChange(value, 'country');
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='w-100'>
            {!isLoading ?
              <Table
                scroll={{
                  x: 600,
                }}
                columns={columns}
                onRow={(record, rowIndex) => {
                  return {
                    onClick: event => {
                      setRowSelected(record);
                    }
                  };
                }}
                expandable={{
                  expandedRowRender: (record) => (
                    <div
                      style={{
                        margin: 0,
                      }}
                    >
                      Arrival Date - {record.arrival}<br />
                      Departure Date - {record.departure}
                    </div>
                  ),
                }}
                dataSource={exhibition}
                pagination={{
                  defaultPageSize: 20,
                  showSizeChanger: true,
                  pageSizeOptions: ['20', '50', '100']
                }}
              />
              :
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
          </div>
        </div>
      </div>

    </>
  )
}

export default ExhibitionTable
