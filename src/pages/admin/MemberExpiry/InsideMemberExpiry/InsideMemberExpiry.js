import React, { useEffect, useState } from 'react'
import "assets/css/MemberExpiry/MemberExpiry.css"
import Cards from 'components/Cards/Cards'
import moment from 'moment';
import { Table } from 'antd';

const columns = [

  {
    title: 'Company Name',
    dataIndex: 'companyname',
  },
  {
    title: 'Licensee Expired',
    dataIndex: 'membersexpired',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'Expiry Date',
    dataIndex: 'expirydate',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];
const InsideMemberExpiry = ({ licensesList }) => {
  const para = `The list of companies whose licences have expired or that are nearing expiration are
  listed below. To ensure uninterrupted business operations and compliance, a
  reminder email will be sent 30 days before licence expiration, prompting them to
  renew their licence. Check this section regularly for updates on upcoming
  expirations.`;
  const [expiryMember, setExpiryMember] = useState([]);
  useEffect(() => {
    let exmember = [];
    if (Object.keys(licensesList).length > 0
      && licensesList.data.length > 0
    ) {
      licensesList.data.map((item, index) => {
        exmember.push({
          key: index + 1,
          membersexpired: item?.licence,
          companyname: item?.company_name,
          country: item?.country,
          expirydate: moment(item?.expiry_date).format('DD/MM/YYYY'),
          status: "Expired"
        })
      })
      setExpiryMember(exmember);
    }
  }, [licensesList]);
  return (
    <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
      <Cards
        heading="Licensee Expiry"
        Para={para}
      />
      <div className="widget-content widget-content-area br-6" style={{ marginTop: "25px" }}>
        <h4 className="annualTitles">
          Licensee Expiry
        </h4>
        <br />      
        <div className='w-100'>
          <Table
            scroll={{
              x: 600,
            }}
            columns={columns}
            dataSource={expiryMember}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
            locale={{ emptyText: (<span>No Licensee Expired</span>) }}
          />
        </div>
      </div>
    </div>
  )
}

export default InsideMemberExpiry