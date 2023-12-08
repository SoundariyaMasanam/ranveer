import React, { useEffect, useState } from 'react'
import "assets/css/QuoteForm/QuoteForm.css"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useForm } from "react-hook-form";
import { RotatingLines } from 'react-loader-spinner';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/SendQuoteSlice"
import { sendQuote, sendsQuotes } from "redux/Actions/SendQuote";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import { GiCancel } from "react-icons/gi"

const QuoteForm = ({ placeholder, autoFill, setRemoveId }) => {
  const dispatch = useDispatch();
  const [value, setValueM] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { isSuccessS, isLoadingS } = useSelector(state => state.sendquote);
  const { memberProfileData } = useSelector(state => state.member);
  const [OMEV, setOMEV] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    let ids = '';
    if (autoFill.length > 0) {
      autoFill.map((item, index) => {
        ids += `${item.id}${autoFill.length !== index + 1 ? ',' : ''}`;
      })
    }
    setOMEV(ids)
  }, [autoFill])

  useEffect(() => {
    if (isSuccessS) {
      if (Object.keys(isSuccessS).length > 0
        && typeof isSuccessS.msg !== 'undefined') {
        toast.success(`${isSuccessS.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      setTimeout(() => {
        setFileList([]);
        reset();
        dispatch(setInitialState(false));
        setValueM(false);
        dispatch(sendsQuotes());
      }, 1000);
    }
  }, [isSuccessS])
  const onSubmit = async (fdata) => {
    if (!value || value === '') {
      setIsBlank(true);
      return false;
    } else {
      setIsBlank(false);
    }
    let from = fdata.from;
    let cc = fdata.cc;
    let subject = fdata.subject;
    var formdata = new FormData();
    formdata.append("from", from);
    formdata.append("cc", cc);
    formdata.append("to", OMEV);
    formdata.append("subject", subject);
    formdata.append("message", value);
    if (fileList.length > 0) {
      fileList.forEach((file) => {
        formdata.append('attachments[]', file.originFileObj);
      });
    }
    dispatch(sendQuote(formdata));

  }

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
      return false;
    },
    fileList,
  };

  const handleRemove = (index) => {
    setRemoveId(index);
  }
  return (
    <>
      <form className="login-form mt-4"
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data">
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
        <div className="w-100">
          <div className="form-group row">
            <div className="col-lg-6">
              <label className='mb-2'>From:</label>
              <input type="email" className="form-control" readOnly
                placeholder="From"
                defaultValue={Object.keys(memberProfileData).length > 0
                  && Object.keys(memberProfileData.data).length > 0
                  && memberProfileData.data.email}
                {...register("from", {
                  required: "From email should not be empty",
                })} />
              {errors.from && <span className="error d-block">{errors.from.message}</span>}
            </div>
            <div className="col-lg-6">
              <label className='mb-2'>Cc:</label>
              <input type="email" className="form-control"
                placeholder='Type email Id here'
                {...register("cc", {
                  required: false,
                })}
              />
            </div>
          </div>
          <div className="form-group row">
            <div className="col-lg-6">
              <label className='mb-2'>To:
              <span style={{ color: "red" }}> *</span>
              </label>
              {autoFill.length > 0 ?
                <div className='card'>
                  {
                    autoFill.map((item, index) => {
                      return (
                        <div key={`xs${index}`} className="p-1 px-2">
                          {item.email} &nbsp;
                          <GiCancel style={{cursor:"pointer",color:"094D72"}} onClick={() => handleRemove(item.key)} />
                        </div>
                      );
                    })
                  }
                </div> :
                <>
                  <input type="text" className="form-control"
                    placeholder="Select Licensee from Above Search Results"
                    readOnly
                    {...register("to", {
                      required: "To email should not be empty",
                    })}
                  />
                  {errors.to && <span className="error d-block">{errors.to.message}</span>}
                </>
              }

            </div>
            <div className="col-lg-6">
              <label className='mb-2'>Subject:</label>
              <input type="text" 
              readOnly
              className="form-control" placeholder={'Subject'} defaultValue={placeholder}
                {...register("subject", {
                  required: "Subject should not be empty",
                })} />
              {errors.subject && <span className="error d-block">{errors.subject.message}</span>}
            </div>
            <div className="col-lg-12">
              <br /><br />
              <div className="">
                <div className="form-group row">
                  <label className='mb-2'>Message</label>
                  <div className="col-lg-12 col-sm-12">
                    <ReactQuill
                      theme="snow"
                      value={value}
                      onChange={(e) => {
                        setValueM(e)
                      }}
                      placeholder='Type Your Message'
                    />
                    {isBlank && <span className="error d-block">Message should not be empty</span>}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12 col-12">
              <label className='mb-2'>Upload File</label>
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
        </div>
        <div className="widget-footer text-right">
          <button type="submit" className="btn readmorebtn text-white mr-2">Submit</button>
        </div>
      </form>
      <ToastContainer />
    </>
  )
}

export default QuoteForm