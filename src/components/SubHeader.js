import React, { useRef, useEffect, useState } from 'react'
import "assets/css/Dashboard/Content.css"
import $ from "jquery"
import { useParams } from 'react-router-dom';
import { AiFillHome } from "react-icons/ai"
import { Link } from 'react-router-dom';

const SubHeader = ({ routeIndex }) => {
  $("#menu-toggle").click(function (e) {
    e.preventDefault();
    $("#sub-header-container").toggleClass("toggled");
  });

  const scrollRef = useRef(null);
  let { stype } = useParams();
  useEffect(() => {
    if (stype === 'readmore') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stype])
  useEffect(() => {
    if (stype === 'submit') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stype])
  useEffect(() => {
    if (stype === 'viewmore') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stype])

  return (
    <div className='sub-header-container mt-sm-5 mt-md-5'>
      <nav className="navbar navbar-expand-lg navbar-light d-flex flex-md-row ">
        <ul className="navbar-nav flex-row">
          <li>
            <div className="page-header">
              <nav className="breadcrumb-one" aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item active" aria-current="page">
                    {routeIndex === "1" &&
                      <span className='px-md-0 px-4'>Dashboard</span>
                    }
                    {routeIndex === "2" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Video Guide</h6>
                      </div>
                    }
                    {routeIndex === "3" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Company Profile</h6>
                      </div>
                    }
                    {routeIndex === "4" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Licensee Search</h6>
                      </div>
                    }
                    {routeIndex === "5" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Send or View Quote</h6>
                      </div>
                    }
                    {routeIndex === "6" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Meet Licensee</h6>
                      </div>
                    }
                    {routeIndex === "7" &&
                      <>
                        <div ref={scrollRef}></div>                       
                        <div className='d-flex flex-row'>
                          <Link to={`/dashboard`}>
                            <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                              <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                            </span> &nbsp;
                          </Link>
                          <h6 className="mt-1">&nbsp;/ Tala Spotlights</h6>
                        </div>
                      </>
                    }
                    {routeIndex === "8" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Announcements</h6>
                      </div>
                    }
                    {routeIndex === "9" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Documents</h6>
                      </div>
                    }
                    {routeIndex === "10" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Financial Protection</h6>
                      </div>
                    }
                    {routeIndex === "11" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Resolution Center</h6>
                      </div>
                    }

                    {routeIndex === "12" &&
                      <>
                        <div ref={scrollRef}></div>                       
                        <div className='d-flex flex-row'>
                          <Link to={`/dashboard`}>
                            <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                              <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                            </span> &nbsp;
                          </Link>
                          <h6 className="mt-1">&nbsp;/ Monthly Report</h6>
                        </div>
                      </>
                    }
                    {routeIndex === "13" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Spotlights Submission</h6>
                      </div>
                    }
                    {routeIndex === "14" &&
                      <>
                        <div ref={scrollRef}></div>                       
                        <div className='d-flex flex-row' >
                          <Link to={`/dashboard`}>
                            <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                              <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                            </span> &nbsp;
                          </Link>
                          <h6 className="mt-1">&nbsp;/ Annual Conference</h6>
                        </div>
                      </>
                    }
                    {routeIndex === "15" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Events & Exhibitions</h6>
                      </div>
                    }
                    {routeIndex === "16" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Licensee Expiry</h6>
                      </div>
                    }
                    {routeIndex === "17" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Hall of Shame</h6>
                      </div>
                    }
                    {routeIndex === "18" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Departed Licensee</h6>
                      </div>
                    }

                    {routeIndex === "19" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Spotlights / Details</h6>
                      </div>
                    }
                    {routeIndex === "20" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Announcement / Details</h6>
                      </div>
                    }
                    {routeIndex === "22" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Event Details</h6>
                      </div>
                    }
                    {routeIndex === "23" &&
                      <div className='d-flex flex-row'>
                        <Link to={`/dashboard`}>
                          <span className='px-md-0 px-4' style={{ cursor: "pointer" }}>
                            <AiFillHome style={{ fontSize: "20px", cursor: "pointer" }} />
                          </span> &nbsp;
                        </Link>
                        <h6 className="mt-1">&nbsp;/ Notifications </h6>
                      </div>
                    }
                  </li>
                </ol>
              </nav>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SubHeader

