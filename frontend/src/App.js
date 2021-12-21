import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.js';
import BossLogin from './_screens/bossLogin.js';
import WorkerLogin from './_screens/workerLogin.js';
import SuccessLogin from './_screens/successLogin'

function App() {
	const [isLogin, setIsLogin] = useState(false)
	useEffect(()=>{
		console.log(isLogin)
	}, [isLogin])
	return (
	  	<Router>
		    <div className="App">
			    <Routes>
				    <Route path = "/" exact element = { <HomeScreen /> } />
				    <Route path = "/bossLogin" exact element = { <BossLogin isLogin = {isLogin} setIsLogin={setIsLogin}/> } />
				    <Route path = "/workerLogin" exact element = { <WorkerLogin/> } />
				    <Route path = "/successLogin" exact element = { isLogin ? <SuccessLogin /> : <Navigate to = '/' /> } />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
