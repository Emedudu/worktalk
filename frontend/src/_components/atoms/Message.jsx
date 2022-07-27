import React from 'react';
import { FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';

function Message(props) {
    const {
        senderImage,
        sender,
        message,
        time,
        isSender,
        id,
        isOrg,
    }=props
    const navigate=useNavigate()
    const trimText=(text)=>{
        // text=text.length>35?`${text.substring(0,32)}...`:text
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
        <div onClick={handleRouteChange} className={`my-2 d-flex justify-content-${isSender ? "end" : "start"} cursor-pointer message-height`}>
            <div 
            className={`bg-${
                isSender ? "white" : "secondary"
              } rounded-3 p-2 w-50`}
            >
                <div className='position-relative'>
                    <div className='ml-1 rounded-circle d-flex justify-content-center align-items-center icon-size'>
                        {senderImage?
                            <img src={senderImage} height='30px' className='rounded-circle' width='30px'/>:
                            <FaUser size={30} color='grey' />
                        }
                    </div>
                    <span className='position-absolute top-0 left'><b>{sender}</b></span>
                    <span className='position-absolute bottom-0 left'>{trimText(message)}</span>
                    <span className='position-absolute bottom-0 end-0'>{`${new Date(time).getHours()}:${new Date(time).getMinutes()}`}</span>
                </div>
            </div>
        </div>
    );
}

export default Message;