import React, { useEffect, useState } from 'react'
import Cards from 'components/Cards/Cards'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import "assets/css/Spotlights/Spotlights.css"
import { RotatingLines } from 'react-loader-spinner';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import SpotlightListing from "components/Spotlight/SpotlightListing";
import {
  getSpotlightListing,
  getSpotlightAdd,
  getSpotlightCategoryListing
} from "redux/Actions/Spotlight";
import { setInitialState } from "redux/Reducers/SpotlightSlice";
import { ToastContainer, toast } from 'react-toastify';
import Select from 'react-select'
// import { LoadingOutlined } from '@ant-design/icons';

const TalaSpotlights = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  const dispatch = useDispatch();
  const {
    spotlightCatgoryListing,
    isLoading,
    isSuccess,
    error
  } = useSelector(state => state.spotlight);

  const [value, setValue] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const [isBlankImage, setIsBlankImage] = useState(false);
  // const [isBlankImageT, setIsBlankImageT] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [fileList, setFileList] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [file, setFile] = useState(false);

  useEffect(() => {
    dispatch(getSpotlightCategoryListing());
    if (Object.keys(error).length > 0) {
      dispatch(setInitialState());
    }
  }, [])

  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.message !== 'undefined') {
        toast.success(`${isSuccess.message}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      setTimeout(() => {
        dispatch(getSpotlightListing({ history: 1 }));
        dispatch(setInitialState());
        setFileList([]);
        setFile(false);
        setImagePreviewUrl('');
        reset();
        setValue(false);
      }, 2000);
    }
  }, [isSuccess]);


  const [idCategory, setIdCategory] = useState(false);
  const [idCatError, setidCatError] = useState(false);
  const onSubmit = async (fdata) => {
    if (!idCategory) {
      setidCatError(true);
      return false;
    } else {
      setidCatError(false);
    }
    // if (!file) {
    //   setIsBlankImageT(true);
    //   return false;
    // } else {
    //   setIsBlankImageT(false);
    // }

    if (fileList.length === 0) {
      setIsBlankImage(true);
      return false;
    } else {
      setIsBlankImage(false);
    }
    if (!value || value === '') {
      setIsBlank(true);
      return false;
    } else {
      setIsBlank(false);
    }

    let comments = fdata.comments;
    let title = fdata.title;

    var formdata = new FormData();
    formdata.append("title", title);
    formdata.append("post", '');
    formdata.append("id_category", idCategory);
    formdata.append("comments", comments);
    formdata.append("description", value);
    formdata.append("thumbnail", file);
    fileList.forEach((file) => {
      formdata.append('thumbnails[]', file.originFileObj);
    });
    dispatch(getSpotlightAdd(formdata));
  }

  
  // const imageUpload = (file) => {
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //       setIsBlankImageT(false);      
  //       setFile(file)
  //       setImagePreviewUrl(reader.result)
  //   }
  //   reader.readAsDataURL(file);
  // }
  // const uploadButton = (
  //   <div>
  //     <div
  //       style={{
  //         marginTop: 8,
  //       }}
  //     >
  //       <button type="button" className="ant-btn css-dev-only-do-not-override-htwhyh ant-btn-default"><span role="img" aria-label="upload" className="anticon anticon-upload"><svg viewBox="64 64 896 896" focusable="false" data-icon="upload" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M400 317.7h73.9V656c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V317.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 163a8 8 0 00-12.6 0l-112 141.7c-4.1 5.3-.4 13 6.3 13zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path></svg></span><span>Upload here</span></button>
  //     </div>
  //   </div>
  // );
  // const propsT = {
  //   multiple: false,
  //   onChange(file) {
  //     imageUpload(file.file)
  //   },
  //   beforeUpload: (file) => {
  //     return false;
  //   },
  // };

  const props = {
    multiple: true,
    onChange(file) {
      setIsBlankImage(false);
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

  const [optionList, setoptionList] = useState([]);
  useEffect(() => {
    let optionsArr = []
    if (Object.keys(spotlightCatgoryListing).length > 0
      && spotlightCatgoryListing.data.length > 0) {
      spotlightCatgoryListing.data.map((item) => {
        optionsArr.push({
          value: item.id,
          label: item.title
        });
      });
    }
    setoptionList(optionsArr);
  }, [spotlightCatgoryListing])

  const styles = {
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "5px",
        height: "0px",
      },
      "::-webkit-scrollbar-track": {
        background: "#f1f1f1"
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888"
      },
      "::-webkit-scrollbar-thumb:hover": {
        background: "#555"
      }
    })
  }

  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-lg-12 layout-spacing">
          <Cards
            heading="Spotlight Submission"
            Para={<>Share about your company's most recent updates you are proud of,
              accomplishments, and significant milestones by providing a concise description of
              these events including high-resolution images. <br />
              Given below are some of the announcements that can be shared on TALA social
              network platforms.
              <br />
              <ul>
                <li>Unique cargo handling</li>
                <li>Milestones achieved.</li>
                <li>Attending/Participating in MRO events</li>
                <li>Management updates/ Leadership team updates</li>
                <li>New Ventures</li>
              </ul>

              Your valuable news will be featured on TALA dashboard, LinkedIn page, email
              newsletter and other social media platforms to create brand among other TALA
              Network and global audience.
            </>}
          />
        </div>

        <form className="login-form" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {isLoading &&
            <div className="spin-loader-submission">
              <RotatingLines
                strokeColor="#bbce00"
                strokeWidth="5"
                animationDuration="0.75"
                width="70"
                visible={true}
              />
            </div>
          }
          <div className='col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12'>
            <div className='widget-content widget-content-area'>
              <div className='widget-header'>
                <div className="row">
                  <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                    <h4 className='annualTitles'>Spotlight Submission</h4><br />
                  </div>

                </div>
              </div>
              <div className="w-100">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label className='mb-2'>Title  <span style={{ color: "red" }}> *</span></label>
                    <input type="text" className="form-control"
                      placeholder='Title'
                      {...register("title", {
                        required: "Title should not be empty"
                      })} />
                    {Object.keys(error).length > 0 &&
                      Object.keys(error.error).length > 0 &&
                      error.error.title.length > 0 &&
                      <span className="error d-block">{error.error.title[0]}</span>
                    }
                    {errors.title && <span className="error d-block">{errors.title.message}</span>}
                  </div>
                  <div className="col-lg-6">
                    <label className='mb-2'>Category  <span style={{ color: "red" }}> *</span></label>
                    <Select
                      styles={styles}
                      options={optionList}
                      isSearchable={true}
                      onChange={(value) => {
                        setIdCategory(value.value);
                        setidCatError(false);
                      }}
                    />

                    {idCatError &&
                      <span className="error d-block">
                        Category should not be empty
                      </span>
                    }
                  </div>
                </div>
                <div className="form-group row">
                  {/* <div className="col-lg-6">
                    <label className='mb-2'> Thumbnail Image  <span style={{ color: "red" }}> *</span></label>
                    <br />
                    <Upload
                      {...propsT}
                      defaultFileList={[...fileList]}
                      listType="picture"
                      className="upload-list-inline"
                    // showUploadList={false}
                    >
                      <Button icon={<UploadOutlined />}>Upload here</Button>
                    </Upload>
                    {isBlankImageT && <span className="error d-block">Inage should not be empty</span>}
                  </div> */}
                  <div className="col-lg-12">
                    <label className='mb-2'>Upload a File  <span style={{ color: "red" }}> *</span></label>
                    <br />
                    <Upload {...props}
                      defaultFileList={[...fileList]}
                      listType="picture"
                      className="upload-list-inline"
                    >
                      <Button icon={<UploadOutlined />}>Upload here</Button>
                    </Upload>
                    {isBlankImage && <span className="error d-block">Inage should not be empty</span>}
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-12">
                    <div className="form-group row">
                      <label className='mb-2'>Description  <span style={{ color: "red" }}> *</span></label>
                      <div className="col-lg-12 col-sm-12">
                        <ReactQuill
                          theme="snow"
                          value={value}
                          onChange={(e) => {
                            setValue(e)
                          }}
                          placeholder='Type Your Description'
                        />
                        {isBlank && <span className="error d-block">Description should not be empty</span>}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label className='mb-2'>Additional Comments to Team</label>
                    <div className="input-group">
                      <textarea className="form-control" style={{ height: "4.75rem" }}
                        {...register("comments", {
                          required: false,
                        })}>
                      </textarea>
                    </div>
                  </div>
                </div>
              </div>
              <div className="widget-footer text-right">
                <button type="submit" className="btn readmorebtn text-white mr-2">Submit</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <ToastContainer />
      <div className='col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing'>
        <div className='widgetNoPad widget-table-one'>
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <h4 style={{ textAlign: "center", color: "white", backgroundColor: "#1b4d70", padding: "20px" }}>Submission History</h4><br />
          </div>
          <div className='widget-content' style={{ padding: "20px" }}>
            <div className="row">
              <SpotlightListing spot={"sub"} />
            </div>
          </div>
        </div>
      </div>
    </div >
  )
}

export default TalaSpotlights
