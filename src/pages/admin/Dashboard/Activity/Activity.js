import React from 'react'
import "assets/css/Dashboard/Activity.css"
import BoldHeading from 'components/BoldHeading/BoldHeading'
import { useSelector } from "react-redux";
import { useEffect } from 'react'
import { useState } from 'react'
import moment from 'moment'
import { TbAlertCircle } from "react-icons/tb"

const Activity = () => {
  const { notificationMember } = useSelector(state => state.notfication);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    let fa = [];
    if (Object.keys(notificationMember).length > 0
      && notificationMember.data.length > 0) {
      const NL = notificationMember.data.length;
      const NLD = notificationMember.data;
      if (NL > 2) {
        fa = [
          { key: 3, title: NLD[NL - 1].title, date: moment(NLD[NL - 1].created_at).format('MMM DD') },
          { key: 2, title: NLD[NL - 2].title, date: moment(NLD[NL - 2].created_at).format('MMM DD') },
          { key: 1, title: NLD[NL - 3].title, date: moment(NLD[NL - 3].created_at).format('MMM DD') }
        ];
      } else if (NL === 2) {
        fa = [
          { key: 3, title: NLD[NL - 1].title, date: moment(NLD[NL - 1].created_at).format('MMM DD') },
          { key: 2, title: NLD[NL - 2].title, date: moment(NLD[NL - 2].created_at).format('MMM DD') }
        ];
      } else {
        fa = [
          { key: 3, title: NLD[NL - 1].title, date: moment(NLD[NL - 1].created_at).format('MMM DD') }
        ];
      }
    }
    setActivity(fa);
  }, [notificationMember]);
  // console.log('activity',activity)
  return (
    <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-three">
        <BoldHeading
          Boldheading="Recent Activities"
        />
        <div className="widget-content mt-4">
          <div className="">
            <ol className="activity-feed">
              {activity.length > 0
                ? activity.map(item => {
                  return (
                    <li key={`sm${item?.key}`} className="feed-item">
                      <div className="feed-item-list">
                        <span className="date">{item?.date}</span>
                        <span className="activity-text">{item?.title}</span>
                      </div>
                    </li>
                  );
                })
                :
                <div className='d-flex flex-column'>
                  <div className='d-flex justify-content-center'>
                    <TbAlertCircle
                      style={{ color: "grey", fontSize: "26px" }}
                    />
                  </div>
                  <div className='d-flex justify-content-center mt-2' style={{ color: "grey", fontSize: "14px" }}>
                    No Activity found here.
                  </div>
                </div>
              }
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Activity

{/* <div className='d-flex flex-column'>
              <div className='d-flex justify-content-center'>
              <TbAlertCircle
                style={{ color: "grey", fontSize: "26px" }}
              />
               </div>
              <div className='d-flex justify-content-center mt-2' style={{ color: "grey",fontSize: "14px" }}>
                They are not attending any events.
              </div>
            </div> */}