import React from 'react'
import "assets/css/CompanyProfile/CompanyProfile.css"
import BoldHeading from 'components/BoldHeading/BoldHeading';

function CompanyDescription({ info, bInfo, country, branchId }) {
    console.log("info============>",info)
    return (
        <div className="col-xl-12 col-lg-8 col-md-12 mt-md-0 mt-4" >
            <div className="profile-info">
                <div className="widget-header">
                    {info?.company_name === "Expedite OBC - Strategic Partner" || "Engine Logistics Services & Solutions E.L.S"?
                        <BoldHeading
                            Boldheading={`${info?.company_name} - Strategic Partner`}
                        />
                        :
                        <BoldHeading
                            Boldheading={`TALA ${(country) ? country : info?.main_country} powered by ${info?.company_name}`}
                        />
                    }
                </div>
                <br />
                <p style={{ textAlign: "justify" }}>
                    {country && branchId
                        && Object.keys(bInfo).length > 0
                        && Object.keys(bInfo?.data)?.length > 0
                        ?
                        bInfo?.data?.headline
                        : info?.description}
                </p>
            </div>
        </div>
    )
}

export default CompanyDescription
