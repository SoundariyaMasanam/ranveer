import React, { useState, useRef, useEffect } from "react";
import log1 from "assets/img/sign8.png"
import talalogo from "assets/img/translogo1.png"
import "assets/css/Login.css"
import { useForm } from "react-hook-form";
import { resetPassword } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setInitialState } from "redux/Reducers/AuthenticationSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'
import { setLogout } from "redux/Reducers/LoggedSlice";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { token } = useParams();
  const { isSuccess, isMessage } = useSelector(state => state.authentication);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { isLoggedin } = useSelector(state => state.loggedin);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [type1, setType1] = useState('password');
  const [icon1, setIcon1] = useState(eyeOff);


  useEffect(() => {
    dispatch(setLogout());
  }, [])

  useEffect(() => {
    if (isSuccess || isLoggedin) {
      navigate(`/dashboard`);
    }
  }, [isSuccess])

  useEffect(() => {
    if (isMessage) {
      dispatch(setInitialState());
      toast.success(`${isMessage.msg}`, {
        toastId: 'success',
        autoClose: 2000
      });
      setTimeout(() => {
        navigate(`/`);
      }, 2000)
    }
  }, [isMessage])

  const onSubmit = (data) => {
    data.token = token;
    dispatch(resetPassword(data));
  
  }

  const handleToggle = () => {
    if (type === 'password') {
      setIcon(eye);
      setType('text')
    } else {
      setIcon(eyeOff)
      setType('password')
    }
  }
  const handleToggle1 = () => {
    if (type1 === 'password') {
      setIcon1(eye);
      setType1('text')
    } else {
      setIcon1(eyeOff)
      setType1('password')
    }
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
            <h3 className="mb-30" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Reset Password</h3>
            <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="d-flex input-box mb-4">
                <input
                  type={type}
                  name="password"
                  placeholder="New Password"
                  className="col-12"
                  {...register("password", {
                    required: "Password should not be empty",
                  })}
                />
                <span className="d-flex align-items-center" onClick={handleToggle} style={{ justifyContent: "right" }}>
                  <Icon className="d-flex mr-10" icon={icon} size={25}
                    style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
                  />
                </span>
                {errors.password && <span className="error d-block">{errors.password.message}</span>}
              </div>

              <div className="d-flex input-box mb-4">
                <input
                  type={type1}
                  name="password"
                  placeholder="Confirm Password"
                  className='col-12'
                  {...register("password_confirmation", {
                    required: "Confirm password should not be empty",
                    validate: value => value === password.current || "The passwords do not match."
                  })}
                />
                <span className="d-flex align-items-center" onClick={handleToggle1} style={{ justifyContent: "right" }}>
                  <Icon className="d-flex mr-10" icon={icon1} size={25}
                    style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
                  />
                </span>
                {errors.password_confirmation && <span className="error d-block">{errors.password_confirmation.message}</span>}
              </div>
              <div className='col-12 d-flex justify-content-center'>
                <button type="submit" className="col-12 col-md-6 col-xl-6 col-lg-6 col-sm-12 btn btn-sm bg-gradient-primary text-white">
                  Update Password
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

export default ResetPassword;
