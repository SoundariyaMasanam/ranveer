import React, { useEffect, useRef } from 'react'
import "assets/css/MyAccount.css";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "redux/Actions/Member";

const ChangePassword = () => {
  const { isError } = useSelector(state => state.member);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const dispatch = useDispatch();
  const password = useRef({});
  password.current = watch("password", "");

  const onSubmit = async (fdata) => {
    const data = {
      old_password: fdata.old_password,
      new_password: fdata.password
    };
    dispatch(updatePassword(data));
  }

  return (
    <div className='col-12'>
      <div className='col-12 d-flex justify-content-center mt-3'>
        <h4>CHANGE YOUR<span style={{ color: "#bbce00" }}> PASSWORD</span>
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
                  <label>Current Password</label>
                </div>
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <input type="text" placeholder="Type here..."
                    className="keyword-input col-12"
                    {...register("old_password", {
                      required: 'Current password should not be empty',
                    })} />
                  {Object.keys(isError).length > 0
                    && typeof isError.error !== "undefined"
                    && <span className="col-12 error d-block d-flex justify-content-end">{isError.error}</span>
                  }
                  {errors.old_password &&
                    <span className="col-12 error d-block d-flex justify-content-end">
                      {errors.old_password.message}
                    </span>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 clearfix">
            <div className="single-query1">
              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <label>New Password</label>
                </div>
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <input type="text" placeholder="Type here..." className="keyword-input col-12"
                    {...register("password", {
                      required: "New Password should not be empty",
                      minLength: {
                        value: 6,
                        message: "Password must be of minimum 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password must be of maximum 20 characters",
                      }
                    })} />
                  {errors.password && <span className="col-12 error d-block d-flex justify-content-end">{errors.password.message}</span>}
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 clearfix">
            <div className="single-query1">
              <div className=" d-flex flex-md-row flex-column flex-xl-row flex-lg-row flex-sm-column single-query">
                <div className='col-12 col-xl-6 col-lg-6 col-sm-6 col-md-6'>
                  <label>Confirm Password</label>
                </div>
                <input type="text" placeholder="Type here..." className="keyword-input col-12"
                  {...register("cpassword", {
                    required: "Confirm password should not be empty",
                    validate: value => value === password.current || "The passwords do not match."
                  })} />
              {errors.cpassword && <span className="col-12 error d-block d-flex justify-content-end">{errors.cpassword.message}</span>}
              </div>
            </div>
          </div>
          <div className='col-12 d-flex justify-content-end mb-4 mt-3'>
            <button type="submit" className="text-white btn btn-sm readmorebtn mr-2">Save</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword