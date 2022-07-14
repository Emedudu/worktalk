import React from 'react';
import { FaUser } from 'react-icons/fa'

function Message(props) {
    const {senderImage,sender,message,time,count}=props
    return (
        <div className='position-relative message-height '>
            <div className='rounded-circle bg-primary d-inline-block icon-size'>
                {senderImage?
                    <img className='rounded-circle' src={senderImage}/>:
                    <FaUser size={30} color='grey' />
                }
            </div>
            <span>{sender}</span>
            <span>{message}</span>
            <span>{time}</span>
            <span>{count}</span>
        </div>
    );
}

export default Message;