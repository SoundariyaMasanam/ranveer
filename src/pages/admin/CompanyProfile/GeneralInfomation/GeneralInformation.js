import React, { useEffect, useState } from 'react'
import "assets/css/CompanyProfile/CompanyProfile.css"
import noImage from "assets/img/no-image.jpg";
import { BsCheck2 } from "react-icons/bs"
import { FaTwitter } from "react-icons/fa"
import { CiLinkedin } from "react-icons/ci"
import BoldHeading from 'components/BoldHeading/BoldHeading'
import { Link } from 'react-scroll'
import { useSelector } from 'react-redux';
import { Button, Tooltip } from 'antd';
import Form from 'react-bootstrap/Form';
import { BsInfoCircle } from "react-icons/bs"
import {HiOutlineLink} from "react-icons/hi"

const GeneralInformation = ({
  data, cid,
  branches,
  setBranchId,
  setCountry,
  branchId,
  country,
  cBranch
}) => {
  const { memberProfileData } = useSelector(state => state.member);
  const [address, setAddress] = useState(false);
  const content = (
    <div>
      <div>{data.address1}</div>
      <div>{data.address2}</div>
    </div>
  );
  useEffect(() => {
    if (branchId) {
      const address = branches.find(item => item.id === parseInt(branchId));
      setAddress(address);
    }
    else if (country) {
      if (typeof cBranch !== 'undefined'
        && Object.keys(cBranch).length > 0
        && Object.keys(cBranch.data).length > 0) {
        setAddress(cBranch?.data?.company_info);
      }
    } else {
      setAddress(false);
    }
  }, [branchId, country, cBranch]);

  const [lod, setLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoad(false);
    }, 200);
    if (typeof data?.country !== 'undefined'
      && data?.country.length === 1) {
      setCountry(data?.country[0]);
    }
    else {
      setCountry(data.main_country);
    }
  }, [])

  const validateUrl = (str) => {
    var tarea = str;
    if (tarea.indexOf("https://") == 0 || tarea.indexOf("https://") == 0) {
      window.open(str, '_blank');
    } else {
      window.open(`https://${str}`, '_blank');
    }
  }

  return (
    <>
      <div className="col-xl-4 col-lg-4 col-md-12 mb-4">
        <div className="profile-left">
          <div className="image-area mt-4">
            <img className="user-image" src={data.company_logo != '' ? data.company_logo : noImage} style={{width:"200px"}}/>
          </div>
          <div className="col-12 d-flex justify-content-center info-area" style={{ height: "40px", fontSize: "18px", fontWeight: "700" }}>
            {data.company_name}
          </div>
          <div className="button-list text-center" >
            <br />
            {cid === undefined ?
              <div>
                <Button disabled className='sendQuoteBtn'>
                  Send Quotes
                  <span className="btn-label-right">
                    <i className="las la-check">
                      <BsCheck2 />
                    </i>
                  </span>
                </Button>
              </div>
              :
              <Link to="ctaForQuote" smooth={true} duration={100}>
                <span type="button" className="btn btn-success">
                  Send Quotes
                  <span className="btn-label-right">
                    <i className="las la-check">
                      <BsCheck2 />
                    </i>
                  </span>
                </span>
              </Link>
            }
          </div>
          <br />
        </div>
      </div>
      <div className="col-xl-8 col-lg-8 col-md-12">
        <div className="profile-info">
          <div className='d-flex flex-row'>
            <div className="col-10 widget-header">
              <BoldHeading
                Boldheading="General Information"
              />
            </div>
            <div className='col-2 d-flex justify-content-end'>
              <div className='d-flex flex-row'>
                <div className={`status ${data.status === 'active' ? "green" : "red"}`}></div>
                <div>
                  <h6 style={{ textTransform: "capitalize", color: "#000" }}>
                    {data.status}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex flex-md-row flex-column mt-1">
            <div className="col-md-5 col-12 single-profile-info">
              <h6>Enrollment</h6>
              <p>{data.enrollment_date}</p>
            </div>
            <div className="col-md-7 col-12 single-profile-info">
              <h6>Expires</h6>
              <p>{data.expiry_date}</p>
            </div>
          </div>
          <div className="d-flex flex-md-row flex-column">
            <div className="col-md-5 col-12 single-profile-info cityaddress">
              <Tooltip placement="right" title={content}>
                <h6 className='col-3'>HQ<span style={{ color: "#0F79D4", marginLeft: "10px", fontSize: "15px" }} ><BsInfoCircle /></span> </h6>
              </Tooltip>
              <p>{data.headquarters}</p>
            </div>
            <div className="d-flex flex-md-row flex-column col-md-6 col-12 single-profile-info gap-2">
              <div className='col-md-6 col-12' style={{ fontSize: "15px" }} >
                <h6 >Country</h6>
                {typeof data?.country !== 'undefined'
                  && data?.country.length > 1
                  ?
                  <Form.Select aria-label="Default select example" size="sm" className='formGI'
                    onChange={(e) => { setCountry(e.target.value); setBranchId(false); }}
                    value={country}>
                    <option value="">Select country</option>
                    {typeof data.country !== 'undefined'
                      && data.country.length > 0
                      && data.country.map((item, index) => {
                        return (<option key={`sp${index}`} value={item} style={{fontSize:"12px"}}>{item}</option>);
                      })}
                  </Form.Select>
                  : typeof data?.country !== 'undefined'
                  && data?.country.length > 0 && <div style={{fontSize:"12px",color:"darkgrey"}}>{data?.country[0]}</div>
                }
              </div>
              {!lod && country &&
                <div className='col-md-6 col-12 mt-md-0 mt-3'>
                  <h6>Branch</h6>
                  {Object.keys(cBranch).length > 0
                    && Object.keys(cBranch.data).length
                    && typeof cBranch.data.branches !== 'undefined'
                    && cBranch.data.branches.length > 0
                    ?
                    <Form.Select aria-label="Default select example" size="sm"
                      onChange={(e) => setBranchId(e.target.value)}
                      value={branchId}>
                      <option value="">Select Branch</option>
                      {cBranch.data.branches.map((item, index) => {
                        return (<option value={item.id} key={`op${index}`}>{item.branch_name}</option>);
                      })}
                    </Form.Select>
                    : <div style={{ fontSize: "12px",color:"darkgrey",letterSpacing:"0px"}}>{"No Branches"}</div>}
              </div>  
              }
            </div>
          </div>
          <div className="d-flex flex-md-row flex-column">
            <div className="col-md-5 col-12 single-profile-info d-flex flex-column ">
              <h6 className='col-3 d-flex flex-row mt-md-0 mt-3'>Website<span style={{ color: "#0F79D4", marginLeft: "5px", fontSize: "15px" }} ><HiOutlineLink /></span> </h6>            
              <a onClick={() => validateUrl(data.website)} style={{ color: "darkgrey", cursor: "pointer",fontSize:"12px"}}
                className='websiteLink'>{data.website}</a>
              <div className="d-flex flex-row ">
                <div className="col-5 single-profile-info social">
                  <a href={memberProfileData?.data?.linkedin} target="_blank">
                    <i className="lab la-twitter text-info">
                      <CiLinkedin className='socialmedia' />
                    </i>
                  </a>
                  <a href={memberProfileData?.data?.twitter} target="_blank">
                    <i className="lab la-linkedin text-primary px-2">
                      <FaTwitter className='socialmedia' />
                    </i>
                  </a>
                </div>
              </div>
            </div>
            {/* <div className="col-7 single-profile-info"> */}
            {!lod && address &&
              <div className="col-7 single-profile-info">
                <h6>Address</h6>
                {address ? <p>{(address.address1 !== '' || address?.address2 !== '') ? `${address?.address1} ${address?.address2}` : `No Address Found`} </p> : <p>Select Branch</p>}
              </div>
            }
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default GeneralInformation