import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Offcanvas from 'react-bootstrap/Offcanvas';
import "assets/css/Dashboard/Content.css"
import { setExteraRoute } from "redux/Reducers/LoggedSlice";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useDispatch, useSelector } from "react-redux";
import { companyProfile } from "redux/Actions/Company";
import profile1 from "assets/img/noimg.jpg"
import "assets/css/Dashboard/Dashboard.css"
import NotificationContent from "./NotificationContent/NotificationContent";
import MyAccount from "./MyAccount/MyAccount";
import {
  actionPerform,
  getNotificationsLeftMenu
} from "redux/Actions/Notifications";
import { setInitialListParms } from "redux/Reducers/CompanySlice";
import { setForSearch } from 'redux/Reducers/MemberSlice';
import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai"
import logo from "assets/img/logoMobile.png"
import { Tooltip } from 'antd';

const Header = ({ sidebarroutes }) => {
  const dispatch = useDispatch();
  const { memberProfileData } = useSelector(state => state.member);
  const { exteraRoute } = useSelector(state => state.loggedin);
  const [fname, setFname] = useState(false);
  const [lname, setLname] = useState(false);
  const [profile, setProfile] = useState('');
  const [show, setShow] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      dispatch(getNotificationsLeftMenu());
    }, 30000);
  }, []);

  useEffect(() => {
    if (Object.keys(memberProfileData).length > 0
      && Object.keys(memberProfileData.data).length > 0) {
      dispatch(companyProfile(memberProfileData.data.company_id));
      setFname(memberProfileData.data.first_name)
      setLname(memberProfileData.data.last_name)
      setProfile(memberProfileData.data.profile_logo_url)
    }
  }, [memberProfileData])

  const handleDropdownItemClick = (e) => {
    console.log("key", e);
    switch (e.key) {
      case "logout":
        dispatch(setLogout());
        break;
    }
  }

  const items = [
    {
      label: `Welcome ${fname} ${lname} !`,
      key: 'wellcome_admin',
    },
    {
      type: 'divider',
    },
    {
      label: <span className="account">My Account</span>,
      key: 'my_account',
      icon: <UserOutlined />,
      onClick: () => setShow(true)
    },
    {
      type: 'divider',
    },
    {
      label: <span className="account">LogOut</span>,
      key: 'logout',
      icon: <LogoutOutlined />,
      onClick: handleDropdownItemClick
    },
  ];
  const { notificationLeft } = useSelector(state => state.notfication);
  const [blink, setBlink] = useState({});
  useEffect(() => {
    let F = {};
    if (Object.keys(notificationLeft).length > 0
      && notificationLeft.data.length > 0) {
      notificationLeft.data.map(item => {
        F[item.type] = item.id;
      })
    }
    setBlink(F);
  }, [notificationLeft])
  const [expanded, setExpanded] = useState(false)
  const handleClose = () => setExpanded(false)
  return (
    <div className='row header-container fixed-top '>
      <div className="col-3"></div>
      <header className='col-9 d-md-flex d-none  header navbar navbar-expand-sm'>
        <ul className="col-12 navbar-item flex-row">
          <li className="col-4 navbar navbar-expand-lg navbar-light px-1">
          </li>
          <li className="col-8 nav-item dropdown user-profile-dropdown d-md-flex d-none justify-content-end fixed-profile1">
            <NotificationContent />
            <div className="col-2 nav-link user" id="userProfileDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
              <Dropdown
                menu={{
                  onClick: items.onClick,
                  items: items,
                }}
                trigger={['click']}
                onVisibleChange={() => setShowTooltip(false)}
              >
                <Tooltip placement="bottom" title={"View Profile"}
                  visible={showTooltip}
                  onVisibleChange={setShowTooltip}>
                  <div onClick={(e) => e.preventDefault()}>
                    <Space>
                      <img src={profile !== '' ? profile : profile1} alt="avatar" className="cursor-pointer" />
                    </Space>
                  </div>
                </Tooltip>
              </Dropdown>
            </div>
          </li>
          <>
            <MyAccount
              show={show}
              setShow={setShow}
            />
          </>
        </ul>
      </header>
      <div className="d-lg-none d-xl-none d-md-none d-sm-flex d-flex ">
        {['md'].map((expand, index) => (
          <>
            <Navbar key={`h${index}`} bg="light" expand={expand} expanded={expanded} className="mb-3 col-12 ">
              <Container fluid>
                <div className='col col-md-5 col-sm-5 mt-4 px-2'>
                  <Navbar.Brand href="/">
                    <h4 className='brandName'>
                      <img src={logo} style={{ width: "75px" }} />
                    </h4>
                  </Navbar.Brand>
                </div>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                  onHide={handleClose}
                >
                  <>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      <div className="fixed-profile d-flex gap-3">
                        <div className="col-4">
                          <Dropdown
                            menu={{
                              onClick: items.onClick,
                              items: items,
                            }}
                            trigger={['click']}
                            onVisibleChange={() => setShowTooltip(false)}
                          >
                            <div className="premium-border ">
                              <img src={profile} className="profile-avatar" />
                            </div>
                          </Dropdown>
                        </div>
                        <div className="col-6 mt-4 d-flex justify-content-start">
                          <h6 className="mb-1" style={{ fontSize: "16px" }}>{fname} {lname}</h6>
                        </div>
                        <div className="col-2 d-flex justify-content-start" ><AiOutlineClose onClick={handleClose} /></div>
                      </div>
                    </Offcanvas.Title>
                  </>
                  <Offcanvas.Body className='' style={{ marginTop: "60px" }}>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <ul className="list-unstyled menu-categories ps ps--active-y " id="accordionExample">
                        {sidebarroutes.map((data, index) => {
                          return (
                            <>
                              <li key={`f${index}`} className={`menu ${data.name === exteraRoute ? 'clicked' : ''}`}
                                onClick={() => {
                                  if (data.link === 'membersearch'
                                    || data.link === 'meetmembers'
                                    || data.link === 'sendviewquote'
                                    || data.link === 'dashboard'
                                  ) {
                                    dispatch(setInitialListParms());
                                  }
                                  dispatch(setForSearch({}));
                                  dispatch(setExteraRoute(data.name));
                                  if (typeof blink[data.link] !== 'undefined') {
                                    dispatch(actionPerform({ type: data.link, left_menu: 1 }));
                                  }
                                }}>
                                <Link to={`/${data.link}`} onClick={() => setExpanded(false)} data-active={`${data.name === exteraRoute ? true : false}`} className="main-item">
                                  <div className='navlinkTitle'>
                                    <div className='d-flex flex-row gap-2 justify-content-start  px-2 mobileNavLink'>
                                      <div className='menuIcons'>{data.img}</div>
                                      <h4 className='sublinking'>{data.name}</h4>
                                    </div>
                                  </div>
                                </Link>
                              </li>
                            </>
                          )
                        })}                       
                      </ul>
                    </Nav>
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
                <div className="col-12 nav-item dropdown user-profile-dropdown justify-content-end fixed-profile1" style={{ marginTop: "-32px" }}>
                  <NotificationContent />
                </div>
              </Container>
            </Navbar>
          </>
        ))}
      </div>
    </div>
  );
};

export default Header;
