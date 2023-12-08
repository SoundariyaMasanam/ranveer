import React, { useEffect } from 'react'
import Cards from 'components/Cards/Cards'
import DepartedTable from "./DepartedTable/DepartedTable"
import { getLicensesDeparted } from "redux/Actions/Member";
import { useDispatch, useSelector } from 'react-redux';

const DepartedMember = () => {
  const dispatch = useDispatch();
  const { departedList } = useSelector(state => state.member);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  useEffect(() => {
    dispatch(getLicensesDeparted({
      status: "departed"
    }));
  }, [])
  const para = <>
    A list of licensees who have exited the TALA network is given below. Carefully
    review this updated list before initiating any unpaid invoice claims and other
    unsolved issues.<br /> Note that our resolution centre will not address unpaid claims for departed members
    after their departure date. <br /> To ensure efficient handling of your claims, it is important to notify us promptly about
    any outstanding invoices related to the listed departed licensees.
  </>

  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
          <Cards
            heading="Departed Licensee"
            Para={para}
          />
        </div>
        <DepartedTable
          licensesList={departedList} />
      </div>
     
    </div>
  )
}

export default DepartedMember