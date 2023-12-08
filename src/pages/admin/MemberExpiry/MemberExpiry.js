import React, { useEffect } from 'react'
import "assets/css/MemberExpiry/MemberExpiry.css"
import InsideMemberExpiry from "./InsideMemberExpiry/InsideMemberExpiry"
import { getLicensesExpire } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux';

const MemberExpiry = () => {
  const dispatch = useDispatch();
  const { expireList } = useSelector(state => state.member);
  useEffect(() => {
    window.scrollTo(0, 0);
  },[])
  useEffect(() => {
    dispatch(getLicensesExpire({
      status: "expired"
    }));
  }, [])
  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <InsideMemberExpiry
          licensesList={expireList} />
      </div>
    </div>
  )
}

export default MemberExpiry