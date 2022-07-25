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
export const register=async(name,uid,location,ipfsHash)=>{
    try {
        const res=await axios.post('/user/register',{name,uid,location,ipfsHash})
        return res
    } catch (error) {
        throw error
    }
}
export const login=async(uid,token)=>{
    try {
        const res=await axios.post('/user/login',{uid},config(token))
        return res
    } catch (error) {
        throw error
    }
}
export const createOrganization=async(token,name,description,passCode,image)=>{
    try {
        const res=await axios.post('/organization/createOrganization',{name,description,passCode,image},config(token))
        return res
    } catch (error) {
        throw error
    }
}
export const getIPFSHash=async(token,userFirebaseId)=>{
    try {
        const res=await axios.post('/user/getIPFSHash',{userFirebaseId},config(token))
        return res
    } catch (error) {
        throw error
    }
}