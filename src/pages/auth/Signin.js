import React, { useState, useEffect } from "react";
import flight from "assets/img/flight3.png"
import talalogo from "assets/img/translogo1.png"
// import log1 from "assets/img/log4.jpg"
import log1 from "assets/img/sign8.png"
import "assets/css/Login.css"
import { useForm } from "react-hook-form";
import { getLogin } from "redux/Actions/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { setIsLoggedin, setExteraRoute } from "redux/Reducers/LoggedSlice";
import { setInitialState } from "redux/Reducers/AuthenticationSlice";
import { Link, useNavigate } from "react-router-dom";
import { memberProfile } from "redux/Actions/Member";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isSuccess,
    error,
    userData } = useSelector(state => state.authentication);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { isLoggedin } = useSelector(state => state.loggedin);
  const [type, setType] = useState('password');
  const [icon, setIcon] = useState(eyeOff);
  const [ip, setIP] = useState('');
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    setIP(res.data.IPv4)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    dispatch(memberProfile());
    if (isSuccess || isLoggedin) {
      if (sub) {
        toast.success("Login Successfully!!! Welcome to TALA...", {
          toastId: 'success',
          autoClose: 2000
        });
        setSub(false);
      }
      setTimeout(() => {
        dispatch(setIsLoggedin(userData));
        dispatch(setExteraRoute('Dashboard'));
        navigate(`/dashboard`);
      }, 500);
    }
  }, [isSuccess]);

  const [sub, setSub] = useState(false);

  const onSubmit = (data) => {
    data.ip = ip;
    dispatch(getLogin(data));
    setSub(true);
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
  return (
    // <div className='slider-area bg-images'>
    //   <div className='wrapper d-flex'>
    //     <div className="container">
    //       <img src={talalogo} className="img-fluid" />
    //       <div className="row g-5">
    //         <div className="col-lg-6 order-2 order-lg-1">
    //           <div className="inner pt--100 pt_md--0 pt_sm--0">
    //             <div className="contents text-start">
    //               <div className='card logincard'>
    //                 <div className="login-form-box checkout-page-style">
    //                   <h3 className="mb-30" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Login</h3>
    //                   {error && <span className="error d-block">Email and password not match. Please try again</span>}
    //                   <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
    //                     <div className="input-box mb-4">
    //                       <input
    //                         type="text"
    //                         placeholder="Username or Email"
    //                         className='col-12'
    //                         {...register("email", {
    //                           onChange: (e) => { dispatch(setInitialState()); },
    //                           required: "Username or Email should not be empty",
    //                         })}
    //                       />
    //                       {errors.username && <span className="error d-block">{errors.username.message}</span>}
    //                     </div>
    //                     <div className="d-flex input-box mb-4">
    //                       <input
    //                         type={type}
    //                         placeholder="Password"
    //                         className="col-12"
    //                         name="password"
    //                         {...register("password", {
    //                           onChange: (e) => { dispatch(setInitialState()); },
    //                           required: "Password should not be empty",
    //                         })}
    //                       />
    //                       <span className="d-flex align-items-center" onClick={handleToggle} style={{ justifyContent: "right" }}>
    //                         <Icon className="d-flex mr-10" icon={icon} size={25}
    //                           style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
    //                         />
    //                       </span>
    //                       {errors.password && <span className="error d-block">{errors.password.message}</span>}
    //                     </div>
    //                     <div className="boxCheck">
    //                       <input id="one" type="checkbox" {...register("remember", {
    //                         required: false,
    //                       })} />
    //                       <span className="check"></span>
    //                       <label htmlFor="one" className='px-2'>Remember me</label>
    //                     </div>
    //                     <div className="col-12 d-flex justify-content-center">
    //                       <button type="submit" className="btn bg-gradient-primary text-white "> Login </button>
    //                     </div>
    //                     <div className="input-box forget col-12 d-flex justify-content-center mt-3">
    //                       <span className="lost-password" style={{ cursor: "pointer" }} >
    //                         <Link to="forgot-password"> Forgot Password?</Link>
    //                       </span>
    //                     </div>
    //                   </form>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         {/* <div className="col-lg-6 order-1 order-lg-2">
    //           <div className="banner-image col-6">
    //             <img src={flight} alt="Banner Images" className="img-fluid float-bob-y" />
    //           </div>
    //         </div> */}
    //       </div>
    //     </div>
    //   </div>
    //   <ToastContainer />
    // </div>


    // <div className="d-flex login login-with-news-feed">
    //   <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12 d-md-flex d-lg-flex d-xl-flex d-none news-feed">
    //     <div className="news-image">
    //       <img src={log1} className="img-fluid" style={{width:"100%",height:"100%"}}/>
    //     </div>
    //   </div>
    //   <div className="d-flex justify-content-center col-lg-12 col-md-12 col-sm-12 col-xl-12 col-12 p-4" style={{ position: "absolute" }}>
    //     <div className="card">
    //       <div className='col-12 d-flex justify-content-center '>
    //         <img src={talalogo} className="img-fluid" style={{ marginTop: "4%", width: "150px" }} />
    //       </div>
    //       <div className="login-form-box checkout-page-style">
    //         <h3 className="mb-30" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Login</h3>
    //         {error && <span className="error d-block">Email and password not match. Please try again</span>}
    //         <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
    //           <div className="input-box mb-4">
    //             <div className="d-flex">
    //               <input
    //                 type="text"
    //                 placeholder="Email"
    //                 className='col-12'
    //                 {...register("email", {
    //                   onChange: (e) => { dispatch(setInitialState()); },
    //                   required: "Email should not be empty",
    //                 })}
    //               />
    //             </div>
    //             <div>
    //               {errors.username && <span className="error d-block">{errors.username.message}</span>}
    //             </div>
    //           </div>
    //           <div className="d-flex flex-column input-box mb-4">
    //             <div className="d-flex">
    //               <input
    //                 type={type}
    //                 placeholder="Password"
    //                 className="col-12"
    //                 name="password"
    //                 {...register("password", {
    //                   onChange: (e) => { dispatch(setInitialState()); },
    //                   required: "Password should not be empty",
    //                 })}
    //               />
    //               <span className="d-flex align-items-center" onClick={handleToggle} style={{ justifyContent: "right" }}>
    //                 <Icon className="d-flex mr-10" icon={icon} size={25}
    //                   style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
    //                 />
    //               </span>
    //             </div>
    //             <div>
    //               {errors.password && <span className="error d-block">{errors.password.message}</span>}
    //             </div>
    //           </div>
    //           <div className="boxCheck">
    //             <input id="one" type="checkbox" {...register("remember", {
    //               required: false,
    //             })} />
    //             <span className="check"></span>
    //             <label htmlFor="one" className='px-2'>Remember me</label>
    //           </div>
    //           <div className="col-12 d-flex justify-content-center mt-4">
    //             <button type="submit" className="col-6 btn bg-gradient-primary text-white "> Login </button>
    //           </div>
    //           <div className="input-box forget col-12 d-flex justify-content-center mt-3">
    //             <span className="lost-password" style={{ cursor: "pointer" }} >
    //               <Link to="forgot-password"> Forgot Your Password?</Link>
    //             </span>
    //           </div>
    //         </form>
    //       </div>
    //     </div>
    //   </div >
    //   <ToastContainer />
    // </div >

    <section className="login-block">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="auth-box card">
              <div className="card-block login-form-box checkout-page-style">
                <div className='col-12 d-flex justify-content-center '>
                  <img src={talalogo} className="img-fluid" style={{ width: "150px" }} />
                </div>
                <h3 className="mb-30" style={{ fontSize: "20px", color: "#515365", fontWeight: "700" }}>Login</h3>
                {error && <span className="error d-block">Email and password not match. Please try again</span>}
                <form className="login-form mt-4" onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-box mb-4">
                    <div className="d-flex">
                      <input
                        type="text"
                        placeholder="Email"
                        className='col-12'
                        {...register("email", {
                          onChange: (e) => { dispatch(setInitialState()); },
                          required: "Email should not be empty",
                        })}
                      />
                    </div>
                    <div>
                      {errors.username && <span className="error d-block">{errors.username.message}</span>}
                    </div>
                  </div>
                  <div className="d-flex flex-column input-box mb-4">
                    <div className="d-flex">
                      <input
                        type={type}
                        placeholder="Password"
                        className="col-12"
                        name="password"
                        {...register("password", {
                          onChange: (e) => { dispatch(setInitialState()); },
                          required: "Password should not be empty",
                        })}
                      />
                      <span className="d-flex align-items-center" onClick={handleToggle} style={{ justifyContent: "right" }}>
                        <Icon className="d-flex mr-10" icon={icon} size={25}
                          style={{ position: "absolute", width: "3%", color: "#094D72", marginRight: "2%" }}
                        />
                      </span>
                    </div>
                    <div>
                      {errors.password && <span className="error d-block">{errors.password.message}</span>}
                    </div>
                  </div>
                  <div className="boxCheck">
                    <input id="one" type="checkbox" {...register("remember", {
                      required: false,
                    })} />
                    <span className="check"></span>
                    <label htmlFor="one" className='px-2'>Remember me</label>
                  </div>
                  <div className="col-12 d-flex justify-content-center mt-4">
                    <button type="submit" className="col-6 btn bg-gradient-primary text-white "> Login </button>
                  </div>
                  <div className="input-box forget col-12 d-flex justify-content-center mt-3">
                    <span className="lost-password" style={{ cursor: "pointer" }} >
                      <Link to="forgot-password"> Forgot Your Password?</Link>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Signin;
