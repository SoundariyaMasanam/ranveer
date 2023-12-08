import React, { useState, useEffect } from 'react'
import "assets/css/Exhibitions/Exhibitions.css"
import { BsArrowLeftShort } from "react-icons/bs"
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTeamMembers,
  getExhibition
} from "redux/Actions/EventExhibition";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";
import AddEvent from './AddEvent';
import Exhibition from './Exhibition';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { FiInbox } from "react-icons/fi"
import { ToastContainer, toast } from 'react-toastify';
import { setInitialState } from "redux/Reducers/EventExhibitionSlice";

const ExhibitionDetails = ({
  setShowDetails,
  showDetails }) => {
  const [month, setMonth] = useState(false);
  const [year, setYear] = useState(false);
  useEffect(() => {
    const data = {};
    if (year) {
      data.year = year
    }
    else {
      data.year = showDetails
    };
    if (month) { data.month = month }
    dispatch(getExhibition(data));
  }, [month, showDetails]);

  const onChange = (date, dateString) => {
    if (dateString !== '') {
      setMonth(moment(dateString).format('MM'));
      setYear(moment(dateString).format('YYYY'));
    } else {
      setMonth(false);
    }
  };
  const { isSuccess, isError } = useSelector(state => state.exhibition);
  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.msg !== 'undefined') {
        toast.success(`${isSuccess.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
      dispatch(getExhibition({ year: showDetails }))
    }
    if (isError) {
      if (Object.keys(isError).length > 0
        && Object.keys(isError.error).length > 0
        && typeof isError.error.exhibitions !== 'undefined'
        && isError.error.exhibitions.length > 0) {
        toast.error(`${isError.error.exhibitions[0]}`, {
          toastId: 'error',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
    }
  }, [isSuccess, isError]);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    tokenExp,
    teamMember,
    exhibitionDetails,
  } = useSelector(state => state.exhibition);
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);

  useEffect(() => {
    dispatch(getTeamMembers());
  }, []);

  console.log("exhibitionDetails----------->", exhibitionDetails)
  const [isTrash, setIsTrash] = useState()
  const exhbitionHandle = () => {
    exhibitionDetails.data.map((data) => {
      const isTrashed = data.is_trash === 1
        setIsTrash(isTrashed)
    })
  }
  console.log("isTrash",isTrash)
  return (
    <div className="layout-px-spacing">
      <ToastContainer />
      <div className="row layout-spacing layout-top-spacing" id="cancel-row">
        <div className="col-lg-12">
          <div className="widget-content searchable-container grid">
            <div className="card-box">
              <div className="row w-100">
                <div className="col-xl-12 col-lg-12 align-self-center d-flex flex-md-row flex-column w-100">
                  <div className='d-flex flex-row col-md-9 col-12 gap-2'>
                    <div onClick={() => setShowDetails(0)} className="col-md-2 col-2 btn btn-sm readmorebtn text-white  p-1">
                      <div className='mt-1'>
                        <i className="las la-arrow-left">
                          <BsArrowLeftShort />
                        </i>
                        <span className='mt-2' style={{ fontSize: "13px" }}>Back</span>
                      </div>
                    </div>
                    <div className=''>
                      <Space direction="vertical">
                        <DatePicker onChange={onChange} className='datepicker' picker="month" />
                      </Space>
                    </div>
                    {/* <div className='col- col-md-4 d-flex px-3'>
                      <button type="button"
                        style={{ fontSize: "13px" }}
                        className="btn btn-outline-success"
                        onClick={exhbitionHandle}
                      >
                        View Past Events
                      </button>
                    </div> */}
                  </div>

                  <div className='mt-md-0 mt-xl-0 mt-lg-0 mt-3 col-md-3 d-flex justify-content-md-end justify-content-xl-end justify-content-lg-end justify-content-center' >
                    <button type="button"
                      style={{ fontSize: "13px" }}
                      className="btn btn-outline-success"
                      onClick={() => setShow(true)}>
                      Add Event
                    </button>
                  </div>
                  <AddEvent show={show} setShow={setShow} year={showDetails} />
                </div>
              </div>
            </div>
            {Object.keys(exhibitionDetails).length > 0
              && exhibitionDetails.data.length > 0
              ? exhibitionDetails.data.map((item, index) => {
                return (
                  <Exhibition
                    key={`ex${index}`}
                    item={item}
                    teamMember={teamMember}
                    isTrash={isTrash}
                  />
                )
              }) :
              <div className="card-box col-lg-12" style={{ marginTop: "25px" }}>
                <div className='d-flex flex-column justify-content-center dataNotfound'>
                  <div className='d-flex justify-content-center'>
                    <FiInbox style={{ fontSize: "30px", color: "#666666" }} />
                  </div>
                  <div className='d-flex justify-content-center' style={{ color: "#666666" }}>
                    Data not found...
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExhibitionDetails
