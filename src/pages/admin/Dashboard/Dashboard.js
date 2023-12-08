import React, { useEffect } from "react";
import "assets/css/Dashboard/ContentLayout.css"
import SearchBox from "components/Search/SearchBox";
import TitleCard from "./TitleCard/TitleCard";
import VisitedProfile from "./VisitedProfile/VisitedProfile";
import AnnualConference from "./AnnualConference/AnnualConference"
import FeaturedCompany from "./FeaturedCompany/FeaturedCompany"
import Activity from "./Activity/Activity";
import Announcement from "./Announcement/Announcement";
import DashboardSpotlights from "./DashboardSpotlights/DashboardSpotlights";
import { useDispatch, useSelector } from "react-redux";
import { memberProfile, memberAnnouncements } from "redux/Actions/Member";
import { setLogout } from "redux/Reducers/LoggedSlice";
import { useNavigate } from "react-router-dom";
import {
  getFeaturedMember,
  getDashWidgets,
  getVisitedProfiles
} from "redux/Actions/Dashboard"
import {
  getNotifications,
  getNotificationsForMember
} from "redux/Actions/Notifications";

const Dashboard = () => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeaturedMember());
    dispatch(memberProfile());
    dispatch(getDashWidgets());
    dispatch(getVisitedProfiles());
    dispatch(memberAnnouncements({})); 
    dispatch(getNotifications());
    dispatch(getNotificationsForMember({ for_member: 1 }));
  }, []);

  const { announcementsList, tokenExp } = useSelector(state => state.member);
  const {
    dashWidgets,
    featuredData,
    visitedProfiles } = useSelector(state => state.dashboard);
  useEffect(() => {
    if (tokenExp && Object.keys(tokenExp).length > 0
      && tokenExp.error === 'Invalid token') {
      dispatch(setLogout());
      navigate("/");
    }
  }, [tokenExp])
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <SearchBox heading="" type="dashboard" />
        <TitleCard
          dashWidgets={dashWidgets}
        />
        <VisitedProfile
          visitedProfiles={visitedProfiles} />
        <AnnualConference />
        <DashboardSpotlights />
        <FeaturedCompany featuredData={featuredData} />
        <Announcement announcementsList={announcementsList} />
        <Activity />
      </div>
    </div>
  );
};

export default Dashboard;
