import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { getState } from '../../_requests';
import Message from '../atoms/Message';

function AllOrganizations(props) {
    const {organizations}=props
    const [organizationDetails,setOrganizationDetails]=useState([])
    useEffect(()=>{
        organizations&&Promise.all(organizations.map(id=>
            getState(localStorage.getItem('token'),id)
            ))
            .then(res=>res.map(value=>value.data))
            .then(values=>setOrganizationDetails(values))
    },[organizations])
    console.log(organizations,organizationDetails)
    return (
        <div>
            {organizationDetails?(
                <div>
                    {organizationDetails.map((org,i)=><Message key={i} senderImage={''} sender={org.name} message={org.description} time={''} count={''} />)}
                </div>
                ):(
                    <div>
                        No organizations
                    </div>
                )}
        </div>
    );
}

export default AllOrganizations;