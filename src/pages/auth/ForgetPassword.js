import React, { useState, useEffect } from "react";
import flight from "assets/img/flight3.png"
import talalogo from "assets/img/translogo1.png"
import "assets/css/Login.css"
import log1 from "assets/img/sign8.png"
import { useForm } from "react-hook-form";
import { forgetPassword } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setInitialStateF } from "redux/Reducers/AuthenticationSlice";
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

const ForgetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isMessageF, errorF } = useSelector(state => state.authentication);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [disable, setDisable] = useState(false);
  const { isSuccess } = useSelector(state => state.authentication);
  const { isLoggedin } = useSelector(state => state.loggedin);
  useEffect(() => {
    if (isSuccess || isLoggedin) {
      navigate(`/dashboard`);
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isMessageF) {
      toast.success(`${isMessageF?.msg}`, {
        toastId: 'success',
        autoClose: 2000
      });
      setValue('email', '');
      setTimeout(() => {
        dispatch(setInitialStateF());
        setDisable(true);
        // navigate(`/reset-password/${isMessageF?.token}`);
      }, 1000);
    }
    if (errorF && Object.keys(errorF).length > 0
      && typeof errorF.message !== "undefined") {
      toast.error(`${errorF.message}`, {
        toastId: 'success',
        autoClose: 2000
      });
      dispatch(setInitialStateF());
      setDisable(false);
    }
  }, [isMessageF, errorF]);
  const onSubmit = (data) => {
    dispatch(forgetPassword(data))
    setDisable(true);
  }

  return (
    <div className="d-flex login login-with-news-feed">
      <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12 d-md-flex d-lg-flex d-xl-flex d-none news-feed">
        <div className="news-image">
          <img src={log1} className="img-fluid" />
        </div>
      </div>
      <div className="d-flex justify-content-center col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12 p-4" style={{ position: "absolute" }}>
        <div className="col-12 col-md-4 col-xl-4 col-lg-4 col-sm-12" style={{ backgroundColor: "#F7F7F7", }}>
          <div className='col-12 d-flex justify-content-center '>
            <img src={talalogo} className="img-fluid" style={{ marginTop: "4%", width: "150px" }} />
          </div>
          <div className="login-form-box checkout-page-style">
            <h3 className="mb-30 mt-4" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Forgot Password?</h3>
            <form className='login-form' onSubmit={handleSubmit(onSubmit)}>
              <div className="input-box mb-5 mt-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className='col-12'
                  {...register("email", {
                    onChange: (e) => { dispatch(setInitialStateF()); },
                    required: "Email should not be empty"
                  })}
                  readOnly={disable}
                />
                {errors.email && <span className="error d-block">{errors.email.message}</span>}
              </div>
              <div className='col-12 d-flex justify-content-center mb-4'>
                <button type="submit" className="col-12 col-md-8 col-xl-8 col-lg-8 col-sm-12 btn btn-sm bg-gradient-primary text-white">
                  Send Password Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgetPassword;
