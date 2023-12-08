import React, { useEffect, useState } from 'react'
import PastSubmission from './PastSubmission/PastSubmission';
import { useDispatch, useSelector } from 'react-redux';
import { setInitialState } from "redux/Reducers/MonthlyReportSlice"
import {
  monthlyReportUploade,
  getMonthlyReport,
  getTemplateDownload
} from "redux/Actions/MonthlyReport"
import moment from 'moment';
import { saveAs } from "file-saver";
import { ToastContainer, toast } from 'react-toastify';

const MonthlyReports = () => {
  const para = <>
    Submit the monthly reports at your convenience before the deadline. It is the most
    convenient way to share all your reports at once with TALA management. This
    simplified system eliminates the need for mailing and saves you time and helps to
    centralise all your records in one place and track the submission status month after
    month.<br />Any member of the team can access and view the reports uploaded by fellow team
    members.<br />You can track the history of the reports and review your monthly performance under
    one roof. You can compare your past performances and devise a plan to attain your
    goals.
  </>

  const dispatch = useDispatch();
  useEffect(() => {    
    dispatch(getTemplateDownload());
    dispatch(getMonthlyReport());
    window.scrollTo(0, 0);
  }, [])
  const {
    isSuccess,
    error,
    isTemplate,
    monthlyReportList
  } = useSelector(state => state.monthlyReport);

  const [isFile, setIsFile] = useState(false);
  const [isFileBlank, setIsFileBlank] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      if (Object.keys(isSuccess).length > 0
        && typeof isSuccess.msg !== 'undefined') {
        toast.success(`${isSuccess.msg}`, {
          toastId: 'success',
          autoClose: 1000
        })
      }
      dispatch(setInitialState(false));
      setReportUpload(false);
    }
  }, [isSuccess])

  const onSubmit = async () => {
    if (!isFile) {
      setIsFileBlank(true);
      return false;
    } else {
      setIsFileBlank(false);
    }
    var formdata = new FormData();
    formdata.append("file", isFile);
    dispatch(monthlyReportUploade(formdata))
  }
  const handleChange = (e) => {
    setIsFile(e.target?.files[0]);
    setIsFileBlank(false);
  }

  const CURRENTDATE = new Date(moment(new Date()).format('MM/DD/YYYY'));
  const CURRENTDATA = CURRENTDATE.getDate();
  const [reportUpload, setReportUpload] = useState(true);

  const [datePased, setDatePased] = useState(false);
  const [lastFile, setLastFile] = useState(false);

  const downloadFile = (url) => {
    (async () => {
      saveAs(url, "doc-file");
    })();
  }

  useEffect(() => {
    if (Object?.keys(isTemplate)?.length > 0
      && isTemplate?.data?.length > 0) {
      setLastFile(isTemplate?.data[0]);
    }
  }, [isTemplate])

  useEffect(() => {
    
    if (CURRENTDATA === 28
      || CURRENTDATA === 29
      || CURRENTDATA === 30
      || CURRENTDATA === 31
      || CURRENTDATA === 1
      || CURRENTDATA === 2
      || CURRENTDATA === 3
      || CURRENTDATA === 4
      || CURRENTDATA === 5
      ) {

      if (Object?.keys(monthlyReportList)?.length > 0
        && monthlyReportList?.data?.length === 0) {
        setReportUpload(true);
      } else {
        if (Object.keys(monthlyReportList)?.length > 0
          && monthlyReportList?.data?.length > 0) {
          const lastUploade = monthlyReportList?.data[monthlyReportList?.data?.length - 1];
          const createdDate = new Date(moment(lastUploade.created_at).format('MM/DD/YYYY'));
          var Difference_In_Time = CURRENTDATE.getTime() - createdDate.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          if (Difference_In_Days > 10) {
            setReportUpload(true);
          } else {
            setReportUpload(false);
          }
        }
      }
    }else {
      setReportUpload(false);
    }
  }, []);

  return (
    <div className="layout-px-spacing">
      <div className="row layout-spacing pt-4">
        <div className='col-xl-12 col-lg-4 col-md-12 col-12 col-sm-12 mb-4'>
          <div className="profile-info">
            <div className="row">
              <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                <h5 className='annualTitles'>
                  My Monthly Report
                </h5>
                <br />
              </div>
            </div>
            <p style={{ textAlign: "justify" }} className='announcePara'>
              {para}
            </p>
            <div className="widget-footer">
              <br />
              {lastFile ?
                <button type="button" className="btn readmorebtn text-white mr-2"
                  onClick={() => downloadFile(lastFile)}
                >Download Template</button>
                :
                <button type="button" className="btn readmorebtn text-white mr-2">Download Template</button>
              }
            </div>
          </div>
          <br />
          <div className="widget-content widget-content-area">
            <div className="widget-header">
              <div className="row">
                <div className="col-xl-12 col-md-12 col-sm-12 col-12">
                  <h4 className='annualTitles'>Monthly Report</h4>
                  <br />
                </div>
              </div>
            </div>

            <div className="w-100">
             
              {datePased && <span className="error d-block">
                Option should be open once a month from 28th - 5th. Once submitted cannot reupload it again for the month</span>}
              <div className="form-group row">
                <div className="col-lg-12">
                  <label>Upload  File (XSLX Format)</label>
                  <div className="input-group mt-2">
                    <input type="file" className="form-control"
                      onChange={(e) => handleChange(e)} />
                  </div>
                  {Object?.keys(error)?.length > 0 &&
                    Object?.keys(error?.error)?.length > 0 &&
                    error?.error?.file?.length > 0 &&
                    <span className="error d-block">{error?.error?.file[0]}</span>
                  }
                  {Object?.keys(error)?.length > 0 &&
                    Object?.keys(error?.error)?.length > 0 &&
                    error?.error?.others?.length > 0 &&
                    <span className="error d-block">{error?.error?.others}</span>
                  }
                  {isFileBlank && <span className="error d-block">File should not be empty</span>}
                </div>
              </div>
            </div>
            <div className="widget-footer text-right">
              {reportUpload ?
                <button type="button"
                  className={`btn readmorebtn text-white mr-2 yes`}
                  onClick={() => onSubmit()}>
                  Submit
                </button>
                :
                <button type="button"
                  className={`btn readmorebtn text-white mr-2`}
                  onClick={() => setDatePased(true)}>
                  Submit
                </button>}
            </div>
            <br />
            <p style={{ color: "red" }}> *Please Note: You can submit your content only once a month, from the 28th to the 5th. Once submitted, no further uploads are allowed until the next month.</p>
          </div>
          <br />
          <PastSubmission monthlyReportList={monthlyReportList} />
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default MonthlyReports