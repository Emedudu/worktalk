import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, useHistory, Route, Navigate } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.js';
import BossLogin from './_screens/bossLogin.js';
import WorkerLogin from './_screens/workerLogin.js';
import SuccessLogin from './_screens/successLogin';

const isLogin = true;
function App() {
	return (
	  	<Router>
		    <div className="App">
			    <Routes>
				    <Route path = "/" exact element = { <HomeScreen /> } />
				    <Route path = "/bossLogin" exact element = { <BossLogin /> } />
				    <Route path = "/workerLogin" exact element = { <WorkerLogin/> } />
				    <Route path = "/successLogin" exact element = { isLogin ? <SuccessLogin /> : <Navigate to = '/' /> } />
				</Routes>
			</div>
		</Router>
	);
}

export default App;
