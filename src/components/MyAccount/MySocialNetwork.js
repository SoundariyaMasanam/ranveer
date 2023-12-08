import React, { useEffect } from 'react'
import "assets/css/MyAccount.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "redux/Actions/Member";
import { setNetwork } from "redux/Reducers/MemberSlice";

const MySocialNetwork = () => {

  const { memberProfileData, isUpdate } = useSelector(state => state.member);
  const { register, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Object.keys(memberProfileData).length > 0
      && Object.keys(memberProfileData.data).length > 0) {
      setValue('twitter', `${memberProfileData.data?.twitter}`);
      setValue('linkedin', `${memberProfileData.data?.linkedin}`);
    }
  }, [memberProfileData])


  const onSubmit = async (fdata) => {
    var formdata = new FormData();
    formdata.append("linkedin", fdata.linkedin);
    formdata.append("twitter", fdata.twitter);
    dispatch(updateProfile(formdata));
    dispatch(setNetwork(true));
  }

  return (
    <div className='col-12'>
      <div className='col-12 d-flex justify-content-center mt-3'>
        <h4>MY SOCIAL<span style={{ color: "#bbce00" }}> NETWORK</span>
        </h4>
      </div>

      <div className="row">
        <form className="login-form mt-4"
          onSubmit={handleSubmit(onSubmit)}
          style={{ paddingRight: "30%", marginTop: "30px", marginBottom: "30px" }}>
          <div className="col-md-12 clearfix">
            <div className="single-query1">
              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <label>LinkedIn</label>
                </div>
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <input type="text" placeholder="https://linkedin.com"
                    className="keyword-input col-12"
                    {...register("linkedin", {
                      required: false,
                    })} />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 clearfix">
            <div className="single-query1">
              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <label>Twitter</label>
                </div>
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <input type="text" placeholder="https://twitter.com"
                    className="keyword-input col-12"
                    {...register("twitter", {
                      required: false,
                    })} />
                </div>
              </div>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-end mb-4 mt-3'>
            <button type="submit" className="text-white btn btn-sm readmorebtn mr-2">Submit</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MySocialNetwork