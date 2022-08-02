import React, { useState } from "react";
import { useContext } from "react";
import { Button, Col, Row, Toast, ToastContainer } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { NotificationContext } from "../../App";

// function Popup() {
//     const [notification,setNotification]=useContext(NotificationContext)
//     return (
//         <div className='position-fixed p-3 w-25 top-50 end-0 bg-glassy rounded'>
//             <div className='d-flex flex-row align-items-center '>
//                 <div
//                 className="close-icon cursor-pointer"
//                 onClick={()=>
//                     setNotification(notification.filter(
//                         (info)=>info!=notification[0]
//                         ))
//                     }
//                 >
//                     <AiOutlineCloseCircle size='30px'/>
//                 </div>
//                 <div className='p-2'>
//                     {notification[0]}
//                 </div>

//             </div>
//         </div>
//     );
// }
function Popup() {
  const [notification, setNotification] = useContext(NotificationContext);
  const [showA, setShowA] = useState(true);

  const toggleShowA = () => {
    setNotification(notification.filter((info) => info != notification[0]));
    setShowA(!showA);
  };

  return (
    <ToastContainer className="p-3" position="bottom-end">
      <Toast show={showA} onClose={toggleShowA}>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{notification[0]}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default Popup;
