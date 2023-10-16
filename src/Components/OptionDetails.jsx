import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Button from './CustomComponent/Button';
import { useEffect, useState } from 'react';
import Modal from './CustomComponent/Modal';
import { AiOutlineEdit } from 'react-icons/ai';
import { toast } from 'react-toastify';

function OptionDetails({options,role,setSelectedOption,setCheckout}) {

    const [modal, setModal] = useState('')
    const [count, setCount] = useState(null)
    const [loading, setLoading] = useState('')
    const [clickedOption,setClickedOption] = useState({})

    useEffect(()=>{
        if(options.length == 0)setCheckout(false)
    },[options])
    return (
        <>
        <ul className="flex flex-col divide-y divide-gray-700">
            {role == 'checkout'&&options&&options.length?
            options.map((val,index)=>(
                <li key={`checkout-${val._id}-${index}`} className="flex flex-col p-4 sm:flex-row sm:justify-between">
                    <div className="flex  w-full space-x-2 sm:space-x-4">
                        <div className='flex items-center'>
                            <img className="flex-shrink-0 lg:w-14 lg:h-14 xl:w-20 xl:h-20 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={val.optionImages[0]} alt="Replica headphones" />
                        </div>
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1" key='title'>
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{val.title}</h3>
                                    <p className="text-sm dark:text-gray-400">Priced by : {val.priceOption}</p>
                                    {val.priceOption != 'Per day'?
                                    <p className="text-sm dark:text-gray-400">Sets : <span>{val.count} </span></p>
                                    :''}
                                </div>
                                <div className="text-right" key='rigthside'>
                                    <p className="text-lg font-semibold">Total: ₹{val.totalAmount}</p>
                                    <p className="text-sm  dark:text-gray-600">Price : ₹{val.price}</p>
                                </div>
                            </div>
                            {role == 'checkout'?
                                <div className="flex space-x-2 ms-auto text-sm items-center divide-x">
                                    {val.count>=100&&<AiOutlineEdit className='text-[1rem]' onClick={()=>{setClickedOption(val);setModal('EditCount');setCount(val.count)}}/>}
                                    <Button type="button" handelEvent={()=>setSelectedOption((prev)=>(prev.filter((opt)=>opt._id!=val._id)))
                                    }
                                    className="flex font-mono items-center px-2 py-1 pl-0 text-[1rem] text-red-500" content={<RiDeleteBin6Line/>}/>
                                </div>
                            :""}
                            
                        </div>
                    </div>
                </li>
        ))
        :''}
        {role == 'order'&&options&&options.length?
            options.map((val,index)=>(
                <li key={`order-${val.optionId}-${index}`} className="flex flex-col py-6 sm:flex-row sm:justify-between">
                    <div className="flex w-full space-x-2 sm:space-x-4">
                    <img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 " src={val.optionId.optionImages[0]} alt="Replica headphones" />
                        <div className="flex flex-col justify-between w-full pb-4">
                            <div className="flex justify-between w-full pb-2 space-x-2">
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold leadi sm:pr-8">{val.optionId.title}</h3>
                                    <p className="text-sm dark:text-gray-400">Price option : {val.optionId.priceOption}</p>
                                    {val.priceOption != 'Per day'?
                                    <p className="text-sm dark:text-gray-400">Sets : <span>{val.count} </span></p>
                                    :''}
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-semibold">Total amount : ₹{val.totalAmount}</p>
                                    <p className="text-sm  dark:text-gray-600">Price : ₹{val.optionId.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
        ))
        :''}
        </ul>
            {modal == "EditCount" ?<Modal closeModal={()=>{setModal('');setClickedOption({});setCount()}}
                modalHeader={
                    <div className='text-center my-2'>
                        <h1 className='text-black font-semibold text-xl my-4'>Edit Sets</h1><hr />
                    </div>
                }
                modalBody={
                    <div className='max-w-lg text-center border-b'>
                        <p className="m-2 text-[.95rem] font-normal text-gray-950">&quot;Whisper to us the number of souls partaking in this exquisite feast, for with each count, 
                        we unveil the poetry of pricing, where every plate becomes a verse in the grand symphony of your event&#39;s delight.&quot;</p>
                        <div className="flex items-center w-56 mx-auto my-2">
                            <input type="number" min={100} name="count" placeholder="Enter the number here" 
                            defaultValue={clickedOption.count} onChange={(e)=>setCount(Math.floor(e.target.value))}
                                className="flex-1 block h-16 text-center px-4 text-sm  bg-white border border-gray-300  rounded-md "
                            />
                        </div>
                    </div>}
                modalFooter={
                    <div className="flex items-center justify-center gap-4 my-4">
                        <Button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
                        content={'Close'} handelEvent={()=>{setModal('');
                        setClickedOption({});setCount()}}/>
                        <Button type="button" handelEvent={!isNaN(count) && !isNaN(parseFloat(count)) && count>=100?
                        ()=>{
                            setLoading('selectingOption');
                            setSelectedOption((prev)=>(prev.map((opt)=>{
                                if (opt._id==clickedOption._id){ 
                                    opt.totalAmount = Math.floor((opt.totalAmount/opt.count)*count)
                                    opt.count = count
                                }
                                return opt
                            })))
                            setLoading('');setModal('');setClickedOption({});setCount()}
                            :()=>toast.warn('Enter a valid number (min : 100)')}  
                        className={`text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 duration-[500ms,800ms]`}content={
                            <div className="flex items-center justify-center">{loading === 'selectingOption' ? (
                            <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                        ) : (<p>Edit</p>)}</div>}/>
                    </div>}
            />:''}
        </>
    )
}

OptionDetails.propTypes = {
    options: PropTypes.any.isRequired, // Define the expected type and mark it as required
    setSelectedOption:PropTypes.func,
    role:PropTypes.string,
    setCheckout:PropTypes.func,

  };


export default OptionDetails