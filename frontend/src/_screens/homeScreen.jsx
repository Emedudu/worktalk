import React from 'react';
import { useEffect } from 'react';
import NewOrgPopup from '../_components/atoms/NewOrgPopup';
import AllOrganizations from '../_components/molecules/AllOrganizations';
import { getState } from '../_requests';

const HomeScreen=(props)=>{
    const {notification,userDetails,setUserDetails,setNotification}=props
    useEffect(()=>{
        getState(localStorage.getItem('token'))
			.then((res)=>{
				if(res.status===200){
					setUserDetails(res.data)
                    console.log(res.data)
				}else{
					setNotification([...notification,'Unable to retrieve data'])
				}
			})
            .catch((err)=>setNotification([...notification,'An error occurred']))
    },[])
    return (
        <div className='p-5'>
            <AllOrganizations organizations={userDetails.organizations}/>
            <NewOrgPopup notification={notification} setNotification={setNotification}/>
        </div>
    );
}

export default HomeScreen;