import React, { useState, useEffect, useRef } from 'react'
import "assets/css/ResolutionCenter/Chats.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialState
} from "redux/Reducers/ResolutionCenterSlice";
import {
  getResolutionCentreMessages,
  replyResolutionCentreMessages
} from 'redux/Actions/ResolutionCenter';
import { AiFillCloseCircle, AiOutlineFileImage } from "react-icons/ai"
import attach from "assets/img/attach.png"
import moment from 'moment';
import { FiPaperclip } from "react-icons/fi"
import { MdOutlineCancel } from "react-icons/md"

const Chats = ({ caseId, id, setShow }) => {
  const [file, setFile] = useState(false);
  const [isBlank, setIsBlank] = useState(false);
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const { isSuccess, messages } = useSelector(state => state.resolutioncenter);
  const [value, setValue] = useState('');
  const [chatMessage, setChatMessage] = useState([]);
  useEffect(() => {
    let ST = [];
    if (Object.keys(messages).length > 0
      && Object.keys(messages.data).length > 0
      && typeof messages.data.messages !== 'undefined'
      && messages.data.messages.length > 0) {
      for (let index = messages.data.messages.length - 1; index >= 0; index--) {
        ST.push(messages.data.messages[index]);
      }
    }
    setChatMessage(ST);
  }, [messages])

  useEffect(() => {
    if (id) {
      dispatch(getResolutionCentreMessages({ center_id: id }));
    }
  }, [id])
  useEffect(() => {
    if (isSuccess) {
      inputFile.current.value = null;
      setValue('')
      setFile(false)
      dispatch(getResolutionCentreMessages({ center_id: id }));
      dispatch(setInitialState());
    }
  }, [isSuccess])

  const submitReply = () => {

    var formdata = new FormData();
    formdata.append("center_id", id);
    if (!value || value === '') {
      setIsBlank(true);
      return false;
    } else {
      formdata.append("reply", value);
      setIsBlank(false);
    }

    if (file) {
      formdata.append("attachment", file);
    }
    dispatch(replyResolutionCentreMessages(formdata))
  }
  const handleChange = e => {
    setFile(e.target.files[0]);
  }
  // console.log('caseId',caseId);
  // useEffect(() => {
  //   if (caseId && caseId?.files) {
  //     images = caseId?.files.split(',');
  //   }
  // },[caseId])
  return (
    <>
      <div className="chat_window">
        <div className="top_menu">
          <div className='d-flex justify-content-end col-12' onClick={() => setShow(false)}>
            <AiFillCloseCircle style={{ fontSize: "22px", marginRight: "5px" }} className='closeIcon' />
          </div>
          <div className="buttons">
            <div className="button close"></div>
            <div className="button minimize"></div>
            <div className="button maximize"></div>
          </div>
          <div className="title">Case ID</div>
          <div className="title">{caseId?.invoice_number}</div>
        </div>
        <ul className="messages">
          {chatMessage.length > 0
            && chatMessage.map((item, index) => {
              return (
                <li className={`message ${item.msg_from_admin === 1 ? 'left' : 'right'} appeared`}
                  key={`ms${index}`}>
                  {
                    (() => {
                      if (index === 0 && caseId && caseId?.files) {
                        const files = caseId?.files.split(',');
                        if (files.length > 0) {
                          return (files.map((item, index) => {
                            return (
                              <div className="text_wrapper" style={{ cursor: "pointer" }}>
                                <a key={`svi${index}`} target='_blank' href={item}>
                                  <img src={attach} width="20px" style={{ height: "20px" }} /> Attachment
                                </a>
                              </div>
                            );
                          }))
                        }
                      }
                    })()
                  }
                  {item?.attachment_url && item?.attachment_url !== '' &&
                    <div className="text_wrapper" style={{ cursor: "pointer" }}>
                      <a target={'_blank'} href={item.attachment_url}>
                        <img src={attach} width="20px" style={{ height: "20px" }} /> Attachment
                      </a>
                    </div>
                  }
                  <div className="text_wrapper">
                    <div className="text">
                      <span dangerouslySetInnerHTML={{ __html: item.message }} ></span>
                    </div>
                    <div className='col-12 d-flex justify-content-end' style={{ fontSize: "10px" }}>
                      Posted on {moment(item.created_at).format('DD/MM/YYYY hh:mm:ss')} </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <div className="d-flex flex-row bottom_wrapper clearfix d-flex gap-2">
          <div className="message_input_wrapper">
            <input className="message_input"
              value={value}
              onChange={(e) => {
                setValue(e.target.value)
              }}
              placeholder="Type your message here..." />
          </div>
          {isBlank && <span className="error d-block">Message should not be empty</span>}
          {file &&
            <div className='preview'>
              <AiOutlineFileImage style={{ width: "30px", height: "100%" }} />
              <div className='cancelBtn'>
                <span onClick={() => { setFile(false) }}><MdOutlineCancel /></span>
              </div>
              <div className='col-2 file-name'>{file.name}</div>
            </div>
          }
          <div className='attach px-2' onClick={() => inputFile.current.click()}>
            <FiPaperclip
              style={{ fontSize: "20px", marginTop: "12px" }}
              className='attachIcon'
            >
              <img src={attach} width="20" />
            </FiPaperclip >
            <input
              className='fileInput'
              type="file"
              ref={inputFile}
              onChange={handleChange}
            />
          </div>
          <div className="send_message" onClick={() => submitReply()}>
            <div className="icon"></div>
            <div className="text">Send</div>
          </div>
        </div>
      </div>
      <div className="message_template">
        <li className="message">
          <div className="text_wrapper">
            <div className="text"></div>
          </div>
        </li>
      </div>
    </>
  )
}

export default Chats