import React, { useEffect, useState } from 'react';
import { HiUsers } from "react-icons/hi";
import { AiFillCalendar } from "react-icons/ai";
import { MdLocationPin } from "react-icons/md"
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { attendExhibition } from "redux/Actions/EventExhibition";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import { AiOutlineInfoCircle } from "react-icons/ai"
import { cancelAttendedExhibition } from "redux/Actions/EventExhibition";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { TbAlertCircle } from "react-icons/tb"
import styles from "components/ScrollStyle"

const animatedComponents = makeAnimated();

const Exhibition = ({
  item,
  teamMember,
  isTrash
}) => {
  const dispatch = useDispatch();
  const { companyProfileData } = useSelector(state => state.company);
  const { validation,
    isLoading,
    isSuccess } = useSelector(state => state.exhibition);

  const [show, setShow] = useState(false);
  const { register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors } }
    = useForm();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        setValue('attending', "");
        setValue('member_id', "");
        setValue('company_exhibiting', "");
      }, 1000);
    }
  }, [isSuccess]);

  const [MEM, setMEM] = useState([]);
  const [MEV, setMEV] = useState([]);
  const [MER, setMER] = useState(false);
  const [person, setPerson] = useState('');

  useEffect(() => {
    let member = [];
    if (Object.keys(teamMember).length > 0
      && teamMember.data.length) {
      teamMember.data.map(item => {
        member.push({
          value: item.id,
          label: item.name,
          others: "Others"
        })
      })
    }
    member.push({
      value: 0,
      label: 'Others'
    })
    setMEM(member);
  }, [teamMember]);

  const handleOnChange = (value) => {
    let mp = [];
    const oth = value.find(item => item.value === 0);
    if (typeof oth !== 'undefined') { setPerson('Others'); } else { setPerson(''); }
    if (value.length > 0) {
      setMER(false);
      value.map(item => {
        mp.push(item.value);
      });
    } else {
      setMER(true);
    }
    setMEV(mp);
  }
  const attending = watch("attending", "");
  const exhibiting = watch("company_exhibiting", "");

  const onSubmit = async (data) => {
    const finalData = {
      arrival: data.arrival,
      attending: data.attending,
      company_exhibiting: data.company_exhibiting,
      departure: data.departure,
      exhibition_id: data.exhibition_id !== '' ? data.exhibition_id : item.id,
      team_member_ids: MEV,
      month: "",
      country: "",
      company_id: companyProfileData.data.company_info.id,
      booth_number: "",
      other_team_members: {},
    }

    if (person === "Others") {
      finalData.other_team_members = {
        name: data.name,
        email: data.email
      };
    }
    if (data.company_exhibiting === "1") {
      finalData.booth_number = data.booth_number;
    }
    dispatch(attendExhibition(finalData));
    // }
  }
  const RestForm = () => {
    setValue('attending', "");
    setValue('company_exhibiting', "");
  }

  const currentDate = new Date(moment(new Date()).format('YYYY-MM-DD')).getTime();
  const [AD, setAD] = useState(currentDate);

  let arivalDisabled = (current) => {
    return current && new Date(moment(current.$d).format('YYYY-MM-DD')).getTime() < currentDate;
  };
  let deparDisabled = (current) => {
    return current && new Date(moment(current.$d).format('YYYY-MM-DD')).getTime() < AD;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const cancelHandle = (id) => {
    setShow(false)
    dispatch(cancelAttendedExhibition({ event_id: id }))
  }

  // console.log("item---------------->", isTrash)
  return (
    <>
      {/* {isTrash === false ?
        <>
          {item.is_trash === 1 &&
            <div className='layout-pxx-spacing'>
              <form className={`login-form mt-4 mb-4 ${item?.id} a${item?.already_attended}`}
                onSubmit={handleSubmit(onSubmit)} >
                <div className="col-lg-12">
                  <div className="widget-content searchable-container grid">
                    <div className="card-box">
                      <div className='row' >
                        <div className="col-xl-6 col-lg-8 col-md-8 company-detail-container mt-3">
                          <div className="d-flex flex-md-row flex-xl-row flex-lg-row flex-column align-items-start">
                            <div className='d-flex align-items-center'>
                              <img src={item?.thumbnail_url} alt="avatar" style={{ width: "150px" }} />
                            </div>
                            <div className="company-info px-3 mt-md-0 mt-xl-0 mt-lg-0 mt-3">
                              <p className="name mb-1">{item?.name}</p>
                              <p className="text-muted font-12 mb-1">
                                <i className="las la-map-marker font-15">
                                  <MdLocationPin />
                                </i> {item?.location}
                              </p>
                              <p className="text-muted font-12 mb-1 ">
                                <i className="las la-map-marker font-15">
                                  <AiFillCalendar />
                                </i> {item?.year}
                              </p>
                              <p className="text-muted font-12 mb-1 ">
                                <i className="las la-map-marker font-15">
                                  <HiUsers />
                                </i> No.of Licensee Attendees - {item?.no_of_attendee}
                              </p>
                              <div className="text-primary font-12 mb-2 d-block" style={{ width: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                <p onClick={() => window.open(item?.website)} style={{ cursor: "pointer" }}>
                                  Visit Event Page
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-6 col-lg-4 col-md-4 company-detail-container mt-3">
                          {
                            item?.is_passed === 1 &&
                            <div className="card-box">
                              <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}>
                                <AiOutlineInfoCircle />
                              </div>
                              <div className='al-sub text-center'>This event is live now, submission is closed.</div>
                            </div>
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div >
          }
        </>
        : */}
        <>
          {item.is_trash === 0 &&
            <>
              <div className='layout-pxx-spacing'>
                <form className={`login-form mt-4 mb-4 ${item?.id} a${item?.already_attended}`}
                  onSubmit={handleSubmit(onSubmit)} >
                  <div className="col-lg-12">
                    <div className="widget-content searchable-container grid">
                      <div className="card-box">
                        <div className='row' >
                          <div className="col-xl-6 col-lg-8 col-md-8 company-detail-container mt-3">
                            <div className="d-flex flex-md-row flex-xl-row flex-lg-row flex-column align-items-start">
                              <div className='d-flex align-items-center'>
                                <img src={item?.thumbnail_url} alt="avatar" style={{ width: "150px" }} />
                              </div>
                              <div className="company-info px-3 mt-md-0 mt-xl-0 mt-lg-0 mt-3">
                                <p className="name mb-1">{item?.name}</p>
                                <p className="text-muted font-12 mb-1">
                                  <i className="las la-map-marker font-15">
                                    <MdLocationPin />
                                  </i> {item?.location}
                                </p>
                                <p className="text-muted font-12 mb-1 ">
                                  <i className="las la-map-marker font-15">
                                    <AiFillCalendar />
                                  </i> {item?.year}
                                </p>
                                <p className="text-muted font-12 mb-1 ">
                                  <i className="las la-map-marker font-15">
                                    <HiUsers />
                                  </i> No.of Licensee Attendees - {item?.no_of_attendee}
                                </p>
                                <div className="text-primary font-12 mb-2 d-block" style={{ width: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                  <p onClick={() => window.open(item?.website)} style={{ cursor: "pointer" }}>
                                    Visit Event Page
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-xl-6 col-lg-4 col-md-4 company-detail-container mt-3">
                            {
                              item?.is_passed === 1 ?
                                <div className="card-box">
                                  <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}>
                                    <AiOutlineInfoCircle />
                                  </div>
                                  <div className='al-sub text-center'>This event is live now, submission is closed.</div>
                                </div>
                                :
                                item.already_attended === 1 ?
                                  <div className="card-box">
                                    <div style={{ color: "#0570BE", fontSize: "20px", textAlign: "center" }}>
                                      <AiOutlineInfoCircle />
                                    </div>
                                    <div className='al-sub text-center'>
                                      {item?.is_team_member_exists === 1
                                        ? "If you cancel the registration for this event, it will be cancelled for all team members."
                                        : "You are already submitted"}
                                    </div>
                                    <div className='al-sub text-center'>
                                      <span style={{ color: "blue" }} className="btn btn-sm bg-gradient-primary text-white mt-2"
                                        onClick={handleShow}>
                                        Cancel
                                      </span>
                                    </div>
                                    <Modal show={show} onHide={handleClose}>
                                      <Modal.Header closeButton>
                                        <Modal.Title style={{ color: "#1B4D70" }}><TbAlertCircle /> Alert</Modal.Title>
                                      </Modal.Header>
                                      <Modal.Body>Do you Want to Cancel?</Modal.Body>
                                      <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                          No
                                        </Button>
                                        <Button variant="primary" onClick={() => cancelHandle(item.id)}>
                                          Yes
                                        </Button>
                                      </Modal.Footer>
                                    </Modal>
                                  </div>
                                  :
                                  <div className="form-group row">
                                    <div className="col-lg-12">
                                      <div className="form-group mb-2">
                                        <label className="col-form-label">Are you attending?
                                          <span style={{ color: "red" }}>*</span></label>
                                        <select className="form-control"
                                          {...register("attending", {
                                            required: "Attending should not be empty",
                                          })}
                                        >
                                          <option value={""}>-Select-</option>
                                          <option value={"1"}>Yes</option>
                                          <option value={"0"}>No</option>
                                        </select>
                                        {errors.attending &&
                                          <span className="error d-block">
                                            {errors.attending.message}
                                          </span>
                                        }
                                      </div>
                                    </div>
                                    <input type="hidden" className={`form-control ${item?.id}`}
                                      {...register("exhibition_id", {
                                        required: false,
                                      })}
                                      value={item?.id}
                                    />
                                    {attending === "1" &&
                                      <>
                                        <div className="col-lg-12 mt-3">
                                          <label>Arrival<span style={{ color: "red" }}>*</span></label>
                                          <Space direction="vertical">
                                            <DatePicker
                                              disabledDate={arivalDisabled}
                                              onChange={(date, datestr) => {
                                                if (date) {
                                                  setAD(new Date(moment(date.$d).format('YYYY-MM-DD')).getTime())
                                                } else {
                                                  setAD(currentDate)
                                                }
                                                setValue('arrival', datestr);
                                              }} className='datepicker' />
                                          </Space>
                                          <input style={{ display: "none" }}
                                            type="date" className="form-control"
                                            {...register("arrival", {
                                              required: "Arrival date should not be empty",
                                            })} />
                                          {errors.arrival &&
                                            <span className="error d-block">
                                              {errors.arrival.message}
                                            </span>
                                          }
                                        </div>
                                        <div className="col-lg-12 mt-3">
                                          <label>Departure<span style={{ color: "red" }}>*</span></label>
                                          <Space direction="vertical">
                                            <DatePicker
                                              disabledDate={deparDisabled}
                                              onChange={(date, datestr) => {
                                                setValue('departure', datestr);
                                              }} className='datepicker' />
                                          </Space>
                                          <input style={{ display: "none" }} type="date" className="form-control"
                                            {...register("departure", {
                                              required: "Departure date should not be empty",
                                            })} />
                                          {errors.departure &&
                                            <span className="error d-block">
                                              {errors.departure.message}
                                            </span>
                                          }
                                        </div>

                                        <div className="col-lg-12 mt-3">
                                          <div className="form-group">
                                            <label className="col-form-label">Add Team members</label>
                                            <Select
                                              styles={styles}
                                              closeMenuOnSelect={false}
                                              components={animatedComponents}
                                              isMulti
                                              options={MEM}
                                              onChange={(value) => handleOnChange(value)}
                                            />
                                          </div>
                                        </div>

                                        {person === "Others" &&
                                          <>
                                            <div className="col-lg-12">
                                              <label>Name </label>
                                              <input type="text" className="form-control"
                                                placeholder='Enter member Name'
                                                {...register("name", {
                                                  required: false
                                                })}
                                              />
                                            </div>
                                            <div className="col-lg-12  mt-3">
                                              <label>Email</label>
                                              <input type="email" className="form-control"
                                                placeholder='Enter member email Id'
                                                {...register("email", {
                                                  required: false
                                                })}
                                              />
                                            </div>
                                          </>
                                        }

                                        <div className="form-group mb-2  mt-3">
                                          <label className="col-form-label">Company Exhibiting?</label>
                                          <div className="col-lg-12">
                                            <select className="form-control"
                                              {...register("company_exhibiting", {
                                                required: "Company exhibiting should not be empty",
                                              })}>
                                              <option value={""}>-Select-</option>
                                              <option value={"1"}>Yes</option>
                                              <option value={"0"}>No</option>
                                            </select>
                                            {errors.company_exhibiting &&
                                              <span className="error d-block">
                                                {errors.company_exhibiting.message}
                                              </span>
                                            }
                                          </div>
                                        </div>
                                        {exhibiting === "1" &&
                                          <div className="col-lg-12">
                                            <label>Booth Number<span style={{ color: "red" }}>*</span></label>
                                            <input type="text" className="form-control"
                                              {...register("booth_number", {
                                                required: "Booth Number should not be empty",
                                              })} />
                                            {errors.booth_number &&
                                              <span className="error d-block">
                                                {errors.booth_number.message}
                                              </span>
                                            }
                                          </div>
                                        }
                                        <br />
                                        <br />
                                        <div className="widget-footer text-right">
                                          <br /><br />

                                          <button type="submit" className="btn readmorebtn text-white mr-2">
                                            Submit {isLoading && '...'}
                                          </button>
                                          <button type="reset" className="btn btn-outline-primary"
                                            onClick={RestForm}>Cancel</button>
                                        </div>
                                      </>
                                    }
                                  </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div >
            </>
          }
        </>
      {/* } */}
    </>
  )
}

export default Exhibition;