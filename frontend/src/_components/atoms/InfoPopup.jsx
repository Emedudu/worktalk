import React from 'react';
import { useContext } from 'react';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { NotificationContext } from '../../App';

function Popup() {
    const [notification,setNotification]=useContext(NotificationContext)
    return (
        <div className='position-fixed p-3 w-25 top-50 end-0 bg-glassy rounded'>
            <div className='d-flex flex-row align-items-center '>
                <div
                className="close-icon cursor-pointer" 
                onClick={()=>
                    setNotification(notification.filter(
                        (info)=>info!=notification[0]
                        ))
                    }
                >
                    <AiOutlineCloseCircle size='30px'/>
                </div>
                <div className='p-2'>
                    {notification[0]}
                </div>

            </div>
        </div>
    );
}

export default Popup;