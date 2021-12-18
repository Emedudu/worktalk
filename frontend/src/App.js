import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './_screens/HomeScreen.js';
import BossLogin from './_screens/bossLogin.js';
import WorkerLogin from './_screens/workerLogin.js';

function App() {
  return (
  	<Router>
	    <div className="App">
		    <Routes>
			    <Route path = "/" exact element = { <HomeScreen/> } />
			    <Route path = "/bossLogin" exact element = { <BossLogin/> } />
			    <Route path = "/workerLogin" exact element = { <WorkerLogin/> } />
			</Routes>
		</div>
	</Router>
  );
}

export default App;
