import axios from 'axios';

const config=(token)=>{
    return {
        headers: {
          'x-access-token': token,
        }
    }
}
export const getState=async(token,organizationId='')=>{
    try{
        // will later use a request header for tokens
        const res=await axios.get(`/user/getState?organizationId=${organizationId}`,config(token))
        return res
    }catch(error){
        throw error
    }
}
export const login=async(token,email,password)=>{
    try {
        const res=await axios.post('/user/login',{email,password},config(token))
        return res
    } catch (error) {
        throw error
    }
}
export const createOrganization=async(token,name,description,passCode)=>{
    try {
        const res=await axios.post('/organization/createOrganization',{name,description,passCode},config(token))
        return res
    } catch (error) {
        throw error
    }
}
