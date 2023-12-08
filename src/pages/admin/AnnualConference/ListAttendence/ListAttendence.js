import React, { useState, useEffect, useRef } from 'react'
import "assets/css/AnnualConference/AnnualConference.css"
import { Table } from 'antd';
import { CSVLink } from "react-csv";
import moment from 'moment';

const columns = [
  {
    title: 'S.No',
    dataIndex: 'key',
  },
  {
    title: 'Company Name',
    dataIndex: 'companyname',
    sorter: (a, b) => a.companyname.localeCompare(b.companyname),
    key: "companyname"
  },
  {
    title: 'Country',
    dataIndex: 'country',
    sorter: (a, b) => a.country.localeCompare(b.country),
  },
  {
    title: 'Licensee Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  // {
  //   title: 'Email',
  //   dataIndex: 'email',
  // },
  {
    title: 'Designation',
    dataIndex: 'designation',
  },
];
const ListAttendence = ({ attendeeList }) => {
  const genReport = useRef(null);
  const [csvData, setCsvData] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    let attendee = [];
    let csv = [];
    if (Object.keys(attendeeList).length > 0
      && attendeeList.data.length > 0) {
      attendeeList.data.map((item, index) => {
        attendee.push({
          key: index + 1,
          email: item.email,
          name: item.name,
          companyname: item.company_name,
          country: item.country,
          designation: item.designation
        })
        csv.push({
          index: index + 1,
          name: item.name,
          designation: item.designation,
          // email: item.email,
          // phone: item.phone,
          // colleague: item.colleague,
          // member_name: item.member_name,
          country: item.country,
          company_name: item.company_name,
          // status: item.status === 1 ? `Active` : `InActive`,
          // created_at: moment(item.created_at).format('YYYY-MM-DD HH:MM A')

        })
      })
    }
    setCsvData(csv)
    setDataSource(attendee);
  }, [attendeeList]);

  const headers = [
    { label: 'S.No', key: "index" },
    { label: 'Company Name', key: "company_name" },
    { label: 'Country', key: "country" },
    { label: 'Licensee Name', key: "name" },
    { label: 'Designation', key: "designation" },
    // { label: 'Email', key: "email" },
    // { label: 'Phone', key: "phone" },
    // { label: 'Colleague', key: "colleague" },
    // { label: 'Member Name', key: "member_name" },
    // { label: 'Atatus', key: "status" },
  ]

  const csvReport = {
    data: csvData,
    headers: headers,
    filename: 'attendee-list.csv'
  };
  const onButtonClick = () => {
    genReport.current.link.click();
  }
  return (
    <>
      <div>
        <div className="widget-header mb-4">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12 d-flex flex-row">
              <div className='col-6  d-flex flex-row gap-2'>
                <h4 className='annualTitles'>List of Attendees - </h4>
                <div className="numberCircle">{dataSource.length}</div>
              </div>
              <div className='col-6 d-flex justify-content-end'>
                <button type="button" className="btn btn-primarys mr-2" onClick={onButtonClick}>
                  Download CSV
                </button>
                <CSVLink {...csvReport} ref={genReport} style={{ display: 'none' }}>
                  Generate Report
                </CSVLink>
              </div>
              <br />
            </div>
          </div>
        </div>
        <div>
          <Table
           scroll={{
            x: 600,
          }}
            columns={columns}
            dataSource={dataSource}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
          />
        </div>
      </div>
    </>
  )
}

export default ListAttendence
