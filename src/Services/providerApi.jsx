import axiosInstance from '../api/axios';
import {  toast } from 'react-toastify';

const getToken = ()=>{
   const storedProvider = localStorage.getItem('persist:providerAuth');
   const provider = JSON.parse(storedProvider)
   const token = provider.token.substring(1, provider.token.length - 1)
   return token
}

const providerGet =async (url) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.get( '/provider' + url,token ? { headers: { Authorization: `Bearer ${token}`}} :{});
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
         console.log(error.response?.data.errMsg,error);
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 500) {
         console.log(error.response?.data.errMsg,error);
         toast.warn(error?.response?.data?.errMsg)
      } else {
         toast.error(error)
      }
   }
}

const providerPost = async (url,formData,img) => { 
   try {
      console.log(formData,'-----');
      
      const token = getToken();
      const response = await axiosInstance.post('/provider' + url,formData,token ? {
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

const providerPatch =async (url,formData,img) => { 
   try {
      const token = getToken();
      let form = formData ? formData : {}
      const response = await axiosInstance.patch('/provider' + url, form, token ? {
         headers: {
           Authorization: `Bearer ${token}`,
           ...(img ? { 'Content-Type': 'multipart/form-data' } : {})
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

const providerDelete =async (url) => { 
   try {
      const token = getToken();
      const response = await axiosInstance.delete( '/provider' + url,token ? { headers: { Authorization: `Bearer ${token}`}} :{});
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
         console.log(error.response?.data.errMsg,error);
         toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 504) {
        toast.warn(error?.response?.data?.errMsg)
      }else if (error.response?.status === 500) {
         console.log(error.response?.data.errMsg,error);
         toast.warn(error?.response?.data?.errMsg)
      } else {
         toast.error(error)
      }
   }
}


export {providerPost,providerGet,providerPatch,providerDelete}

