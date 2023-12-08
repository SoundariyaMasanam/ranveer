import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Table } from 'antd';

const columns = [

  {
    title: 'Company Name',
    dataIndex: 'companyname',
  },
  {
    title: 'Departed Licensee',
    dataIndex: 'departedmembers',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'Departed Date',
    dataIndex: 'departeddate',
  },
];

const DepartedTable = ({licensesList}) => {
  const [departeMember, setDeparteMember] = useState([]);
  useEffect(() => {
    let departmember = [];
    if (Object.keys(licensesList).length > 0
      && licensesList.data.length > 0
    ) {
      licensesList.data.map((item, index) => {
        departmember.push({
          key: index + 1,
          departedmembers: item?.licence,
          companyname: item?.company_name,
          country: item?.country,
          departeddate: moment(item?.expiry_date).format('DD/MM/YYYY')
        })
      })
      setDeparteMember(departmember);
    }
  }, [licensesList])
  
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <div className="widget-content widget-content-area br-6">
        <h4 className="annualTitles">Departed Licensee</h4>
        <br /><br />
        <div className="table-responsive mb-4">
          <Table
            columns={columns}
            dataSource={departeMember}
            pagination={{ 
              defaultPageSize: 20, 
              showSizeChanger: true, 
              pageSizeOptions: ['20', '50', '100']
            }}
            locale={{ emptyText: (<span>No Departed Licensee </span>) }}
          />
        </div>
      </div>
    </div>
  )
}

export default DepartedTable