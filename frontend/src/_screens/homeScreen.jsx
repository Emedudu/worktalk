import React from 'react';
import { useEffect } from 'react';
import AllOrganizations from '../_components/molecules/AllOrganizations';
import { getState } from '../_requests';

const HomeScreen=(props)=>{
    const {userDetails,setUserDetails,setNotification}=props
    useEffect(()=>{
        getState(localStorage.getItem('token'))
			.then((res)=>{
				if(res.status===200){
					setUserDetails(res.data)
                    console.log(res.data)
				}else{
					setNotification('Unable to retrieve data')
				}
			})
    },[])
    return (
        <div>
            <AllOrganizations organizations={userDetails.organizations}/>
        </div>
    );
}

export default HomeScreen;