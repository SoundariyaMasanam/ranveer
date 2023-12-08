import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSpotlightListing } from "redux/Actions/Spotlight";
import { Link } from 'react-router-dom';
import "assets/css/Spotlights/Spotlights.css"
import { AiOutlineInbox } from "react-icons/ai"

const SpotlightListing = ({ spot }) => {
  console.log("spot==>",spot)
  const dispatch = useDispatch();
  const { spotlightListing } = useSelector(state => state.spotlight);

  useEffect(() => {
    if (typeof spot !== 'undefined' && spot === 'sub') {
      dispatch(getSpotlightListing({ history: 1 }));
    } else {
      dispatch(getSpotlightListing({}));
    }

  }, []);

  return (
    <>
      {Object.keys(spotlightListing).length > 0
        && spotlightListing.data.length > 0 ?
        spotlightListing.data.map((item, index) => {
          const thumbnail = item.thumbnail ? item.thumbnail.split(','): [];
          return (
            <div key={index} className="col-12 col-xl-4 col-md-12 col-lg-4 py-3">
              <div className="card widget overflow-hidden p-0">
              {/* <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" style={{height:"20vh"}}/> */}
                {/* <div style={{ backgroundImage: `url(${thumbnail})`, backgroundSize: "cover", height: "250px" }}></div> */}
                {thumbnail.length > 0 &&
                  <img className="card-img-top" src={thumbnail[0]} alt="Card image cap" />
                }                
                <div className="p-3" style={{ minHeight: "280px" }}>
                  <Link to={`/talaspotlight/details/${item.id}`} >
                    <div className="text-black">
                      <h6 className="mb-3 strong" style={{ fontWeight: "600", fontSize: "17px" }}>{item.title}</h6>
                    </div>
                  </Link>
                  <h6 className="mb-2" style={{ fontSize: "11px" }}>Category : &nbsp;{item.category_title}</h6>
                  <h6 className="mb-3" style={{ fontSize: "11px" }}>Published on : &nbsp;{item?.publish_date} </h6>
                  <p className="mb-3 paraSpotlight" style={{ fontSize: "14px", color: "#515050" }}>
                    <span dangerouslySetInnerHTML={{ __html: item.description.slice(0, 200) }} >
                    </span>
                  </p>
                </div>
                <div className="col-12 card-footer">
                  <Link to={`/talaspotlight/details/${item.id}`} >
                    <div className="d-flex col-12 justify-content-center btn btn-sm readmorebtn text-white">
                      <div > Read More</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div >
          )
        }) : <div className="list-group-item list-group-item-action d-flex flex-column justify-content-center">
          <div className='d-flex justify-content-center'>
            <AiOutlineInbox
              style={{ color: "grey", fontSize: "32px" }}
            />
          </div>
          <div className='d-flex justify-content-center mt-2' style={{ color: "grey" }}>
            Spotlight not submitted
          </div>
        </div>
      }
    </>
  )
}

export default SpotlightListing
