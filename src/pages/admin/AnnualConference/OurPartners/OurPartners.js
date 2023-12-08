import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const OurPartners = ({ scrollRef, sponsersList, setSpomser }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const handleClick = (value) => {
    setSpomser(value);
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <div className="widget-header">
      <div className="row">
        <div className="col-xl-12 col-md-12 col-sm-12 col-12">
          <h4 className='annualTitles'>Our Sponsors</h4><br />
        </div>
        <div className="col-xl-12">
          <div className="parent">
            <Carousel
              responsive={responsive}
              autoPlay={true}
              swipeable={true}
              draggable={true}
              partialVisible={false}
              dotListClass="custom-dot-list-style"
              autoPlaySpeed={1000}
              infinite={true}
            >
              {Object.keys(sponsersList).length > 0 &&
                sponsersList.data.length > 0 &&
                sponsersList.data.map((item, index) => {
                  return (
                    <div key={`op${index}`} className='col-md-12 col-12 '
                      onClick={() => handleClick(item?.category)} style={{ cursor: "pointer" }}>
                      <div className='p-2'>
                        <img src={item.file_url} alt="avatar" className='img-fluid'/>
                      </div>
                    </div>
                  )
                })}
            </Carousel>
          </div>
        </div>
      </div>
    </div >
  )
}

export default OurPartners

