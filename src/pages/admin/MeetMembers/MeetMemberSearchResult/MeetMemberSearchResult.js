import React, { useEffect, useState } from 'react'
import "assets/css/MemberSearch/MemberSearch.css"
import BoldHeading from 'components/BoldHeading/BoldHeading'
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/MemberSlice";
import Button from 'react-bootstrap/Button';
import 'react-quill/dist/quill.snow.css';
import { RotatingLines } from 'react-loader-spinner';
import { Table } from 'antd';

const columns = [
  {
    title: 'S.No',
    dataIndex: 'sr_no',
  },

  {
    title: 'Company Name',
    dataIndex: 'companyname',
  },
  {
    title: 'Licensee Name',
    dataIndex: 'membername',
  },
  {
    title: 'Country',
    dataIndex: 'country',
  },
  {
    title: 'City',
    dataIndex: 'city',
  },
  {
    title: 'Airport Code',
    dataIndex: 'airportcode',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Action',
    dataIndex: 'action',
  },
];

const MeetMemberSearchResult = ({ selectHandle }) => {
  const dispatch = useDispatch();
  const { isLoading, memberSearchResult } = useSelector(state => state.member);
  useEffect(() => {
    dispatch(setInitialState());
  }, []);

  const [companyData, setCompnayData] = useState([]);
  useEffect(() => {
    let member = []
    if (Object.keys(memberSearchResult).length > 0
      && memberSearchResult.data.length > 0) {
      memberSearchResult.data.map((item, index) => {
        member.push({
          key: index + 1,
          sr_no: index + 1,
          id: item.id,
          membername: `${item.first_name} ${item.last_name}`,
          companyname: item.company_name,
          country: item.country,
          city: item.city,
          airportcode: item.company_airport_code,
          status: <span className={`badge badge-${item.status === 0 ? 'danger' : 'info'}`}>
            {item.status === 0 ? 'Expired' : 'Active'}</span>,
          action: <Button type="button" variant="primary"
            onClick={() => selectHandle(item.id, `${item.first_name} ${item.last_name}`)}
            style={{ fontSize: "12px" }}>
            Schedule Meeting
          </Button>
        })
      })
    }
    setCompnayData(member);
  }, [memberSearchResult])

  return (
    <div className="widget-content widget-content-area">
      <div className="widget-header">
        <div className="row">
          <div className="col-xl-12 col-md-12 col-sm-12 col-12">
            <div className="widget-header">
              <BoldHeading
                Boldheading="Search Result"
              />
            </div>
          </div>
        </div>
      </div>
      <br />
      <div>
        {!isLoading ?
          <Table
            scroll={{
              x: 600,
            }}
            columns={columns}
            dataSource={companyData}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
            locale={{
              emptyText:
                (<div
                  className="css-dev-only-do-not-override-htwhyh ant-empty ant-empty-normal">
                  <div className="ant-empty-image">
                    <svg width="64" height="41" viewBox="0 0 64 41" xmlns="https://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                        <ellipse fill="#f5f5f5" cx="32" cy="33" rx="32" ry="7">
                        </ellipse><g fillRule="nonzero" stroke="#d9d9d9">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path><path d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z" fill="#fafafa">
                          </path>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="ant-empty-description">
                  Please Search & Select Licensees first
                  </div>
                </div>
                )
            }}
          />
          :
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

export default MeetMemberSearchResult