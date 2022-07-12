import axios from 'axios';

export const getState=async(token,organizationId='')=>{
    let config = {
        headers: {
          'x-access-token': token,
        }
    }
    try{
        // will later use a request header for tokens
        const res=await axios.get(`/user/getState?organizationId=${organizationId}`,config)
        return res
    }catch(error){
        return error
    }
}

// const 
