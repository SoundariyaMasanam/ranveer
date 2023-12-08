import React, { useEffect, useState } from "react";
import "assets/css/Dashboard/Dashboard.css"
import { useDispatch, useSelector } from "react-redux";
import { setExteraRoute } from "redux/Reducers/LoggedSlice";
import { Link } from "react-router-dom";
import { setInitialState } from "redux/Reducers/NotificationsSlice";
import {
  actionPerformSideBar,
  getNotificationsLeftMenu
} from "redux/Actions/Notifications";
import { setForSearch } from 'redux/Reducers/MemberSlice';
import { Badge } from 'antd';
import { setInitialListParms } from "redux/Reducers/CompanySlice";

const Sidebar = ({ sidebarroutes }) => {
  const dispatch = useDispatch();
  const { exteraRoute } = useSelector(state => state.loggedin);
  const { isSuccessA } = useSelector(state => state.notfication);

  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(getNotificationsLeftMenu());
  //   }, 1000);
  // }, []);

  useEffect(() => {
    if (isSuccessA) {
      setTimeout(() => {
        dispatch(setInitialState(false));
        dispatch(getNotificationsLeftMenu());
      }, 1000);
    }
  }, [isSuccessA]);
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
  return (
    <div className="contents">
      <div className="scrollbar">
        <ul className="list-unstyled menu-categories ps ps--active-y" id="accordionExample">
          {sidebarroutes.map((data, index) => {

            return (
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
                    dispatch(actionPerformSideBar({ type: data.link, left_menu: 1 }));
                  }
                  window.scrollTo(0, 0);
                }}>
                <Link to={`/${data.link}`} data-active={`${data.name === exteraRoute ? true : false}`}>
                  {typeof blink[data.link] !== 'undefined' &&
                    <div className="blinks">
                      <div className="circles"></div>
                    </div>
                  }                 
                  {(() => {
                    // if (data.name === "Financial Protection") {
                    //   return (
                    //     <Badge.Ribbon text="Coming Soon..." color="red">
                    //       <div className="card finacard">
                    //         <i className="las la-home ribbon-corner ribbon-fold " data-active={`${data.name === exteraRoute && true}`} >
                    //           <div className='sidebar-icons'>{data.img}</div>
                    //         </i>
                    //         <span>{data.name}</span>
                    //       </div>
                    //     </Badge.Ribbon>
                    //   )
                    // } 
                    // else if (data.name === "Hall of Shame") {
                    //   return (
                    //     <Badge.Ribbon text="Coming Soon..." color="red">
                    //       <div className="card finacard1">
                    //         <i className="las la-home ribbon-corner ribbon-fold " data-active={`${data.name === exteraRoute && true}`} >
                    //           <div className='sidebar-icons'>{data.img}</div>
                    //         </i>
                    //         <span>{data.name}</span>
                    //       </div>
                    //     </Badge.Ribbon>
                    //   )
                    // }
                    if (data.name === "Video Guide") {
                      return (
                        <Badge.Ribbon text="Coming Soon..." color="red">
                          <div className="card finacard1">
                            <i className="las la-home ribbon-corner ribbon-fold " data-active={`${data.name === exteraRoute && true}`} >
                              <div className='sidebar-icons'>{data.img}</div>
                            </i>
                            <span>{data.name}</span>
                          </div>
                        </Badge.Ribbon>
                      )
                    }
                    else {
                      return (
                        <>
                          <i className="las la-home" data-active={`${data.name === exteraRoute ? true : false}`}>
                            <div className='sidebar-icons'>{data.img}</div>
                          </i>
                          <span>{data.name}</span>
                        </>
                      )
                    }
                  })()}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div >
  );
};

export default Sidebar;




{/* <div>
                        <div >
                          <i className="las la-home ribbon-corner ribbon-fold" data-active={`${data.name === exteraRoute ? true : false}`} >
                            <div className='sidebar-icons'>{data.img}</div>
                          </i>
                          <span>{data.name}</span>
                        </div>
                      </div> */}
{/* <div className="finan" data-active={`${data.name === exteraRoute ? true : false}`}>
                        <div className="mt-2 coming" >Coming Soon...</div>
                         </div> */}