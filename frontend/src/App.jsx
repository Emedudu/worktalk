import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './_screens/homeScreen.jsx';
import BossLogin from './_screens/bossLogin.jsx';
import WorkerLogin from './_screens/workerLogin.jsx';
import CreateAccountWorker from './_screens/createAccountWorker.jsx';
import CreateAccountBoss from './_screens/createAccountBoss.jsx';
import MainScreenWorker from './_screens/mainScreenWorker';
import MainScreenBoss from './_screens/mainScreenBoss';


function App() {
	return (
		<div className="App">
			<Routes>
				<Route path = "/" exact element = { <HomeScreen /> } />
				<Route path = "/bossLogin" exact element = { <BossLogin/> } />
				<Route path = "/workerLogin" exact element = { <WorkerLogin/> } />
				<Route path = "/createAccountWorker" exact element = { <CreateAccountWorker /> }/>
				<Route path = "createAccountBoss" exact element = { <CreateAccountBoss /> } />
				<Route path = "mainScreenWorker" exact element = { <MainScreenWorker/>}/>
				<Route path = "mainScreenBoss" exact element = { <MainScreenBoss/>}/>
			</Routes>
		</div>
		
	);
}

export default App;
