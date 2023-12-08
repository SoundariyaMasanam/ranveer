// import React, { useState } from 'react'
// import { Modal } from 'antd';
// import "assets/css/Forgetmain.css";
// import { setInitialState } from "redux/Reducers/AuthenticationSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { forgetPassword } from "redux/Actions/Authentication";
// import { RotatingLines } from 'react-loader-spinner';
// import { useEffect } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ForgetModel = ({ isModalOpen, handleModel, title, subTitle }) => {

//   const dispatch = useDispatch();  
//   const { isLoadingF, errorF, isMessage } = useSelector(state => state.authentication);
//   const [emailValue,setEmailValue] = useState('');
//   const [validation,setValidation] = useState(false);
//   const [msg,setMsg] = useState(false);

//   function isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   }
//   const onSubmit = () => {
//     if(emailValue === '') {
//       setValidation(true);
//       return false;
//     }
//     if (!isValidEmail(emailValue)) {
//       setMsg('Email should be a proper format.');
//       return false;
//     }
//     setMsg(false);
//     setValidation(false);
//     let data = { email : emailValue}
//     dispatch(forgetPassword(data));
//   }

//   return (
//     <div>
//       <Modal title={title} open={isModalOpen} footer={[]} onCancel={() => handleModel()}>
//         <p style={{ color: "#2a40af", fontWeight: "600" }}>{subTitle}</p>
//         <div className="forget-form-box forget-page-style">
//           {isLoadingF &&
//             <div className="spin-loader-2">
//               {/* <InfinitySpin width='200' color="#bbce00" /> */}
//               <RotatingLines
//               strokeColor="#bbce00"
//               strokeWidth="5"
//               animationDuration="0.75"
//               width="70"
//               visible={true}
//             />
//             </div>
//           }
//           <form className='login-form'>
//           {isMessage && <span className="success d-block"> 
//              { toast.success('A verification code has been sent Successfully ')}</span>}
//             <div className="input-box mb-4 mt-4">              
//               <input
//                 type="email"
//                 placeholder="Email Address"
//                 className='col-12'
//                 onChange = { (e) => { setEmailValue(e.target.value); dispatch(setInitialState()); }}
//                 value={emailValue}
//                 disabled={isMessage ? true : false }
//               />
//               { msg && <span className="error d-block"> {msg} </span>}
//               {errorF && <span className="error d-block"> {toast.error("User not found. ")} </span>}
//               {validation && <span className="error d-block">Email should not be empty.</span>}
//             </div>
//             <div className='col-12 d-flex justify-content-center'>
//               <button className="rn-btn edu-btn1 " type="button" onClick={()=>onSubmit()} disabled={isMessage ? true : false }> Send Code </button>
//             </div>
//           </form>
//         </div>
//       </Modal>
//       <ToastContainer />
//     </div>
//   )
// }

// export default ForgetModel


import React from 'react'
import { Modal } from 'antd';
import "../../../../assets/css/Forgetmain.css"
import { toast, ToastContainer } from "react-toastify"
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const ForgetModel = ({ isModalOpen, setIsModalOpen, handleCancel, title, subTitle }) => {
  let navigate = useNavigate();
  const [inputShow, setInputShow] = useState(true)
  const [inputPasswordShow, setInputPasswordShow] = useState(false)
  const [value, setValue] = useState("");
  const [value1, setValue1] = useState("");
  const onInput = (e) => setValue(e.target.value);
  const onInput1 = (e) => setValue1(e.target.value);
  const handleSubmit = (e) => {
    toast.success("A verification code has been sent Successfully")
    setInputShow(false)
    setValue("");
  }
  const handleSubmitCode = () => {
    toast.success("OTP Verified Successfully")
    setInputPasswordShow(true)
    setValue("");

  }
  const handlepasswordCode = () => {
    toast.success("Password Changed Successfully")
    setIsModalOpen(false)
  }
  return (
    <div>
      <Modal title={title} open={isModalOpen} footer={[]} onCancel={handleCancel}>       
        <div className="forget-form-box forget-page-style">
          <form className='login-form'>
            {inputShow === true ?
              <>
               <p style={{ color: "#1B4D70", fontWeight: "700" }}>{subTitle}</p>
                <div className="input-box mb-4 mt-4">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className='col-12'
                    required
                    name="email"
                    value={value}
                    onInput={onInput}
                  />
                </div>
                <div className='col-12 d-flex justify-content-center'>
                  <button className="btn btn-sm bg-gradient-primary text-white " type="button" onClick={handleSubmit}>
                    Send Code
                  </button>
                </div>
              </>
              :
              <>
                {inputPasswordShow === false ?
                  <>
                   <p style={{ color: "#1B4D70", fontWeight: "700" }}>Enter Your Security code</p>
                    <div className="input-box mb-4 mt-4">
                      <input
                        type="code"
                        placeholder="Security Code"
                        className='col-12'
                        required
                        name="code"
                        value={value}
                        onInput={onInput}
                      />
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                      <button className="btn btn-sm bg-gradient-primary text-white " type="submit" onClick={handleSubmitCode}>
                        Submit
                      </button>
                    </div>
                  </>
                  :
                  <>
                    <div className="input-box mb-4 mt-4">
                      <input
                        type="password"
                        placeholder="New Password"
                        className='col-12'
                        required
                        name="password"
                        value={value1}
                        onInput={onInput1}
                      />
                    </div>
                    <div className="input-box mb-4">
                      <input
                        type="password"
                        placeholder="Confirm Password"
                        className='col-12'
                        required
                        name="Confirmpassword"
                        value={value}
                        onInput={onInput}
                      />
                    </div>
                    <div className='col-12 d-flex justify-content-center'>
                      <button className="btn btn-sm bg-gradient-primary text-white " type="button" onClick={handlepasswordCode}>
                        Submit
                      </button>
                    </div>
                  </>
                }
              </>
            }
          </form>
        </div>
        <ToastContainer />
      </Modal>
    </div>
  )
}

export default ForgetModel