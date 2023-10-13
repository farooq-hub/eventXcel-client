import axiosInstance from '../api/axios';
import {  toast } from 'react-toastify';

const getToken = ()=>{
   const storedAdmin = localStorage.getItem('persist:adminAuth');
   const admin = JSON.parse(storedAdmin)
   const token = admin.token.substring(1, admin.token.length-1)
   return token
}

const adminGet =async (url) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.get('/admin'+ url,token ? { headers: { Authorization: `Bearer ${token}`}} :{});
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
      }
      else {
         toast.error(error)
      }
   }
}

const adminPost =async (url,formData) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.post('/admin'+ url, formData,
      token ? { headers: { Authorization: `Bearer ${token}`}} :{}
      );
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
      else if (error.response?.status === 500) {
         console.log(error.response?.data.errMsg);
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
     } else {
         toast.error(error)
      }
   }
}

// console.log(storedAdmin,'fhjdgksksjfhgasefky')

const adminPatch =async (url,formData,img) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.patch('/admin' + url, formData, token ? {
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
      }else if (error.response?.status === 403) {
         toast.warn(error?.response?.data?.errMsg)
      }
      else if (error.response?.status === 404) {
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 500) {
         toast.warn(error?.response?.data?.errMsg)
      }
      else {
         toast.error(error)
      }
   }
}




export {adminGet,adminPost,adminPatch}

