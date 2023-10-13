import { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Modal from '../CustomComponent/Modal';
import Button from '../CustomComponent/Button';
import StarRating from '../StarRating ';
import { usersPost } from '../../Services/userApi';


const OrderReview = ({setModal,role,feedback,providerId,setOrderData}) => {

    const feedbackRef = useRef()
    const [loading,setLoading] = useState('')
    const [rating,setRating] = useState(role == 'editFeeedback'?feedback.rating:0)
    
    const handleFunction=async (event)=>{
        event.preventDefault();
        let feedback = feedbackRef.current.value
        if(rating < 1){
            toast.warn('Please give your rating')
        }if(feedback.length < 1){
            toast.warn('Please give your review to')
        }else{
            setLoading('submitForm')
            await usersPost(`/feedback?providerId=${providerId}`,{rating,feedback}).then((res)=>{
                if (res&&res.feedback) {
                    setOrderData((prev) => ({
                        ...prev,
                        providerId:{
                            ...prev.providerId,
                            feedback:[...prev.providerId.feedback,res.feedback]
                        } , 
                    }));
                    setModal('')
                }
            })
            // addReview(rating,title,feedback)
        }
    }

    return (
        <div>
            <Modal closeModal={loading !== 'submitForm' ?()=>setModal(''):''}

                modalHeader={
                    <div className=' text-center my-2'>
                        <h1 className='text-black font-semibold text-xl my-4'>Your Feedback</h1>
                        <hr />
                    </div>
                }
                modalBody={
                    <div className="overflow-hidden text-left  transition-all transform bg-white  sm:max-w-sm rounded-xl w-full">
                        <p className="font-serif text-center text-slate-700">Please provide your feedback abouty us:</p>
                        <form onSubmit={loading !== 'submitForm' ? handleFunction : (e)=>{e.preventDefault();toast.warn('submit processing')}} encType="multipart/form-data" className='space-y-2 p-4 sm:p-6'>

                            <div className='flex justify-center space-x-3 items-center'>
                                <StarRating setRating={setRating} rating={rating} role={'addFeedback'} className={' text-4xl space-x-3 '}/>
                                <p className='text-center font-sans mb-1 text-gray-700 text-xl '>{`(${rating})`}</p>
                            </div>
                            <div>
                                <textarea ref={feedbackRef } defaultValue={role=='editFeedback'?feedback.feedback:''} className="border-2 rounded-md sm:mb-4 border-gray-200 w-full h-20 p-2" name="description" placeholder='Review here...'  />
                            </div>
                            <p></p>
                            <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                <Button handelEvent={loading !== 'submitForm' ?()=>setModal(''):()=>toast.warn('submit processing')} content={'Close'} type='button'
                                 className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 border border-gray-200 rounded-md hover:bg-gray-200"/>
                                <Button type="submit" className={`px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm bg-black rounded-md  text-white font-bold ${
                                    loading === 'submitForm' ? 'hover:cursor-not-allowed':''} duration-[500ms,800ms]`}content={
                                        <div className="flex items-center justify-center">{loading === 'submitForm' ? (
                                        <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                                    ) : (<p>Submit</p>)}
                            </div>}/>
                            </div>
                        </form>
                    </div>
                }
            />
        </div>
    )
}

OrderReview.propTypes = {
    role: PropTypes.string,
    providerId:PropTypes.string,
    feedback: PropTypes.object,
    setOrderData:PropTypes.func,
    setModal:PropTypes.func // Define the expected type and mark it as required

};

export default OrderReview