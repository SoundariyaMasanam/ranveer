import React from "react";
import Sidebar from "components/Sidebar";
import Navbar from "components/Navbar/Navbar";
import Header from "components/Header";
import SubHeader from "components/SubHeader";
import "assets/css/Dashboard/Dashboard.css"
import "assets/css/Dashboard/Content.css"
import "App.css"
import { AiFillHome } from "react-icons/ai"
import { BsFillCameraVideoFill } from "react-icons/bs"
import { TbMessageCircle2Filled } from "react-icons/tb"
import { HiDocumentText } from "react-icons/hi"
import { GiVideoConference } from "react-icons/gi"
import {
  FaBook,
  FaSearchPlus,
  FaUserTimes,
  FaDesktop,
  FaHandSpock,
  FaMicrophone,
  FaRegNewspaper,
  FaThumbsDown,
  FaUser,
  FaRegFilePdf,
  FaShareSquare,
  FaStar
} from "react-icons/fa";

const Adminlayout = ({ children, routeIndex }) => {
  const sidebarroutes = [
    {
      name: "Dashboard",
      img: <AiFillHome />,
      index: 0,
      visible: false,
      link: "dashboard",
      value1: "Dashboard"
    },
    {
      name: "Video Guide",
      img: <BsFillCameraVideoFill />,
      index: 1,
      visible: false,
      link: "videoguide",
      value2: "videoguide"
    },
    {
      name: "Company Profile",
      img: <FaBook />,
      index: 2,
      visible: false,
      link: "companyprofile",
      value1: "Company Profile"
    },
    {
      name: "Licensee Search",
      img: <FaSearchPlus />,
      index: 3,
      visible: false,
      link: "membersearch",
      value2: "Member Search"
    },
    {
      name: "Send/View Quote",
      img: <TbMessageCircle2Filled />,
      index: 4,
      visible: false,
      link: "sendviewquote",
      value1: "SendViewQuote"
    },
    {
      name: "Meet Licensee",
      img: <FaDesktop />,
      index: 5,
      visible: false,
      link: "meetmembers",
      value1: "Meet Members"
    },
    {
      name: "Tala Spotlight",
      img: <FaStar />,
      index: 6,
      visible: false,
      link: "talaspotlight",
      value2: "Tala Spotlight"
    },
    {
      name: "Announcements",
      img: <FaMicrophone />,
      index: 7,
      visible: false,
      link: "announcements",
      value1: "Announcements"
    },
    {
      name: "Documents",
      img: <HiDocumentText />,
      index: 8,
      visible: false,
      link: "documents",
      value2: "Documents"

    },
    // {
    //   name: "Financial Protection",
    //   img: <FaRegNewspaper />,
    //   index: 9,
    //   visible: false,
    //   link: "financialprotection",
    //   value1: "Financial Protection"
    // },
    {
      name: "Resolution Center",
      img: <FaRegNewspaper />,
      index: 10,
      visible: false,
      link: "resolutionCenter",
      value1: "Resolution Center"
    },
    {
      name: "Monthly Report",
      img: <FaRegFilePdf />,
      index: 11,
      visible: false,
      link: "monthlyreport",
      value2: "Monthly Report"
    },
    {
      name: "Spotlight Submission",
      img: <FaShareSquare />,
      index: 12,
      visible: false,
      link: "spotlightsubmission",
      value1: "Spotlight Submission"
    },
    {
      name: "Annual Conference",
      img: <GiVideoConference />,
      index: 13,
      visible: false,
      link: "annualconference",
      value2: "Annual Conference"
    },
    {
      name: "Events & Exhibitions",
      img: <FaBook />,
      index: 14,
      visible: false,
      link: "exhibitions",
      value1: "Exhibitions"
    },
    {
      name: "Licensee Expiry",
      img: <FaUserTimes />,
      index: 15,
      visible: false,
      link: "memberexpiry",
      value2: "Member Expiry"
    },
    // {
    //   name: "Hall of Shame",
    //   img: <FaThumbsDown />,
    //   index: 16,
    //   visible: false,
    //   link: "hallofshame",
    //   value2: "Hall of Shame"
    // },
    {
      name: "Departed Licensee",
      img: <FaUser />,
      index: 17,
      visible: false,
      link: "departedmembers",
      value1: "Departed Members"
    }
  ];
  
  return (
    <div className='main-container'>
      <div className="overlay"></div>
      <div className="search-overlay"></div>
      <div className="rightbar-overlay"></div>
      <div className="sidebar-wrapper sidebar-theme d-md-flex d-none">
        <nav id="sidebar" className="Sidemenu">
          <Navbar />
          <Sidebar 
          sidebarroutes={sidebarroutes} />
        </nav>
      </div>
      <div id='content' className='main-content'>
        <Header sidebarroutes={sidebarroutes} />
        <SubHeader
          routeIndex={routeIndex} />
        <div sidebarroutes={sidebarroutes}>{children}</div>
      </div>
    </div>
  );
};

export default Adminlayout;
