import React, { useState, useEffect } from 'react'
import { memberAnnouncements } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Announce_Doc = () => {
  const dispatch = useDispatch();
  const { announcementsList } = useSelector(state => state.member);
  useEffect(() => {
    dispatch(memberAnnouncements({}));
  }, []);
  const [featuredData, setFeaturedData] = useState([]);
  useEffect(() => {
    let tempData = [];
    if (Object.keys(announcementsList).length > 0
      && announcementsList.data.length > 0) {
      announcementsList.data.map((item, index) => {
        tempData.push({
          title: item.title,
          description: item.description,
          frontThumbnail: item.thumbnails,
          insideImg: item.thumbnail,
          index: index + 1,
          id: item.id,
          publish_date: item?.publish_date
        });
      });
    }
    setFeaturedData(tempData);
  }, [announcementsList])

  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing " style={{ marginTop: "25px" }}>
      <div className="widget widget-table-one">
        <div className="widget-heading">
          <h5 className="">Announcement</h5>
        </div>
        <div className="widget-content" style={{ padding: "15px" }}>
          <div className="">
            <Row xs={1} sm={1} md={1} lg={3} xl={3} className="">
              {featuredData.length > 0 ?
                featuredData?.map((item, index) => {
                  const thumbnail = item.frontThumbnail ? item.frontThumbnail.split(',') : [];
                  return (
                    <Col key={`we${index}`}>
                      <>
                        <div className="py-3">
                          <div className="card widget overflow-hidden p-0">
                            {thumbnail.length > 0 &&
                              <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" />
                            }
                            {/* <img className="card-img-top" src={item.img} alt="Card image cap" style={{height:"100px"}}/> */}
                            {/* <div style={{ backgroundImage: `url(${item.img})`, backgroundSize: "cover", height: "200px" }}></div> */}
                            <div className="p-3" style={{ minHeight: "200px" }}>
                              <Link to={`/announcements/details/${item.id}`}>
                                <div className="text-black">
                                  <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px" }}>{item?.title}</h6>
                                </div>
                              </Link>
                              <h6 className="mb-3" style={{ fontSize: "11px" }}>
                                Published on : {item?.publish_date}
                              </h6>
                              <p className="mb-3 paraSpotlight1" style={{ fontSize: "14px", color: "#515050" }}>
                                <span dangerouslySetInnerHTML={{ __html: item?.description.slice(0, 200) }} ></span></p>
                            </div>
                            <div className="col-12 card-footer">
                              <Link to={`/announcements/details/${item.id}`}>
                                <div className="d-flex col-12 justify-content-center btn btn-sm readmorebtn text-white">
                                  <div> Read More</div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    </Col>
                  )
                }) : <div className="list-group-item list-group-item-action">No Data Found.</div>}
            </Row>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Announce_Doc