import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.jsx';
import Login from './_screens/Login';
import Register from './_screens/Register';
import MessageScreen from './_screens/MessageScreen';
import ChatRoom from './_screens/ChatRoom';
import Organization from './_screens/Organization';
import Navigation from './_components/atoms/Navigation';
import SideBar from './_components/molecules/SideBar';
import InfoPopup from './_components/atoms/InfoPopup';
import { getState } from './_requests';

const App=()=>{
	const [notification,setNotification]=useState([])
	const [sideBar,setSideBar]=useState(false)
	const [isSignedIn,setIsSignedIn]=useState(false)
	const [userDetails,setUserDetails]=useState({})
	useEffect(()=>{
		
	})
	const popupFadeout=()=>{
		setNotification(notification.filter(
			(info)=>info!=notification[0]
			))
	}
	notification.length&&setTimeout(
		popupFadeout,notification[0].length*100)
	
	return (
		<div className="App">
			<Navigation 
			sideBar={sideBar} 
			setSideBar={setSideBar} 
			isSignedIn={isSignedIn}
			setIsSignedIn={setIsSignedIn}
			/>
			<Routes>
				<Route path = "/" exact element = { <Login 
													setIsSignedIn={setIsSignedIn} 
													notification={notification} 
													setNotification={setNotification} 
													/> } />
				<Route path = "/register" exact element = { <Register 
															setIsSignedIn={setIsSignedIn} 
															notification={notification} 
															setNotification={setNotification} 
															/> } />
				<Route path = "/home" exact element = { <HomeScreen 
														userDetails={userDetails} 
														setUserDetails={setUserDetails} 
														notification={notification} 
														setNotification={setNotification}
														/> } />
				<Route path = "/messages" exact element = { <MessageScreen/> } />
				<Route path = "/organization" exact element = { <Organization/> } />
				<Route path = "/chatRoom" exact element = { <ChatRoom/> } />
			</Routes>
			{isSignedIn&&sideBar&&<SideBar/>}
			{notification.length&&<InfoPopup notification={notification} setNotification={setNotification}/>}
		</div>
		
	);
}

export default App;
