import React, { useEffect, useState } from 'react'
import "assets/css/Documents/Documents.css";
import { saveAs } from "file-saver";
import moment from 'moment'

const How_to = ({ documentsList }) => {
  const downloadFile = (url) => {
    (async () => {
      saveAs(url, "doc-file");
    })();
  }
  const [howTo, setHowTo] = useState([]);
  const [document, setDocument] = useState([]);
  useEffect(() => {
    let howto = [];
    let doc = [];
    if (Object.keys(documentsList).length > 0
      && documentsList.data.length > 0) {
      documentsList.data.map(item => {
        if (item.type === 'for_how_to') {
          howto.push(item);
        }
        if (item.type === 'for_members') {
          doc.push(item);
        }
      })
    }
    setHowTo(howto)
    setDocument(doc)
  }, [documentsList]);

  return (
    <div className="col-lg-12 layout-spacing">
      <div className="statbox widget box box-shadow">
        <div className="widget-header">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              <h5>Files</h5><br />
            </div>
          </div>
        </div>
        <div className="list-group">
          {howTo.length > 0 ? howTo.map((item, index) => {
            return (
              <div className="list-group-item list-group-item-action" key={`how${index}`}>
                <div className="d-flex w-100 justify-content-between" style={{ cursor: 'pointer' }}>
                  <h5 className="mb-1" onClick={() => downloadFile(item.document_file_url)}>
                    {item?.title}
                  </h5>
                  <a
                    href={item.document_file_url}
                    download="Example-PDF-document"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="d-flex col-12 justify-content-center btn btn-sm btn-primary text-white">
                      <div>Download Files</div>
                    </div>
                  </a>
                </div>
                <p className="mb-1">
                  {item?.subtitle}
                  {/* Author: {item?.author} */}
                </p>
                <p className="mb-1" style={{ fontSize: "11px" }}>
                  Date : {moment(item.created_at).format('YYYY-MM-DD')}
                </p>
              </div>
            )
          })
            : <div className="list-group-item list-group-item-action">No Document Found.</div>
          }
        </div>
      </div>
      <div className="statbox widget box box-shadow" style={{ marginTop: "25px" }}>
        <div className="widget-header">
          <div className="row">
            <div className="col-xl-12 col-md-12 col-sm-12 col-12">
              <h5>Licensee Document</h5><br />
            </div>
          </div>
        </div>
        <div className="list-group">
          {document.length > 0 ? document.map((item, index) => {
            return (
              <div className="list-group-item list-group-item-action" key={`how${index}`}>
                <div className="d-flex w-100 justify-content-between" style={{ cursor: 'pointer' }}>
                  <h5 className="mb-1" onClick={() => downloadFile(item.document_file_url)}>
                    {item?.title}
                  </h5>
                </div>
                <p className="mb-1">
                  Author: {item?.author}
                </p>
              </div>
            )
          })
            : <div className="list-group-item list-group-item-action">No Document Found.</div>
          }
        </div>
      </div>
    </div>
  )
}

export default How_to