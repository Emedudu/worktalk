import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import HomeScreen from './_screens/HomeScreen.js';
import BossLogin from './_screens/bossLogin.js';
import WorkerLogin from './_screens/workerLogin.js';
import SuccessLogin from './_screens/successLogin'

export const history = createBrowserHistory();

function App() {
	let isLogin
	const loginInfo = localStorage.getItem(isLogin)
	loginInfo ? isLogin = loginInfo : localStorage.setItem(isLogin,false)
	return (
	  	<Router history = {history}>
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
