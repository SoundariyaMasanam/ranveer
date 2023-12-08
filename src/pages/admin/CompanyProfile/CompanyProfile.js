import React, { useEffect, useState } from 'react'
import GeneralInformation from "./GeneralInfomation/GeneralInformation"
import TeamMembers from "../VideoGuide/TeamMembers/TeamMembers"
import InsideCompanyProfile from "./InsideCompanyProfile/InsideCompanyProfile"
import SendQuote from './SendQuote/SendQuote'
import EventParticipate from './Event/EventParticipate'
import CompanySpotlight from './CompanySpotlight/CompanySpotlight'
import { useDispatch, useSelector } from 'react-redux';
import { RotatingLines } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import {
  companyProfilePage,
  memberVisitProfile,
  getInfoByBranch,
  getBranches
} from "redux/Actions/Company";
import { setBranchInfo } from 'redux/Reducers/CompanySlice';
import {
  getExhibition
} from "redux/Actions/EventExhibition";
import CompanyDescription from './CompanyDescription/CompanyDescription'

const CompanyProfile = () => {
  const dispatch = useDispatch();
  const { isLoading,
    companyData,
    branchInfo,
    cBranch } = useSelector(state => state.company);
  const { memberProfileData } = useSelector(state => state.member);
  const { exhibitionDetails } = useSelector(state => state.exhibition);
  let { cid, mid } = useParams();
  useEffect(() => {
    if (typeof cid !== 'undefined') {
      dispatch(companyProfilePage({ company_id: cid, member_id: mid }));
      dispatch(getExhibition({ going_to_attend: 1, member_id: mid }))
      dispatch(memberVisitProfile({ to_member_id: mid }));
    } else {
      dispatch(getExhibition({ going_to_attend: 1 }))
      dispatch(companyProfilePage({ company_id: memberProfileData?.data?.company_id }));
    }

    if (!isLoading) {
      window.scrollTo(0, 0);
    }
  }, [cid, mid])

  const [country, setCountry] = useState(false);
  const [branchId, setBranchId] = useState(false);

  useEffect(() => {
    dispatch(setBranchInfo());
  }, [])

  useEffect(() => {
    if (branchId && country) {
      const data = {
        country: country,
        branch_id: branchId
      };
      if (typeof cid !== 'undefined') {
        data.company_id = cid;
      } else {
        data.company_id = memberProfileData?.data?.company_id;
      }
      dispatch(getInfoByBranch(data));
    }
    if (!branchId) {
      dispatch(setBranchInfo());
    }
  }, [branchId]);
  useEffect(() => {
    if (country) {
      const data = {
        country: country
      };
      if (typeof cid !== 'undefined') {
        data.company_id = cid;
      } else {
        data.company_id = memberProfileData?.data?.company_id;
      }
      dispatch(getBranches(data));
    }
  }, [country]);


  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        {!isLoading ?
          <>
            {Object.keys(companyData)?.length > 0
              && typeof companyData?.data !== 'undefined'
              && Object.keys(companyData?.data)?.length > 0
              && typeof companyData?.data?.company_info !== 'undefined'
              && companyData?.data?.company_info
              && Object.keys(companyData?.data?.company_info)?.length > 0
              && <>
                <GeneralInformation
                  data={companyData?.data?.company_info}
                  cid={cid}
                  branches={companyData?.data?.branches}
                  setCountry={setCountry}
                  setBranchId={setBranchId}
                  branchId={branchId}
                  country={country}
                  cBranch={cBranch}
                />
              </>
            }
            {country && Object.keys(cBranch).length > 0
              && typeof cBranch?.data !== 'undefined'
              && Object.keys(cBranch?.data)?.length > 0
              && typeof cBranch?.data?.company_info !== 'undefined'
              && cBranch?.data?.company_info !== null ?
              <CompanyDescription
                info={cBranch?.data?.company_info}
                data={cBranch?.data?.branches}
                bInfo={branchInfo}
                country={country}
                branchId={branchId} />
              : Object.keys(companyData)?.length > 0
              && typeof companyData?.data !== 'undefined'
              && Object.keys(companyData?.data)?.length > 0
              && companyData?.data?.branches !== 'undefined'
              && <CompanyDescription
                info={companyData?.data?.company_info}
                data={companyData?.data?.branches}
                bInfo={branchInfo}
                country={country}
                branchId={branchId}
              />
            }

            {country && Object.keys(branchInfo).length > 0
              && typeof branchInfo?.data !== 'undefined'
              && Object.keys(branchInfo?.data)?.length > 0 ?
              <TeamMembers info={companyData?.data?.company_info}
                data={branchInfo?.data?.team_members} />
              : country && Object.keys(cBranch).length > 0
                && typeof cBranch?.data !== 'undefined'
                && Object.keys(cBranch?.data)?.length > 0
                && typeof cBranch?.data?.team_members !== 'undefined' ?
                <TeamMembers info={companyData?.data?.company_info}
                  data={cBranch?.data?.team_members} />
                : Object?.keys(companyData)?.length > 0
                && typeof companyData?.data !== 'undefined'
                && Object.keys(companyData?.data)?.length > 0
                && companyData?.data?.company_members !== 'undefined'
                && <TeamMembers info={companyData?.data?.company_info}
                  data={companyData?.data?.company_members} />
            }
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="d-flex flex-md-row flex-column  widget widget-table-one">
                {Object?.keys(exhibitionDetails)?.length > 0
                  && exhibitionDetails?.data !== 'undefined'
                  && <EventParticipate data={exhibitionDetails?.data} />
                }
                {Object?.keys(companyData)?.length > 0
                  && typeof companyData?.data !== 'undefined'
                  && Object?.keys(companyData?.data)?.length > 0
                  && companyData?.data?.spotlight !== 'undefined'
                  && <CompanySpotlight data={companyData?.data?.spotlight} />
                }
              </div>
            </div>
            {typeof cid !== 'undefined'
              && (country && branchId && Object.keys(branchInfo).length > 0
                && typeof branchInfo?.data !== 'undefined'
                && Object.keys(branchInfo?.data)?.length > 0 ?
                <SendQuote member={branchInfo?.data?.team_members} />
                : Object?.keys(companyData)?.length > 0
                && typeof companyData?.data !== 'undefined'
                && Object.keys(companyData?.data)?.length > 0
                && companyData?.data?.company_members !== 'undefined'
                && <SendQuote member={companyData?.data?.company_members} />)
            }
            {country && Object.keys(cBranch).length > 0
              && typeof cBranch?.data !== 'undefined'
              && Object.keys(cBranch?.data)?.length > 0
              && typeof cBranch?.data?.company_info !== 'undefined'
              && cBranch?.data?.company_info !== null ?
              <InsideCompanyProfile
                info={cBranch?.data?.company_info}
                data={cBranch?.data?.branches}
                bInfo={branchInfo}
                country={country}
                branchId={branchId} />
              : Object.keys(companyData)?.length > 0
              && typeof companyData?.data !== 'undefined'
              && Object.keys(companyData?.data)?.length > 0
              && companyData?.data?.branches !== 'undefined'
              && <InsideCompanyProfile
                info={companyData?.data?.company_info}
                data={companyData?.data?.branches}
                bInfo={branchInfo}
                country={country}
                branchId={branchId}
              />
            }

          </> :
          <div className="col-xl-12 col-lg-12" style={{ margin: "15% 40%" }}>
            <RotatingLines
              strokeColor="#bbce00"
              strokeWidth="5"
              animationDuration="1.00"
              width="70"
              visible={true}
            />
          </div>
        }
      </div>
    </div>
  )
}

export default CompanyProfile