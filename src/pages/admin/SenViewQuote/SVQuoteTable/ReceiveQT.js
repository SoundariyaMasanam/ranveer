import React, { useRef, useEffect, useState } from 'react'
import "assets/css/InstantQuote/InstantQuote.css";
import moment from 'moment';
import { Table } from 'antd';
import Modal from 'react-bootstrap/Modal';
import Details from './Details';
import { useParams } from 'react-router-dom';
import ReceivedDetails from './ReceivedDetails';
import BoldHeading from 'components/BoldHeading/BoldHeading';

const ReceiveQT = ({ quoteList }) => {
  const [quotes, setQuotes] = useState([]);
  const scrollRef = useRef(null);
  let { stype } = useParams();
  useEffect(() => {
    if (stype === 'r') {
      scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [stype])

  useEffect(() => {
    let quoteData = [];
    if (Object.keys(quoteList).length > 0
      && quoteList.data.length) {
      quoteList.data.map((item, index) => {
        quoteData.push({
          key: index + 1,
          from: item?.from,
          companyname: item?.to_company,
          date: moment(item.created_on).format('DD/MM/YYYY'),
          subject: item?.subject.slice(0, 30),
          status: item.status === 1 ? "Received" : "Not Received",
          action: { title: "View Details", id: item.id }
        })
      })
      setQuotes(quoteData);
    }
  }, [quoteList])


  const [show, setShow] = useState(false);
  const [viewData, setviewData] = useState(false);
  const handleOnClick = (ID) => {
    const data = quoteList.data.find(item => item.id === ID);
    setviewData(data);
    setShow(true);
  }
  const handleClose = () => {
    setviewData(false)
    setShow(false);
  }

  const columns = [
    {
      title: 'From',
      dataIndex: 'from',
    },
    {
      title: 'Company',
      dataIndex: 'companyname',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (item) => {
        return (
          <>
            <button type="button"
              className="btn btn-outline-secondary"
              onClick={() => handleOnClick(item?.id)}>
              {item.title}
            </button>
          </>)
      }
    },
  ];
  let locale = {
    emptyText: (
      <span style={{ fontSize: "14px" }}>
        Send / View Quote
      </span>
    )
  };

  return (
    <div className="col-lg-12 layout-spacing" >
      <div className="statbox widget box">
        <div className="widget-header">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              <div className="widget-header">
                <BoldHeading
                  Boldheading="Received Quotes"
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div ref={scrollRef}>
          <Table
            scroll={{
              x: 600,
            }}
            locale={locale}
            columns={columns}
            dataSource={quotes}
            pagination={{
              defaultPageSize: 20,
              showSizeChanger: true,
              pageSizeOptions: ['20', '50', '100']
            }}
          />
        </div>
        <Modal show={show} onHide={handleClose} dialogClassName="modal-100w">
          <ReceivedDetails
            title={"Received Quotes"}
            viewData={viewData}
          />
        </Modal>
      </div>
    </div>
  )
}

export default ReceiveQT