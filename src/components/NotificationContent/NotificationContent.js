import React, { useState, useEffect } from 'react'
import "assets/css/Dashboard/Dashboard.css"
import { Popover, Avatar, List, Divider } from 'antd';
import { FaBellSlash, FaRegBell, FaVoteYea } from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import {
  getNotifications,
  actionPerform,
  getNotificationsForMember,
} from "redux/Actions/Notifications";
import { setInitialState } from "redux/Reducers/NotificationsSlice";
import { RotatingLines } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const NotificationContent = () => {

  const dispatch = useDispatch();
  const current = new Date().getTime();
  useEffect(() => {
    setInterval(() => {
      dispatch(getNotifications());
      dispatch(getNotificationsForMember({ for_member: 1 }));
    }, 30000);
  }, []);
  const {
    isLoadingA,
    isSuccess,
    notificationList } = useSelector(state => state.notfication);
  useEffect(() => {
    if (isSuccess) {
      // if (Object.keys(isSuccess).length > 0
      //   && typeof isSuccess.msg !== 'undefined') {
      //   toast.success(`${isSuccess.msg}`, {
      //     toastId: 'success',
      //     autoClose: 1000
      //   })
      // }
      setTimeout(() => {
        dispatch(setInitialState(false));
        dispatch(getNotifications());
      }, 1000);
    }
  }, [isSuccess])
  const [data, setData] = useState([]);
  const [cdata, setCData] = useState([]);
  useEffect(() => {
    let n = [];
    let c = [];
    if (Object.keys(notificationList).length > 0
      && notificationList.data.length > 0) {
      notificationList.data?.map((item, index) => {
        var past_now = new Date(item?.created_at).getTime();
        var delta = Math.abs(current - past_now) / 1000;
        var days = Math.floor(delta / 86400);
        delta -= days * 86400;
        var hours = Math.floor(delta / 3600) % 24;
        delta -= hours * 3600;
        var minutes = Math.floor(delta / 60) % 60;
        delta -= minutes * 60;
        var seconds = Math.floor(delta % 60);
        if (index < 5) {
          c.push(
            {
              index: index + 1,
              id: item?.id,
              is_read: item?.is_read,
              title: item?.title,
              description: item?.description,
              hours: days !== 0 ? `${days} d`
                : (hours !== 0 ? `${hours} h`
                  : (minutes !== 0 ? `${minutes} m`
                    : `${seconds} s`))
            }
          )
        }
        n.push(
          {
            index: index + 1,
            id: item?.id,
            is_read: item?.is_read,
            title: item?.title,
            description: item?.description,
            hours: days !== 0 ? `${days} d`
              : (hours !== 0 ? `${hours} h`
                : (minutes !== 0 ? `${minutes} m`
                  : `${seconds} s`))
          }
        )
      })
    }
    setCData(c)
    setData(n);
  }, [notificationList])

  const handleOnClick = (type, id) => {

    const data = {
      notification_id: id,
      [type]: 1
    };
    dispatch(actionPerform(data));
  }

  const [isSharePopoverVisible, setIsSharePopoverVisible] = useState(false);
  const handlePopoverVisibleChange = () => {
    setIsSharePopoverVisible(!isSharePopoverVisible);
  };
  const handleOk = () => {
    setIsSharePopoverVisible(false)
  }
  return (
    <div className="col-12 col-sm-12 col-xl-10 col-lg-10 col-md-10 d-flex justify-content-end flex-row profile-option-container">
      {isLoadingA &&
        <div className="col-xl-12 col-lg-12 d-none">
          <RotatingLines
            height="20"
            width="20"
            color="#bbce00"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>}
      <ul >
        <li className="option-item dropdown notification-dropdown">
          <Popover
            trigger="hover"
            title="Notifications"
            open={isSharePopoverVisible}
            onOpenChange={handlePopoverVisibleChange}
            content={<>
              <List
                itemLayout="horizontal"
                dataSource={cdata}
                renderItem={(item, index) => (
                  <>
                    <List.Item className={`${item.is_read === 1 ? 'read errorss' : 'unread seen'}`}>
                      <div className='col-12 d-flex flex-row' style={{ padding: "5px", fontSize: "12px", fontFamily: "Poppins" }}>
                        <div className='col-9 d-flex flex-column'>
                          <div>{item.title}.<span className='hours mt-2'> {item.hours} ago</span></div>
                        </div>
                        <div className='d-flex flex-column col-3'>
                          {item.is_read !== 1 &&
                            <div style={{ padding: "2px", fontSize: "11px" }}
                              className='btn btn-sm text-white readmorebtn'
                              onClick={() => handleOnClick('is_read', item?.id)}> Mark as read
                            </div>
                          }
                          <div>
                          </div>
                        </div>
                      </div>
                    </List.Item>
                  </>
                )}
              />
              {data.length > 0 ?
                <>
                  <Divider style={{ color: "black" }} />
                  <div className="col-12 card-footer d-flex flex-row justify-content-end gap-2">
                    <Link to="/viewnotification" state={{ data }}>
                      <div className="d-flex col-12 justify-content-center btn btn-sm text-white readmorebtn" onClick={handleOk}>
                        <div style={{ fontSize: "12px" }}> See all</div>
                      </div>
                    </Link>
                    <div >
                    </div>
                  </div>
                </>
                :
                <div></div>
              }
            </>
            }
          >
            {data.length === 0 ?
              <div className="option-link-container" style={{ margin: "18px" }}>
                <div className="option-link">
                  <i className="las la-bell">
                    <FaRegBell />
                  </i>
                </div>
              </div>
              :
              <div className="option-link-container">
                <div className="option-link">
                  <i className="las la-bell">
                    <FaRegBell />
                  </i>
                  {
                    (() => {
                      const found = data.filter(item => item.is_read === 0)
                      if (found.length > 0) {
                        return (
                          <div className="blink">
                            <div className="circle"></div>
                          </div>
                        )
                      }
                    })()
                  }
                </div>
                {
                  (() => {
                    const found = data.filter(item => item.is_read === 0)
                    if (found.length > 0) {
                      return (
                        <div className="text-left px-2">
                          <p style={{ marginTop: "12px", fontSize: "12px" }}>{found.length} Unread</p>
                        </div>
                      )
                    }
                  })()
                }
              </div>
            }
          </Popover>
        </li>
      </ul>
      <ToastContainer />
    </div >
  )
}

export default NotificationContent