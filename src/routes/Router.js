import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import ProtectedRoutes from "./ProtectedRoutes";
import Signin from "pages/auth/Signin";
import ForgetPassword from "pages/auth/ForgetPassword";
import ResetPassword from "pages/auth/ResetPassword";
import Dashboard from "pages/admin/Dashboard/Dashboard";
import VideoGuide from "pages/admin/VideoGuide/VideoGuide";
import CompanyProfile from "pages/admin/CompanyProfile/CompanyProfile";
import MemberSearch from "pages/admin/MemberSearch/MemberSearch";
import SendViewQuote from "pages/admin/SenViewQuote/SendViewQuote";
import MeetMembers from "pages/admin/MeetMembers/MeetMembers";
import TalaSpotlights from "pages/admin/TalaSpotlights/TalaSpotlights";
import Announcement from "pages/admin/Announcement/Announcement";
import ResolutionCenter from "pages/admin/ResolutionCenter/ResolutionCenter";
import MonthlyReports from "pages/admin/MonthlyReports/MonthlyReports";
import SpotlightsSubmission from "pages/admin/SpotlightsSubmission/SpotlightsSubmission"
import AnnualConference from "pages/admin/AnnualConference/AnnualConference";
import Exhibitions from "pages/admin/Exhibitions/Exhibitions"
import MemberExpiry from "pages/admin/MemberExpiry/MemberExpiry"
import HallofShame from "pages/admin/HallofShame/HallofShame"
import DepartedMember from "pages/admin/DepartedMember/DepartedMember";
import Documents from "pages/admin/Documents/Documents";
import FinancialProtection from "pages/admin/FinancialProtection/FinancialProtection";
import SpotlightDetails from "components/Spotlight/SpotlightDetails";
import AnnouncementDetails from "pages/admin/Announcement/AnnouncementDetails";
import EventDetailsTable from "pages/admin/Exhibitions/ExhibitionTable/ExhibitionTable";
import ViewNotifications from "components/NotificationContent/AllNotifications/ViewNotifications";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PublicRoutes component={Signin} />} />
          <Route path="/forgot-password" element={<PublicRoutes component={ForgetPassword} />} />
          <Route path="/reset-password/:token" element={<PublicRoutes component={ResetPassword} />} />          
          <Route path="/dashboard" element={<ProtectedRoutes component={Dashboard} index="1"/>} />
          <Route path="/videoguide" element={<ProtectedRoutes component={VideoGuide} index="2"/>} />
          <Route path="/companyprofile/:cid?/:mid?" element={<ProtectedRoutes component={CompanyProfile} index="3"/>} />
          <Route path="/membersearch" element={<ProtectedRoutes component={MemberSearch} index="4"/>} />
          <Route path="/sendviewquote/:stype?" element={<ProtectedRoutes component={SendViewQuote} index="5"/>} />
          <Route path="/meetmembers" element={<ProtectedRoutes component={MeetMembers} index="6"/>} />
          <Route path="/talaspotlight/:stype?" element={<ProtectedRoutes component={TalaSpotlights} index="7"/>} />
          <Route path="/announcements" element={<ProtectedRoutes component={Announcement} index="8"/>} />
          <Route path="/documents" element={<ProtectedRoutes component={Documents} index="9"/>} />
          <Route path="/financialprotection" element={<ProtectedRoutes component={FinancialProtection} index="10" />} />
          <Route path="/resolutionCenter" element={<ProtectedRoutes component={ResolutionCenter} index="11" />} />
          <Route path="/monthlyreport/:stype?" element={<ProtectedRoutes component={MonthlyReports} index="12"/>} />
          <Route path="/spotlightsubmission" element={<ProtectedRoutes component={SpotlightsSubmission} index="13"/>} />
          <Route path="/annualconference/:stype?" element={<ProtectedRoutes component={AnnualConference} index="14"/>} />
          <Route path="/exhibitions" element={<ProtectedRoutes component={Exhibitions} index="15"/>} />
          <Route path="/memberexpiry" element={<ProtectedRoutes component={MemberExpiry} index="16"/>} />
          <Route path="/hallofshame" element={<ProtectedRoutes component={HallofShame} index="17"/>} />
          <Route path="/departedmembers" element={<ProtectedRoutes component={DepartedMember} index="18"/>} />
          <Route path="/talaspotlight/details/:id" element={<ProtectedRoutes component={SpotlightDetails} index="19" />} />
          <Route path="/announcements/details/:id/:d?" element={<ProtectedRoutes component={AnnouncementDetails} index="20" />} />
          <Route path="/exhibitions/details/:id?" element={<ProtectedRoutes component={EventDetailsTable} index="21" />} />
          <Route path="/viewnotification" element={<ProtectedRoutes component={ViewNotifications} index="23" />} />
        </Routes> 
      </BrowserRouter>
    </>
  )
}
export default Router;
