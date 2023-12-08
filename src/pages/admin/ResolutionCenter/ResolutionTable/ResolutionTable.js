import React, { useState, useEffect } from 'react'
import "assets/css/InstantQuote/InstantQuote.css"
import moment from 'moment';
import Modal from 'react-bootstrap/Modal';
import Chats from '../Chats/Chats';
import { useDispatch } from "react-redux";
import { setInitialMessage } from "redux/Reducers/ResolutionCenterSlice";
import { Select } from 'antd';
import { Table } from 'antd';

const ResolutionTable = ({ data, setSC }) => {

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [caseId, setCaseId] = useState(false);
  const [id, setID] = useState(false);

  const handleClose = () => {
    dispatch(setInitialMessage());
    setShow(false);
    setCaseId(false);
    setID(false);
  }
  const handleOnClick = (CTID, CASEID) => {
    setID(CTID);
    setCaseId(CASEID);
    setShow(true);
  }
  const options = [
    {
      value: 'Open',
      label: 'Open',
    },
    {
      value: 'Resolved',
      label: 'Resolved',
    }
  ]
  const [resolutionCenter, setResolutionCenter] = useState([]);

  useEffect(() => {
    let quoteData = [];
    if (Object.keys(data).length > 0
      && data.data.length) {
      data.data.map((item, index) => {
        quoteData.push({
          key: index + 1,
          CaseId: item?.invoice_number,
          CompanyName: item?.company_name,
          // LicenseeName: item?.member_name,
          IssueAgainst: item?.issue_against,
          InvoiceAmount: item?.invoice_amount,
          IssueDate: item?.issue_date,
          DueDate: item?.due_date,
          CreatedDate: moment(item?.created_at).format('DD/MM/YYYY'),
          Status:
            <span className={`badge badge-${item?.status === 0 ? 'danger' : 'info'}`}>
              {item?.status === 0 ? 'Open' : 'Resolved'}
            </span>,
          action: { title: "View Conversation", id: item.id }

          // date: moment(item?.created_on).format('DD/MM/YYYY'),
          // subject: item?.subject.slice(0, 50),
          // status: item?.status === 1 ? "Sent" : "Not Sent",
          // action: { title: "View Conversation", id: item.id }
        })
      })
      setResolutionCenter(quoteData);
    }
  }, [data])

  const columns = [
    {
      title: 'Case Id',
      dataIndex: 'CaseId',
      width: 100,
    },
    {
      title: 'Company Name',
      dataIndex: 'CompanyName',
      width: 250,
    },
    // {
    //   title: 'Licensee Name',
    //   dataIndex: 'LicenseeName',
    // },
    {
      title: 'Issue Against',
      dataIndex: 'IssueAgainst',
      width: 250,
    },
    {
      title: 'Invoice Amount',
      dataIndex: 'InvoiceAmount',
      width: 150,
    },
    {
      title: 'Issue Date',
      dataIndex: 'IssueDate',
      width: 150,

    },
    {
      title: 'Due Date',
      dataIndex: 'DueDate',
      width: 150,

    },
    {
      title: 'Created Date',
      dataIndex: 'CreatedDate',
      width: 150,

    },
    {
      title: 'Status',
      dataIndex: 'Status',
      width: 100,
    },
    {
      title: 'View Conversation',
      dataIndex: 'action',
      // fixed: 'right',
      width: 150,
      render: (item) => {
        return (
          <>
            <button type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleOnClick(item?.id, item)}>
              Click Here
            </button>
          </>)
      }
    },
  ];

  let locale = {
    emptyText: ( 
      <span style={{ fontSize: "14px" }}>
        Resolution Center History
      </span>
    )
  };




  return (
    <div className="col-lg-12 layout-spacing">
      <div className="statbox widget box">
        <div className="widget-header">
          <div className="col-12 d-flex flex-md-row flex-row mb-4">
            <div className="col-md-6 col-6">
              <h4 style={{ fontSize: "20px", color: "#3b3f5c", fontWeight: "600", padding: "12px" }}>History</h4>
            </div>
            <div className='col-6 col-md-6 d-flex justify-content-end  contact-options'>
              <div className='col-12 col-md-6 d-flex justify-content-end '>
                <Select
                  allowClear
                  showSearch
                  style={{ width: "100%", marginTop: "12px" }}
                  placeholder={'Search Status'}
                  optionFilterProp={'children'}
                  options={options}
                  onChange={(value) => {
                    setSC(value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>        
        <div>
          <Table
            scroll={{
              x: 1500,
            }}
            locale={locale}
            columns={columns}
            dataSource={resolutionCenter}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
          />
        </div>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-100w">
          <Chats
            caseId={caseId}
            id={id}
            setShow={setShow}
          />
        </Modal>
      </div>
    </div>


  )
}

export default ResolutionTable