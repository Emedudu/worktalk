import React, { useState } from 'react';

const HomeScreen = () => {
	const [isLogin,setIsLogin]=useState()
	return(
		<div>{isLogin?(
			<div>
				<input
				placeholder='Enter e-mail'/>
				<button>Login as Boss</button>
				<button>Login as Worker</button>
				<button onClick={(e)=>{setIsLogin(false)}}>Sign Up</button>
			</div>
			):(
			<div>
				<input
				placeholder='Enter e-mail'/>
				<button>Sign Up as Boss</button>
				<button>Sign Up as Worker</button>
				<button onClick={(e)=>{setIsLogin(true)}}>Login</button>
			</div>
			)
		}
		</div>
    );
}
export default HomeScreen;