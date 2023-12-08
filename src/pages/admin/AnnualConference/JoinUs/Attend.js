import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { interestToAttend } from "redux/Actions/AnnualConference"
import { companyList } from "redux/Actions/Company";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { getTeamMembers } from "redux/Actions/EventExhibition";
import { Button, Tooltip } from 'antd';


const animatedComponents = makeAnimated();

const Attend = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(companyList());
    dispatch(getTeamMembers());
  }, []);
  const { isLoadingS } = useSelector(state => state.annualconference);
  const { teamMember } = useSelector(state => state.exhibition);
  const { companyProfileData } = useSelector(state => state.company);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const [colleague, setColleague] = useState("");
  const { memberProfileData } = useSelector(state => state.member);
  const { conferenceBanner } = useSelector(state => state.annualconference);
  useEffect(() => {
    setValue('name', `${memberProfileData?.data?.first_name} ${memberProfileData?.data?.last_name}`)
    setValue('designation', memberProfileData?.data?.designation)
    setValue('email', memberProfileData?.data?.email)
    setValue('phone', memberProfileData?.data?.phone)
  }, [])


  const [MEM, setMEM] = useState([]);
  const [MEV, setMEV] = useState([]);
  const [MER, setMER] = useState(false);
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
    if (typeof oth !== 'undefined') { setColleague('Others'); } else { setColleague(''); }
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
  const onSubmit = async (data) => {
    if (MEV.length === 0) {
      setMER(true);
    } else {
      setMER(false);
      data.conference_id = conferenceBanner?.data?.id;
      data.colleague = MEV;
      dispatch(interestToAttend(data));
    }

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
        <div className='col-12 d-flex justify-content-center '>
          <span className="error d-block mt-5" style={{ fontSize: "18px" }}>
            Note: Registration is currently unavailable.
          </span>
        </div>
        <div className="form-group row pt-5">
          <div className="col-lg-6">
            <label className='mb-2'>Name</label>
            <input type="text" className="form-control"
              {...register("name", {
                required: "Name should not be empty",
              })} 
              disabled
              />
            {errors.name && <span className="error d-block">{errors.name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Designation</label>
            <input type="text" className="form-control"
              {...register("designation", {
                required: "Designation should not be empty",                
              })}
              disabled
              />
            {errors.designation && <span className="error d-block">{errors.designation.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Email Address</label>
            <input type="email" className="form-control"
              {...register("email", {
                required: "Email should not be empty",               
              })} 
              disabled
              />
            {errors.email && <span className="error d-block">{errors.email.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Phone Number</label>
            <input type="text" className="form-control"
              {...register("phone")} disabled/>
            {errors.phone && <span className="error d-block">{errors.phone.message}</span>}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-lg-6">
            <label className='mb-2'>Company Name</label>
            <input type="text" className="form-control"
              placeholder='XYZ Company'
              {...register("company_name", {
                required: "Company Name should not be empty",
              })}
              disabled
              value={companyProfileData?.data?.company_info?.company_name}
              readOnly />
            {errors.company_name && <span className="error d-block">{errors.company_name.message}</span>}
          </div>
          <div className="col-lg-6">
            <label className='mb-2'>Add Colleague  <span style={{ color: "red" }}> *</span></label>
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={MEM}
              onChange={(value) => handleOnChange(value)}
              isDisabled
            />
            {MER &&
              <span className="error d-block">
                Colleague should not be empty
              </span>
            }
          </div>
        </div>
        {colleague === "Others" &&
          <>
            <h5 className='mt-4'>Add New Colleague Details</h5>
            <div className="form-group row pt-2">
              <div className="col-lg-6">
                <label className='mb-2'>Name  <span style={{ color: "red" }}> *</span></label>
                <input type="text" className="form-control"
                  {...register("others.name", {
                    required: "Name should not be empty",
                  })} disabled/>
                {errors.others?.name && <span className="error d-block">{errors.others?.name?.message}</span>}
              </div>
              <div className="col-lg-6">
                <label className='mb-2'>Designation  <span style={{ color: "red" }}> *</span></label>
                <input type="text" className="form-control"
                  {...register("others.designation", {
                    required: "Designation should not be empty",
                  })} disabled />
                {errors.others?.designation &&
                  <span className="error d-block">{errors.others?.designation.message}</span>}
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-6">
                <label className='mb-2'>Email Address  <span style={{ color: "red" }}> *</span></label>
                <input type="email" className="form-control"
                  {...register("others.email", {
                    required: "Email should not be empty",
                  })} disabled/>
                {errors.others?.email &&
                  <span className="error d-block">{errors.others?.email?.message}</span>}
              </div>
              <div className="col-lg-6">
                <label className='mb-2'>Phone Number  <span style={{ color: "red" }}> *</span></label>
                <input type="number" className="form-control"
                  {...register("others.phone", {
                    required: "Phone number should not be empty",
                  })} disabled/>
                {errors.others?.phone &&
                  <span className="error d-block">{errors.others?.phone?.message}</span>}
              </div>
            </div>
          </>
        }
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

export default Attend