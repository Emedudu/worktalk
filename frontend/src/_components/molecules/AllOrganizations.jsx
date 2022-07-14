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
            getState(localStorage.getItem('token'),id))
            ).then(values=>setOrganizationDetails(values))
    },[organizations])
    return (
        <div>
            {organizationDetails.map((org,i)=><Message key={i} senderImage={} sender={} message={} time={} count={} />)}
        </div>
    );
}

export default AllOrganizations;