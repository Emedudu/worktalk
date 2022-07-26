import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { NotificationContext } from '../App';
import { getMessages, setMessage } from '../firbase';
import { getIPFSHash, getState } from '../_requests';
import { GrSend } from "react-icons/gr";
import Message from '../_components/atoms/Message';

function Organization(props) {
    const [notification,setNotification]=useContext(NotificationContext)
    const [details,setDetails]=useState({})
    const [text,setText]=useState('')
    const [allMessages,setAllMessages]=useState([])
    const [data,setData]=useState([])
    useEffect(()=>{
        getState(localStorage.getItem('token'),sessionStorage.getItem('org'))
            .then(res=>{
                setDetails(res.data)
                getMessages(res.data._id,setData)
                    .catch(err=>setNotification([...notification,'Error retrieving messages']))
            })
            .catch(err=>setNotification([...notification,'An Error Occurred']))
    },[])
    const sendMessage=(e)=>{
        e.preventDefault();
        setMessage(text,Date.now(),localStorage.getItem('userId'),details._id)
        setText('')
    }
    const formatMessage=async(rawMessagesArray)=>{
        // console.log(rawMessagesArray)
        const uidArray=rawMessagesArray.map((message)=> message[1].userId)
        try {
            const res=await getIPFSHash(localStorage.getItem('token'),uidArray)
            const ipfsHashArray=res.data.ipfsArray
            Promise.all(ipfsHashArray.map(async(ipfsHash)=>{
                const response=await fetch(`https://ipfs.infura.io/ipfs/${ipfsHash}`)
                const metadata=await response.json()
                return metadata
            }))
            .then((res)=>{
                setAllMessages(rawMessagesArray.map((rawMessage,i)=>{
                    return {
                        ...res[i],
                        ...rawMessage[1],
                        messageId:rawMessage[0]
                    }
                }))
            })
        } catch (error) {
            setNotification([...notification,"An error occurred"])
        }
    }
    // console.log(allMessages)
    data&&formatMessage(data)
    return (
        <div className='d-flex flex-column'>
            {allMessages.map((message)=>{
                return(
                    <Message
                    key={message.messageId}
                    senderImage={message.avatar} 
                    sender={message.nickName} 
                    message={message.text} 
                    time={message.timeStamp} 
                    count={1} 
                    isSender={message.userId==localStorage.getItem('userId')}
                    isOrg={false}
                    // id={org._id}
                    />
                )
            })

            }
            <div className="input-group mb-3 fixed-bottom col-8">
                <input 
                type="text" 
                className="form-control" 
                value={text}
                onChange={e=>setText(e.target.value)}
                placeholder="Recipient's username" 
                />
                <div className="input-group-append">
                    <button 
                    className="btn btn-outline-secondary" 
                    type="button"
                    onClick={sendMessage}
                    >
                        <GrSend/>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Organization;