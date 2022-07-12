import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.jsx';
import Login from './_screens/Login';
import Register from './_screens/Register';

const App=()=>{
	useEffect(()=>{
		// axios.get('/').then((res)=>setShouldLogin(res.status))
	})
	return (
		<div className="App">
				<Routes>
					<Route path = "/" exact element = { <Login/> } />
					<Route path = "/register" exact element = { <Register/> } />
					<Route path = "/home" exact element = { <HomeScreen/> } />
				</Routes>
		</div>
		
	);
}

export default App;
