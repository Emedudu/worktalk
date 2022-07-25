import React from 'react';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Message(props) {
    const {
        senderImage,
        sender,
        message,
        time,
        count,
        id,
        isOrg,
    }=props
    const navigate=useNavigate()
    const trimText=(text)=>{
        text=text.length>35?`${text.substring(0,32)}...`:text
        return text
    }
    const handleRouteChange=(e)=>{
        if(isOrg){
            sessionStorage.setItem('org',id)
            navigate(`/organization`)
        }else{
            // navigate to message
        }
    }
    return (
        <div onClick={handleRouteChange} className='position-relative my-2 col-12 col-sm-8 col-lg-6 d-flex align-items-center cursor-pointer message-height '>
            <div className='ml-1 rounded-circle d-flex justify-content-center align-items-center icon-size'>
                {senderImage?
                    <img src={senderImage} height='30px' width='30px'/>:
                    <FaUser size={30} color='grey' />
                }
            </div>
            <span className='position-absolute top-0 left'><b>{sender}</b></span>
            <span className='position-absolute bottom-0 left'>{trimText(message)}</span>
            <span>{time}</span>
            <span>{count}</span>
        </div>
    );
}

export default Message;