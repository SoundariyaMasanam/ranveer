import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import { useLocation } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import {
  getNotifications,
  actionPerform,
} from "redux/Actions/Notifications";
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/NotificationsSlice";
import { BsBellSlash } from "react-icons/bs"
import "assets/css/Dashboard/Dashboard.css"

function ViewNotifications() {
  const dispatch = useDispatch();
  const current = new Date().getTime();
  const {
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
  }, [isSuccess]);

  useEffect(() => {
    getNotifications()
  }, [notificationList])

  const handleOnClick = (type, id) => {

    const data = {
      notification_id: id,
      [type]: 1
    };
    dispatch(actionPerform(data));
  }
  const [cdata, setCData] = useState([]);
  useEffect(() => {
    let n = [];
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
    setCData(n)
  }, [notificationList])
  return (
    <div className="layout-pxx-spacing col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12 mb-4 mt-3 ">
      <div className="statbox widget box box-shadow">
        <div className="widget-header">
          <div className="col-12 d-flex flex-column mb-5 ">
            <div className="col-12 col-md-12 d-flex flex-row">
              <div className='col-6'>
                <h4 className='annualTitles'>Notifications</h4>
              </div>
            </div>
            <br />
            <div>
              <ListGroup>
                {cdata.length > 0 ?
                  cdata.map((item, index) => {
                    return (
                      <ListGroup.Item className={`${item.is_read === 1 ? 'read errorss' : 'unread seen'}`} >
                        <div className='col-12 d-flex flex-row'>
                          <div className='col-12 d-flex flex-column'>
                            <div className='col-12 d-flex flex-column flex-md-row flex-xl-row flex-lg-row'>
                              <div className='col-md-10 col-xl-10 col-lg-10 col-12 d-flex flex-column'>
                                <div>
                                  {item.title}
                                </div>
                                <div className='hours mt-2'>{item.hours} ago</div>
                              </div>
                              {item.is_read !== 1 &&
                                <div className='col-4 col-md-2 col-xl-2 col-lg-2 mt-2 mt-md-0 mt-xl-0 mt-lg-0 d-flex justify-content-start  justify-content-xl-end justify-content-lg-end'>
                                  <div>
                                    <button type="button"
                                      class="btn readmorebtn text-white"
                                      style={{ fontSize: "12px" }}
                                      onClick={() => handleOnClick('is_read', item?.id)}
                                    >
                                      Mark as read
                                    </button>
                                  </div>
                                </div>
                              }
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                    )
                  })
                  :
                  <div className='col-12 d-flex justify-content-center flex-column mt-4'>
                    <div className='d-flex justify-content-center' style={{ color: "grey", fontSize: "22px" }}><BsBellSlash /></div>
                    <div className='d-flex justify-content-center mt-3' style={{ color: "grey", fontSize: "14px" }}>All Caught up!</div>
                  </div>
                }
              </ListGroup>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewNotifications
