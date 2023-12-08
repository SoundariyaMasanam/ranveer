import React, { useEffect, useState } from 'react'
import Cards from 'components/Cards/Cards'
import "assets/css/ResolutionCenter/ResolutionCenter.css"
import ResolutionTable from './ResolutionTable/ResolutionTable';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { addResolutionCentre, getResolutionCentre } from "redux/Actions/ResolutionCenter";
import { setInitialState } from "redux/Reducers/ResolutionCenterSlice";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";
import moment from 'moment';
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import styles from "components/ScrollStyle"

const ResolutionCenter = () => {
  const para = <>Our Resolution Centre is a dedicated platform to facilitate communication and work
    towards the fair resolution of licensee disagreements and disputes. We also resolve
    unpaid invoice disputes with other members. You can initiate a claim through this
    centre if you have outstanding invoices from another TALA Licensee. <br />
    We carefully review the evidence provided by both parties and aim to reach an
    agreement that addresses the unpaid amount. Our goal is to support you in resolving
    due invoice issues professionally and fairly, ensuring trust and confidence within the
    TALA community. <br />
    We are currently developing financial protection services designed to safeguard the
    interests of licensees of the TALA network. This shall be available to all our
    licensees soon.
  </>
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getResolutionCentre({}));
    window.scrollTo(0, 0);
  }, [])

  const { companyListData } = useSelector(state => state.company);
  const { memberProfileData } = useSelector(state => state.member);
  // console.log('memberProfileData',memberProfileData);
  const [currencyData, setCurrencyData] = useState(false);
  const [currencyError, setCurrencyError] = useState(false);
  const { isLoading,
    tokenExp,
    isSuccess,
    resolutionCentreList } = useSelector(state => state.resolutioncenter);
  const [SC, setSC] = useState(false);
  useEffect(() => {
    if (SC || SC === '') {
      dispatch(getResolutionCentre({ status: SC }));
    }
  }, [SC])
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp]);
  const { companyProfileData } = useSelector(state => state.company);
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.msg !== 'undefined') {
        toast.success(`${isSuccess.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      setTimeout(() => {
        setFileList([]);
        reset();
        dispatch(setInitialState());
        dispatch(getResolutionCentre({}));
      }, 2000);
    }
  }, [isSuccess])

  const [MER, setMER] = useState(false);
  const [IAV, setIAV] = useState(false);
  const [optionList, setoptionList] = useState([]);

  useEffect(() => {
    let optionsArr = [];
    const logged_campany = memberProfileData?.data?.company_id;
    if (Object.keys(companyListData)?.length > 0
      && Object.keys(companyListData?.data)?.length > 0) {
      companyListData?.data?.map((item) => {
        if (logged_campany !== item?.id) {
          optionsArr?.push({
            value: item?.id,
            label: item?.company_name
          });
        }
      });
    }
    setoptionList(optionsArr);
  }, [companyListData])

  const onSubmit = (fdata) => {
    if (!IAV) {
      setMER(true);
      return false;
    } else {
      setMER(false);
    }
    if (!currencyData) {
      setCurrencyError(true)
      return false;
    } else {
      setCurrencyError(false)
    }


    var formdata = new FormData();
    if (Object.keys(companyProfileData).length > 0
      && Object.keys(companyProfileData.data).length > 0
      && Object.keys(companyProfileData.data.company_info).length > 0) {
      formdata.append("company_id", companyProfileData?.data?.company_info.id);
    }

    formdata.append("member_id", fdata.member_id);
    formdata.append("invoice_number", fdata.invoice_number);
    formdata.append("invoice_amount", fdata.invoice_amount);
    formdata.append("issue_against", IAV);
    formdata.append("issue_date", fdata.issue_date);
    formdata.append("due_date", fdata.due_date);
    formdata.append("comments", fdata.comments);
    if (currencyData === 'Others') {
      formdata.append("currency", fdata.other_curency);
    } else {
      formdata.append("currency", currencyData);
    }
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formdata.append('files[]', file.originFileObj);
      });
      // formdata.append("file", imageFile);
    }
    dispatch(addResolutionCentre(formdata));
  }
  const currentDate = moment(new Date()).format('YYYY-MM-DD');
  const attending = watch("issue_date", currentDate);

  const props = {
    multiple: true,
    onChange(file) {
      setFileList([...file.fileList]);
    },
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      // setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };


  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-lg-12 layout-spacing">
          <Cards
            heading="Resolution Center"
            Para={para}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="col-lg-12">
            <div className="statbox widget box box-shadow mb-4">
              <h4 className='annualTitles'>Enter Invoice</h4>
              <br />
              {isLoading &&
                <div className="spin-loader">
                  <RotatingLines
                    strokeColor="#bbce00"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="70"
                    visible={true}
                  />
                </div>
              }
              <br />
              <div className="">
                <div className="w-100">
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <label>Company Name</label>
                      <input type="text" className="form-control" readOnly
                        placeholder="Company Name"
                        defaultValue={Object.keys(companyProfileData).length > 0
                          && Object.keys(companyProfileData.data).length > 0
                          && Object.keys(companyProfileData.data.company_info).length > 0
                          && companyProfileData.data.company_info.company_name
                        }
                        {...register("company_id", {
                          required: 'Company name should not be empty'
                        })} />
                      {errors.company_id &&
                        <span className="error d-block">
                          {errors.company_id.message}
                        </span>
                      }
                    </div>
                    <div className="col-lg-6">
                      <label>Email Address</label>
                      <input type="email" className="form-control" readOnly
                        placeholder="From"
                        defaultValue={Object.keys(memberProfileData).length > 0
                          && Object.keys(memberProfileData.data).length > 0
                          && memberProfileData.data.email}
                        {...register("member_id", {
                          required: 'Company email should not be empty'
                        })} />
                      {errors.member_id &&
                        <span className="error d-block">
                          {errors.member_id.message}
                        </span>}
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <label>Issue Against</label>
                      <Select
                        styles={styles}
                        options={optionList}
                        isSearchable={true}
                        onChange={(value) => {
                          setIAV(value.value);
                          setMER(false);
                        }}
                      />
                      {MER &&
                        <span className="error d-block">
                          Issue Against should not be empty
                        </span>
                      }
                    </div>
                    <div className="col-lg-6">
                      <label>Invoice Number  <span style={{ color: "red" }}> *</span></label>
                      <input type="text" className="form-control"
                        {...register("invoice_number", {
                          required: "Invoice number should not be empty",
                        })} />
                      {errors.invoice_number &&
                        <span className="error d-block">
                          {errors.invoice_number.message}
                        </span>
                      }
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-6">
                      <label>Invoice Amount  <span style={{ color: "red" }}> *</span></label>
                      <input type="number" className="form-control invoiceAmount"
                        {...register("invoice_amount", {
                          required: "Invoice amount should not be empty",
                        })} />
                      {errors.invoice_amount &&
                        <span className="error d-block">
                          {errors.invoice_amount.message}
                        </span>
                      }
                    </div>
                    <div className="col-lg-6">
                      <label>Currency</label>
                      <Select
                        styles={styles}
                        options={[
                          { label: "GBP", value: "GBP" },
                          { label: "EUR", value: "EUR" },
                          { label: "USD", value: "USD" },
                          { label: "HKD", value: "HKD" },
                          { label: "CNY", value: "CNY" },
                          { label: "AUD", value: "AUD" },
                          { label: "SGD", value: "SGD" },
                          { label: "AED", value: "AED" },
                          { label: "Others", value: "Others" },
                        ]}
                        isSearchable={true}
                        onChange={(value) => {
                          setCurrencyData(value.value);
                          setCurrencyError(false);
                        }}
                      />
                      {currencyError &&
                        <span className="error d-block">
                          Currency should not be empty
                        </span>
                      }
                    </div>
                  </div>
                  {currencyData === "Others" &&
                    <div className="form-group row">
                      <div className="col-lg-6">
                        <label>Enter a Currency</label>
                        <input type="text" className="form-control"
                          {...register("other_curency", {
                            minLength: {
                              value: 3,
                              message: "Currency must be 3 characters",
                            },
                            pattern: {
                              value: /[A-Za-z]{3}/,
                              message: "Currency must be a characters",
                            },
                            maxLength: {
                              value: 3,
                              message: "Currency must be 3 characters",
                            },
                            required: "Currency should not be empty",
                          })}
                        />
                        {errors.other_curency &&
                          <span className="error d-block">
                            {errors.other_curency.message}
                          </span>
                        }
                      </div>
                    </div>
                  }
                  <div className="form-group row">
                  <div className="col-lg-6">
                      <label>Invoice Issue Date  <span style={{ color: "red" }}> *</span></label>
                      <input type="date" className="form-control"
                        max={currentDate}
                        {...register("issue_date", {
                          required: "Issue date should not be empty",
                        })} />
                      {errors.issue_date &&
                        <span className="error d-block">
                          {errors.issue_date.message}
                        </span>
                      }
                    </div>
                    <div className="col-lg-6">
                      <label>Invoice Due Date  <span style={{ color: "red" }}> *</span></label>
                      <input type="date" className="form-control"
                        min={attending !== '' ? attending : currentDate}
                        {...register("due_date", {
                          required: "Due date should not be empty",
                        })} />
                      {errors.due_date &&
                        <span className="error d-block">
                          {errors.due_date.message}
                        </span>
                      }
                    </div>
                   
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-12">
                      <label className='mb-2'>Upload a File</label>
                      <br />
                      <Upload
                        {...props}
                        defaultFileList={[...fileList]}
                        listType="picture"
                        className="upload-list-inline"
                      >
                        <Button icon={<UploadOutlined />}>Upload here</Button>
                      </Upload>
                    </div>
                  </div>
                  <div className="form-group row">
                    <div className="col-lg-12">
                      <label>Comments  <span style={{ color: "red" }}> *</span></label>
                      <div className="input-group">
                        <textarea className="form-control"
                          {...register("comments", {
                            required: "Comments should not be empty",
                          })} style={{ height: "4.75rem" }}>
                        </textarea>
                      </div>
                      {errors.comments &&
                        <span className="error d-block">
                          {errors.comments.message}
                        </span>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget-footer text-right">
                <button type="submit" className="btn readmorebtn text-white mr-2">Submit</button>
                <button type="reset" className="btn btn-outline-primary" onClick={() => reset()}>Cancel</button>
              </div>
            </div>
          </div>
        </form>
        <ResolutionTable
          setSC={setSC}
          data={resolutionCentreList}
        />
      </div>
      <ToastContainer />
    </div >
  )
}

export default ResolutionCenter