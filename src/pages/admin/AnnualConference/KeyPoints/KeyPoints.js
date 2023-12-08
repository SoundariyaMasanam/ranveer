import React from 'react'

const KeyPoints = ({ keyEventsList }) => {

  return (
    <div className="widget-header">
      <div className="row">
        <h4 className='annualTitles mb-3'>Key Events</h4><br />
        {Object.keys(keyEventsList).length > 0
          && keyEventsList.data.length > 0
          && keyEventsList.data.map((item, index) => {
            return (
              <div key={`k${index}`} className=" col-xl-6 col-md-12 col-sm-12 col-12 mb-3 ">
                  <div className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-2" style={{ color: "#3b3f5c" }}>{item?.title}</h5>
                    </div>
                    <p className="mb-1">
                      <span dangerouslySetInnerHTML={{ __html: item.description }} ></span>
                    </p>
                  </div>
              </div>
            )
          })
        }
      </div>  
    </div>
  )
}

export default KeyPoints