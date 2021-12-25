import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.js';
import BossLogin from './_screens/bossLogin.js';
import WorkerLogin from './_screens/workerLogin.js';
import SuccessLogin from './_screens/successLogin';
import WorkerSuccessLogin from './_screens/workerSuccessLogin';

function App() {
	
	return (
	  	<Router>
		    <div className="App">
			    <Routes>
				    <Route path = "/" exact element = { <HomeScreen /> } />
				    <Route path = "/bossLogin" exact element = { <BossLogin /> } />
				    <Route path = "/workerLogin" exact element = { <WorkerLogin/> } />
				    <Route path = "/successLogin" exact element = { <SuccessLogin /> } />
				    <Route path = "/workerSuccessLogin" exact element = { <WorkerSuccessLogin /> } />

				</Routes>
			</div>
		</Router>
	);
}

export default App;
