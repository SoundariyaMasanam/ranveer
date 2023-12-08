import React, { useEffect, useState } from 'react'
import "assets/css/Dashboard/FeaturedCompany.css"
import "assets/css/Dashboard/TitleCard.css"
import "react-multi-carousel/lib/styles.css";
import noImage from "assets/img/no-image.jpg";
import { Link } from "react-router-dom";

const FeaturedCompany = ({ featuredData }) => {

  const [features, setFeatures] = useState([])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  useEffect(() => {

    let FeaturedArr = [];
    if (Object.keys(featuredData).length > 0
      && Object.keys(featuredData.data).length > 0) {
      const FeaturedData = featuredData.data
      FeaturedData?.map((data, index) => {
        let obj = {
          index: index + 1,
          companyName: data.company_name,
          licence: data.licence,
          company_id: data.company_id,
          logo: data.logo_url,
          member_id: data.member_id
        }
        FeaturedArr.push(obj);
      })
      setFeatures([...FeaturedArr])
    }

  }, [featuredData]);


  return (
    <div className="col-xl-12 col-lg-6 col-md-12 col-sm-12 col-12 layout-spacing">
      <div className="widget widget-table-one">
        <div className="widget-heading">
          <h5 className="">Featured Licensee</h5>
        </div>
        <div className="col-xl-12">
          <div className='col-md-12 d-flex flex-md-row flex-sm-row flex-column gap-2 featured p-sm-4'>
            {features.slice(0, 4).map((item, index) => {
              return (
                <div className="col-12 col-md-3 col-sm-3 card featuredwidget overflow-hidden  mt-md-0 mt-3" key={`it${index}`}>
                  <Link to={`/companyprofile/${item.company_id}/${item.member_id}`} >
                    <div className=" items">
                      <div className="user-profile">
                        <center className='featuredCards'>
                          <img src={`${item?.logo !== '' ? item?.logo : noImage}`} className='img-fluid card-img-top' style={{height:"117px"}} />
                        </center>
                        <div className="card-body user-meta-info mt-md-2" >
                          {/* <center><p className="user-name" style={{fontWeight:"600"}}>{item.licence}</p></center> */}
                          <center><p className="user-name" style={{fontWeight:"600"}}>{item.companyName}</p></center>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>             
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturedCompany