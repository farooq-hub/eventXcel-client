import PropTypes from 'prop-types';
import { BiGridAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import Button from '../CustomComponent/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { usersGet } from '../../Services/userApi';
import SingleOption from '../SingleOption';
import Modal from '../CustomComponent/Modal';
import { toast } from 'react-toastify';
import { IoIosArrowForward } from 'react-icons/io';

const ServiceOptions = ({setCheckout,selectedOption,setSelectedOption,provider}) => {

    const [activeTab, setActiveTab] = useState('')
    const [loading, setLoading] = useState('')
    const [optionList, setOptionList] = useState([])
    const [count, setCount] = useState(100)
    const [modal, setModal] = useState('')
    const [clickedOption,setClickedOption] = useState({})
    const location =  useLocation()
    const navigate =  useNavigate()


    const getOptions = async ()=>{
        setLoading('get-option')
        await usersGet(`/option?id=${location.state.id}&checkout='true'`)
        .then((res)=>{
            res && res.optionList ? setOptionList(res.optionList) : null
            setLoading('')
        }).catch((error)=>{
            console.log(error);
        })
    }

    const toSelectOption=(option)=>{
        if(option.priceOption =='Per day'){
            setSelectedOption((pre)=>[...pre,{...option,count:1,totalAmount:option.price}])
        }else{
            setModal('selectOption')
            setClickedOption(option)
        }
    }


    useEffect(() => {
        if(!optionList.length){
        if(location.state){
            location.state.id?getOptions():navigate(-1)
            location.state.services?setActiveTab(location.state.services[0]._id):''
        }else navigate('/providers')}
    }, []);

    return (
        <div className='w-full bg-white '>
            <div className=" bg-gray-200 shadow-sm mb-2 pt-4 pb-5">
                <h1 className="text-2xl mb-6 font-serif text-center text-gray-800 capitalize lg:text-[1.99rem]">Service Options</h1>
                <p className="max-w-2xl mx-auto mb-2 font-medium text-center text-gray-500 ">Handpick the elements destined for your event&apos;s stage,
                     and let us craft the artistry of cost with a meticulous touch, ensuring every choice sings harmoniously in the grand orchestration of your occasion.
                </p>
            </div>
            <div className="flex flex-row text-2xl gap-3 lg:text-xs items-center justify-evenly  border-t uppercase text-gray-400 tracking-widest h-16">
                {provider.services&&provider.services.map((service)=>
                    <Button key={service._id} className={`${activeTab === service._id? "text-black border-t border-black": ""} flex justify-center items-center h-full  cursor-pointer`}
                        handelEvent={() => setActiveTab(`${service._id}`)}content={<><BiGridAlt /><span className="hidden lg:inline-block ml-2">{service.serviceName}</span></>}/>
                )}
            </div>
            <div className="grid mb-16 md:mb-20 mx-2  max-h-[40rem] lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-1 lg:gap-8">
                {loading !== 'get-option'?
                    ( optionList.length !=0 ?optionList.filter((option) => activeTab === option.serviceId ).map((option) => (
                        <SingleOption key={option._id} className={'max-h-[36rem] overflow-hidden'}
                            selectedOption={selectedOption.find(opt => opt._id === option._id)}
                            isSelected={selectedOption.some(opt => opt._id === option._id)}
                            onClick={() =>{!selectedOption.some(opt => opt._id.toString() === option._id.toString())?toSelectOption(option):
                                setSelectedOption((pre)=>pre.filter((opt)=> opt._id.toString() !== option._id.toString()))} } optionData={option}/>)
                        ):<div className='h-[20rem] flex justify-center items-center w-full bg-slate-100'> <p className='text-red-500 font-medium text-lg'>No option available ...!</p></div>)
                        :[1,2,3,4].map((val)=>
                        <div key={val+14444} className="flex flex-col m-8 animate-pulse">
                            <div className="h-48 rounded-t bg-gray-200"></div>
                            <div className="flex-1 px-4 py-8 space-y-4 sm:p-8">
                                <div className="w-full h-6 rounded bg-gray-200"></div>
                                <div className="w-full h-6 rounded bg-gray-200"></div>
                                <div className="w-3/4 h-6 rounded bg-gray-200"></div>
                            </div>
                        </div>)
                }
            </div>
            {modal == "selectOption" ?<Modal closeModal={()=>{setModal('');setClickedOption({});setCount(100)}}
                modalHeader={
                    <div className='text-center my-2'>
                        <h1 className='text-black font-semibold text-xl my-4'>To select option</h1><hr />
                    </div>
                }
                modalBody={
                    <div className='max-w-lg text-center border-b'>
                        <p className="m-2 text-[.95rem] font-normal text-gray-950">&quot;Whisper to us the number of souls partaking in this exquisite feast, for with each count, 
                        we unveil the poetry of pricing, where every plate becomes a verse in the grand symphony of your event&#39;s delight.&quot;</p>
                        <div className="flex items-center w-56 mx-auto my-2">
                            <input type="number" min={100} id="title" name="count" placeholder="Enter the number here" value={count} onChange={(e)=>setCount(e.target.value)}
                                className="flex-1 block h-16 text-center px-4 text-sm  bg-white border border-gray-300  rounded-md "
                            />
                        </div>
                    </div>}
                modalFooter={
                    <div className="flex items-center justify-center gap-4 my-4">
                        <Button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
                        content={'Close'} handelEvent={()=>{setModal('');
                        setClickedOption({});setCount(100)}}/>
                        <Button type="button" handelEvent={!isNaN(count) && !isNaN(parseFloat(count)) && count>=100?()=>{
                            setLoading('selectingOption');
                            setSelectedOption((pre)=>[...pre,{...clickedOption,count:count,totalAmount:(count*clickedOption.price)}]);
                            setLoading('');setModal('');setClickedOption({});setCount(100)}
                            :()=>toast.warn('Enter a valid number')}  
                        className={`text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 duration-[500ms,800ms]`}content={
                            <div className="flex items-center justify-center">{loading === 'selectingOption' ? (
                            <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                        ) : (<p>Submit</p>)}</div>}/>
                    </div>}
            />:''}
        <div className='bg-slate-200 h-16 md:h-20 w-full bottom-0 fixed'>
            <div className='flex justify-end h-full items-center md:mr-72'>
                <p className='md:text-xl text-lg  text-gray-700 font-medium'>Grand Total : <span className='underline'>₹ {selectedOption.length?`${selectedOption.reduce((accumulator, option) => {return accumulator + option.totalAmount}, 0)}.00`:0.00}</span></p>
                {selectedOption.length?
                    <Button content={<p className='flex items-center'>Checkout <span className='ml-2 text-lg'><IoIosArrowForward/></span></p>} handelEvent={()=>setCheckout(true)} type={'button'}
                    className={'py-2.5 px-2 bg-gray-500 hover:bg-gray-700  duration-[500ms,800ms] text-[1.01rem] text-white rounded-md ml-6'}/>
                :''}
            </div>
        </div>
        </div>
    )
}

ServiceOptions.propTypes = { // Define the expected type and mark it as required
    setCheckout:PropTypes.func,
    selectedOption:PropTypes.array,
    setSelectedOption:PropTypes.func,
    provider:PropTypes.object
};


export default ServiceOptions