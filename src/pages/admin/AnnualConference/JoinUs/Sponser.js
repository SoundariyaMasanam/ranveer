import React, { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { interestToSponser } from "redux/Actions/AnnualConference";
import { BsCheck2 } from "react-icons/bs"
import { Button, Tooltip } from 'antd';

const Sponser = ({ list }) => {
  const dispatch = useDispatch();
  const { isLoadingS } = useSelector(state => state.annualconference);
  const { companyProfileData } = useSelector(state => state.company);
  const { memberProfileData } = useSelector(state => state.member);
  const { conferenceBanner } = useSelector(state => state.annualconference);
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  useEffect(() => {
    setValue('name', `${memberProfileData?.data?.first_name} ${memberProfileData?.data?.last_name}`)
    setValue('designation', memberProfileData?.data?.designation);
    setValue('email', memberProfileData?.data?.email)
    setValue('phone', memberProfileData?.data?.phone)
  }, [])

  useEffect(() => {
    if (list?.sponser) {
      setValue('sponsers', list?.sponser);
    }
  }, [list?.sponser])

  const onSubmit = async (data) => {
    data.conference_id = conferenceBanner?.data?.id;
    dispatch(interestToSponser(data));
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} >
        {isLoadingS &&
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
        <div className='col-12 d-flex justify-content-center'>
          <span className="error d-block mt-5" style={{ fontSize: "18px" }}>
            Note: Registration is currently unavailable.
          </span>
        </div>
        <div className="form-group row pt-5">
          <div className="col-lg-6">
            <label className='mb-2'>Name</label>
            <input type="text" className="form-control"
            disabled
              {...register("name", {
                required: "Name should not be empty",
              })} />
            {errors.name && <span className="error d-block">{errors.name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Designation</label>
            <input type="text" className="form-control"
            disabled
              {...register("designation", {
                required: "Designation should not be empty",
              })} />
            {errors.designation && <span className="error d-block">{errors.designation.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Email Address</label>
            <input type="email" className="form-control"
            disabled
              {...register("email", {
                required: "Email should not be empty",
              })} />
            {errors.email && <span className="error d-block">{errors.email.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Phone Number</label>
            <input type="text" className="form-control"
            disabled
              {...register("phone", {
                required: "Phone number should not be empty",
              })} />
            {errors.phone && <span className="error d-block">{errors.phone.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Company Name</label>
            <input type="text" className="form-control"
              placeholder='XYZ Company'
              disabled
              {...register("company_name", {
                required: "Company Name should not be empty",
              })}
              value={companyProfileData?.data?.company_info?.company_name}
              readOnly />
            {errors.company_name && <span className="error d-block">{errors.company_name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Select Sponsors  <span style={{ color: "red" }}> *</span></label>
            <select className="form-control"
              {...register("sponsers", {
                required: "Sponsers should not be empty",
              })}
              disabled
            >
              <option value={""}>-Select-</option>
              {Object.keys(list?.sponsersList).length > 0 &&
                list.sponsersList.data.length > 0 &&
                list.sponsersList.data.map((item, index) => {
                  return (
                    <option key={`sp${index}`} value={item.category}>{item.category}</option>
                  )
                })}
            </select>
            {errors.sponsers && <span className="error d-block">{errors.sponsers.message}</span>}
          </div>
        </div>

        <div className="form-group row">
          <div className="widget-footer">
            <br /><br />
            {/* <button type="submit" className="btn readmorebtn text-white mr-2">
              Submit
            </button> */}
            <Button disabled className='sendQuoteBtn'>
              Submit             
            </Button>
          </div>
        </div>
      </form>    
    </>
  )
}

export default Sponser