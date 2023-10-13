import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { usersGet } from '../Services/userApi';
import Modal from './CustomComponent/Modal';
import { toast } from 'react-toastify';
import SingleOption from './SingleOption';

const OptionByService = ({service,providerId,handleClose}) => {

    const [loading,setLoading] = useState('')
    const [optionsList,setOptionsList] = useState([]);


    const getOptionList =async ()=>{
        try {
            setLoading('getingOptions')
            const response = await usersGet(`/option?id=${providerId}&serviceId=${service._id}`)
            console.log(response);
            if(response.optionList&&response.optionList?.length == 0){
                handleClose()
                toast.warn('No options availeble')
            }else setOptionsList(response.optionList) 
            setLoading('')
        } catch (error) {console.log(error)}
    }

    useEffect(()=>{
        getOptionList()
    },[])
  return (
    <>{optionsList?.length?
        <Modal closeModal={handleClose} 
            modalHeader={
                <div className='text-center my-2'>
                    <h1 className='text-black font-semibold text-xl my-4'>{service.serviceName}&nbsp;OPTIONS</h1>
                    <hr />
                </div>
            }
            modalBody={
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-screen-xl sm:p-4 p-10 h-[30rem] max-h-screen md:h-[26rem] lg:h-[34rem] overflow-scroll">
                        { loading !== 'getingOptions' ?                     
                        optionsList.map((option)=><SingleOption key={option._id} className={'max-h-[26rem]'} optionData={option}/>)
                        :''
                        // [1,2,3].map((val)=>{
                        // })
                        }
                </div>
            }
        />:''}
    </>
  )
}

OptionByService.propTypes = {
    service: PropTypes.object,
    handleClose : PropTypes.func,
    providerId : PropTypes.string,
};


export default OptionByService