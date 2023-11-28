import axiosInstance from '../api/axios';
import {  toast } from 'react-toastify';

const getToken = ()=>{
   const storedAdmin = localStorage.getItem('persist:userAuth');
   const admin = JSON.parse(storedAdmin)
   const token = admin.token.substring(1, admin.token.length - 1)
   return token
}

const usersPost =async (url,formData) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.post(url, formData,token ? { headers: { Authorization: `Bearer ${token}`}} :{});      
      response.data.msg ? toast.success(response?.data?.msg) : null
      return response.data        
   } catch (error) {
      if (error.response?.status === 401) {
         toast.error(error?.response?.data?.errMsg)
      } else if (error.response?.status === 402) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 403) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 404) {
         toast.warn(error?.response?.data?.errMsg)
      }
      else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
     }else if (error.response?.status === 500) {
      console.log(error.response?.data.errMsg);
      toast.warn(error?.response?.data?.errMsg)
   } else {
         toast.error(error)
      }
   }
}

const usersPatch =async (url,formData,img) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.patch(url, formData, token ? {
         headers: {
           Authorization: `Bearer ${token}`,
           'Content-Type': img ? 'multipart/form-data' : 'application/json'
         }
      }:{});      
      response.data.msg ? toast.success(response?.data?.msg) : null
      return response.data        
   } catch (error) {
      if (error.response?.status === 401) {
         toast.error(error?.response?.data?.errMsg)
      } else if (error.response?.status === 402) {
         toast.warn(error?.response?.data?.errMsg)
      }
      else if (error.response?.status === 403) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 404) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
     }else if (error.response?.status === 500) {
      console.log(error.response?.data.errMsg);
      toast.warn(error?.response?.data?.errMsg)
   } else {
         toast.error(error)
      }
   }
}

const usersGet =async (url) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.get( url,token ? { headers: { Authorization: `Bearer ${token}`}} :{});
      response.data.msg ? toast.success(response?.data?.msg) : null
      return response.data        
   } catch (error) {
      if (error.response?.status === 401) {
         toast.error(error?.response?.data?.errMsg)
      } else if (error.response?.status === 402) {
         toast.warn(error?.response?.data?.errMsg)
      }
      else if (error.response?.status === 403) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 404) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 500) {
         console.log(error.response?.data.errMsg);
         toast.warn(error?.response?.data?.errMsg)
      } else {
         toast.error(error)
      }
   }
}






export {usersPost,usersGet,usersPatch,usersDelete}

