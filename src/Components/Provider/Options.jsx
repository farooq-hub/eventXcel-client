import { useEffect, useRef, useState } from 'react'
import Modal from '../CustomComponent/Modal'
import ImageSlider from '../ImageSlider'
import { toast } from 'react-toastify';
import { BiImageAdd } from 'react-icons/bi';
import Select from 'react-select';
import { providerGet, providerPatch, providerPost } from '../../Services/providerApi';
import Button from '../CustomComponent/Button';
import { useSelector } from 'react-redux';
import { IoArrowUndoCircleOutline, IoFlagSharp } from 'react-icons/io5';
import { AiOutlineEdit, AiOutlineWarning } from 'react-icons/ai';


const Options = () => {

    const [optionsList,setOptionsList] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [serviceOptions, setServiceOptions] = useState([])
    const [selectedOption, setSelectedOption] = useState({})
    const [modal,setModal] = useState('')
    const [loading,setLoading] = useState('')
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        title: '',
        description:'',
        optionImages: [],
        price:'',
        service:'',
        priceOption:''
    });
    const img = useRef()
    const provider = useSelector((state) => state.provider.providerData);


    const validateFormData = () => {
        const { title,description,optionImages,price,service, priceOption } = formData;
        if (title.trim().length ==0) {
            toast.warn('Add title for the option');
            setError('Add title for the option')
            return true;
        }else if (optionImages.length == 0) {
            toast.warn('Add a Image for option');
            setError('Add a Image for option')
            return true;
        }else if (optionImages.length > 10) {
            toast.warn('Maximum 10 Images only allowed');
            setError('Maximum 10 Images only allowed')
            return true;
        }else if (price.trim().length==0 ||isNaN(price)) {
            toast.warn('Add price for the option');
            setError('Add price for the option')
            return true;
        }else if (description.trim().length==0) {
            toast.warn('Add description for the option');
            setError('Add description for the option')
            return true;
        }else if (service.trim().length==0) {
            toast.warn('Add service for the option');
            setError('Add service for the option')
            return true;
        }else if (priceOption.trim().length==0) {
            toast.warn('Add price option for the option');
            setError('Add price option for the option')
            return true;
        }else {
            setError('')
            return false
        }
    };

    const handleChange = (event) => {
        console.log(formData);
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const isImage = (file) => {
        const acceptedImageTypes = ["image/jpeg", "image/jpg", "image/avif", "image/png", "image/gif" ,"image/webp"]; // Add more types if necessary
        return acceptedImageTypes.includes(file.type);
    };

    const handleFileChange = (event) => {
        let files = Array.from(event.target.files)
        const imageFiles = files.filter(isImage);
        if (imageFiles.length == files.length){
            setFormData((prevFormData) => ({
              ...prevFormData,
              optionImages: files,
            }));
            setCurrentImageIndex(0)
        }else{
            toast.warn('Unsupported file found(Only Image files is allowed)!');
            setError('Unsupported file found(Only Image files is allowed)!')
        }
    };
    const createFormData = (formData) => {
        const form = new FormData();
        form.append('title',formData.title)
        form.append('description', formData.description)
        form.append('price',formData.price)
        form.append('service', formData.service)
        form.append('priceOption', formData.priceOption)
        formData.optionImages.forEach((file) => {
            form.append('optionImages', file);
        });
        return form
    };

    const addOption =async (event) =>{
        event.preventDefault();
        console.log(formData);
        const errors =await validateFormData();
        if (!errors) {
            try {
                const form = await createFormData(formData);

                    const res =modal === 'add-option'? await providerPost('/option', form, true):
                    modal === 'edit-option'? await providerPost('/option', form, true):null
                    if (res && res.newOption) {
                        setOptionsList((prevPostsList) => [res.newOption, ...prevPostsList]);
                        addOptionClose();
                    }
                    console.log(res);
                setLoading('');
            } catch (error) {
                setLoading('');
                console.error(error);
            }
        }
    }

    const addOptionClose = ()=>{
        setModal('')
        setLoading('')
        setFormData({
            title: '',
            description:'',
            optionImages: [],
            price:'',
            service:'',
            priceOption:''
        })
        setCurrentImageIndex(0)
    }


    const getOptionList =async () => {
        try {
            setLoading('getingOptions')
            const response = await providerGet(`/option?id=${provider._id}`)
            console.log(response);
            response.optionList ? setOptionsList(response.optionList) : ''
            setLoading('')
            setServiceOptions(provider.services.map((service) => ({
                label: service.serviceName,
                value: service._id,
            })))
        } catch (error) {console.log(error)}

    }

    const flagOption =async () => {
        if(loading !== 'flagingOption'){
            setLoading('flagingOption')
            if(!selectedOption.isFlag){
                await providerPatch(`/option/flag?optionId=${selectedOption._id}&toggle=true`).then((res)=>{
                    console.log(res);
                    res && res.flag == true ?
                    setOptionsList((prev) =>
                        prev.map((data) =>{ 
                            if(data._id === selectedOption._id)data.isFlag = true
                            return data
                    })):'' 
                    setModal('')
                    setLoading('')
                    setSelectedOption({})
                }).catch((err)=>console.log(err))
            }else{
                await providerPatch(`/option/flag?optionId=${selectedOption._id}&toggle=false`).then((res)=>{
                    res && res.unFlag == true ?setOptionsList((prev) =>
                    prev.map((data) =>{ 
                        if(data._id === selectedOption._id)data.isFlag = false
                        return data
                })):''
                setModal('')
                setLoading('')
                setSelectedOption({})
                }).catch((err)=>console.log(err))
            }
        }else toast.warn('Action Processing')
        
    }

    const openEditForm = (option) =>{
        setModal('edit-option')
        setFormData({
            title: option?.title,
            description:option?.description,
            optionImages: option?.optionImages,
            price:option?.price,
            service:option?.serviceId?._id,
            priceOption:option.priceOption,
            optionId:option._id
        })
    }

    const priceOption = [
        {value:"Per day",label:"Per day"},
        {value:"Per person",label:"Per person"}
    ]

    useEffect(() => {
        getOptionList();
    }, [])

    return (
        <>
            <section className="container px-4 mx-auto ">
            <div className='w-full h-16 bg-gray-200 my-2  rounded-md flex justify-end items-center p-4'> 
                <Button content={'Add option +'} handelEvent={()=>setModal('add-option')} className={'p-2.5 text-slate-100 font-medium hover:text-white hover:bg-slate-600 rounded-md bg-slate-500'}/>
            </div>
            <div className="flex flex-col mt-6">
                <div className="inline-block min-w-full  align-middle ">
                    <div className="overflow-scroll border border-gray-200 -border-gray-700 rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200 -divide-gray-700 ">
                            <thead className="bg-gray-50 -bg-gray-800 ">
                                <tr className='text-gray-700 capitalize font-medium text-[.999rem] '>
                                    <th className='font-medium text-center py-4 px-4 border-l'>title</th>
                                    <th className='font-medium text-center py-4 px-4 border-l'>description</th>
                                    <th className='font-medium text-center py-4 px-4 border-l'>price option</th>
                                    <th className='font-medium text-center py-4 px-4 border-l'>price</th>
                                    <th className='font-medium text-center py-4 px-4 border-l'>status</th>
                                    <th className='font-medium text-center py-4 px-4 border-l'>action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 ">
                                {loading !=='getingOptions'?(optionsList.length&&optionsList.length > 0?
                                optionsList.map((option)=>(
                                    <tr className='hover:bg-gray-200' key={option._id}>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'><p className=''>{option.title}</p></td>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'>
                                            <Button content={'Discription'} handelEvent={()=>{setModal('description');setSelectedOption(option)}} className={'bg-gray-600 hover:bg-gray-800 text-gray-200 hover:text-white p-2 rounded-md  text-sm'} type={'button'}/>
                                        </td>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'><p className='m-1'>{option.priceOption}</p></td>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'><p className='m-1'>{option.price}</p></td>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'><p className=''>{option.isFlag?'flaged':(option.isBanned?'banned':'active')}</p></td>
                                        <td className='text-gray-600 border-l border-gray-300 px-4 py-3.5 text-sm  capitalize md:break-all whitespace-normal text-center'>
                                            <Button content={!option.isFlag?<IoFlagSharp className='m-1 text-lg text-red-800'/>:<IoArrowUndoCircleOutline className='m-1 text-lg text-green-800'/>} handelEvent={()=>{setModal('confirm');setSelectedOption(option)}} type={'button'}/>
                                            { !option.isFlag&&
                                            <Button content={<AiOutlineEdit className='m-1 text-lg text-red-800'/>} handelEvent={()=>{openEditForm(option)}} type={'button'}/>
                                            
                                            }
                                        </td>
                                    </tr>)):
                                    <tr className='hover:bg-gray-200 '>
                                        <td colSpan={5} className='text-red-600 px-4 py-3.5 text-[.98rem]  capitalize break-all whitespace-normal text-center'><p className='my-2'>no option...!!! Add options</p></td>
                                    </tr>
                                ):
                                [1,2,3,4,5].map((val)=>(
                                <tr className='animate-pulse' key={val+19999}>
                                    <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 '></p></td>
                                    <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 w-16 mx-auto'></p></td>
                                    <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8  mx-auto'></p></td>
                                    <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  '><p className=' bg-gray-200 h-8 w-20 mx-auto'></p></td>
                                    <td className=' border border-gray-300 py-2 px-2 text-sm  capitalize  flex space-x-1 justify-center'><p className=' bg-gray-200 h-8 w-16'></p><p className=' bg-gray-200 h-8 w-16'></p></td>
                                </tr>))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
                {modal === 'add-option' || modal === 'edit-option'?
                    <Modal closeModal={loading !== 'submitForm' ?addOptionClose:''}
                        modalHeader={
                            <div className=' text-center my-2'>
                                <h1 className='text-black font-semibold text-xl my-4'>Add Option</h1>
                                <hr />
                            </div>
                        }
                        modalBody={
                            <div className="p-4 mx-6 overflow-hidden text-left align-middle transition-all transform bg-white  sm:max-w-sm rounded-xl sm:w-full sm:p-6">
                                <div className={`flex items-center justify-center w-[21rem] overflow-hidden h-48 mb-4 ${!formData.optionImages.length?'bg-gray-300':''} rounded`}>
                                        <ImageSlider images={formData.optionImages} height={'h-56'} onClick={()=>img.current.click()} manageIndex={setCurrentImageIndex} currentIndex={currentImageIndex} />
                                        {!formData.optionImages.length?<BiImageAdd onClick={()=>img.current.click()} className="w-10 h-10 text-gray-200 dark:text-gray-600" />:''}
                                        <input type="file" name="optionImages" ref={img} accept="image/jpeg,image/jpg,image/avif,image/png,image/gif,image/webp" className='hidden' onChange={handleFileChange} multiple/>
                                </div>
                                
                                <form onSubmit={loading !== 'submitForm' ? addOption : (e)=>{e.preventDefault();toast.warn('submit processing')}} encType="multipart/form-data" className='space-y-4 '>
                                    <div className="flex items-center justify-between w-full">
                                        <input type="text" id="title" name="title" placeholder="Options title here" value={formData.title} onChange={handleChange}
                                            className="flex-1 block h-10 px-4 text-sm  bg-white border border-gray-200 rounded-md "
                                        />
                                    </div>
                                    <div className="text-black border border-gray-200 rounded-md ">
                                        <Select className="basic-single  text-black" placeholder="Select which price option" isClearable isSearchable
                                         value={priceOption.map((op)=>{
                                            if(op.value==formData.priceOption)return op})}
                                            name="priceOption"  onChange={(selectedOptions) => setFormData((prevFormData) =>({...prevFormData,priceOption:selectedOptions.value}))}
                                            options={priceOption}
                                        />
                                    </div> 
                                    <div className="text-black">
                                        <Select name="service" className="basic-single  text-black"
                                            placeholder="Select which service" isClearable isSearchable 
                                            value={serviceOptions.map((serv)=>{
                                            if(serv.value==formData.service)return serv})}
                                            options={serviceOptions} onChange={(selectedOptions) => setFormData((prevFormData) =>({...prevFormData,service:selectedOptions.value}))}
                                        />
                                    </div> 
                                    <div>
                                        <textarea className="border-2 rounded-md  border-gray-200 w-full h-20" name="description" placeholder='More details about option' value={formData.description} onChange={handleChange}/>
                                    </div>
                                    <div className="flex items-center justify-between w-full">
                                        <input type="number" min="0" name="price" placeholder="Options price here"  value={formData.price} onChange={handleChange}
                                            className="flex-1 block h-10 px-4 text-sm text-gray-700 bg-white border border-gray-200 rounded-md "
                                        />
                                    </div>
                                    <p className='text-center text-sm text-red-600'>{error}</p>
                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                        <Button handelEvent={loading !== 'submitForm' ?addOptionClose:()=>toast.warn('submit processing')} content={'Close'} type='button' className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300 border border-gray-200 rounded-md hover:bg-gray-200"/>
                                        <Button type="submit" className={`px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm bg-slate-700 rounded-md hover:bg-slate-500 text-white font-bold ${
                                            loading === 'submitForm' ? 'hover:cursor-not-allowed':''} duration-[500ms,800ms]`}content={
                                                <div className="flex items-center justify-center">{loading === 'submitForm' ? (
                                                <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                                            ) : (<p>Submit</p>)}
                                    </div>}/>
                                    </div>
                                </form>
                            </div>
                        }
                    />:""}
                {modal ==='description'?<Modal closeModal={()=>{setModal('');setSelectedOption({});}} 
                    modalHeader={
                        <div className='text-center my-2'>
                            <h1 className='text-black font-semibold text-xl my-4'>Description</h1><hr />
                        </div>
                    }
                    modalBody={<div className='max-w-lg text-center border-b'>
                        <p className="m-6 break-all whitespace-normal text-[1rem] font-normal text-gray-700">{selectedOption?.description}</p>
                    </div>}
                    modalFooter={
                        <div className="my-2 text-center">
                            <Button handelEvent={()=>{setModal('');setSelectedOption({})}} content={'Close'} type='button' className="px-5 py-2.5 text-sm font-medium tracking-wide text-black transition-colors duration-300 border border-gray-200 rounded-md hover:bg-gray-200"/>
                        </div>
                    }
                />:''}

                { modal ==='confirm'?<Modal closeModal={()=>{setModal('');setSelectedOption({});setLoading('')}} modalHeader={
                        <div className="flex items-center justify-center ">
                            <Button content={<AiOutlineWarning className="text-6xl text-gray-500 m-4"/>}/>
                        </div>
                    }
                    modalBody={<div ><p className="text-xl font-mono text-center my-2">Are you sure !!! <br />
                    you wand to {!selectedOption.isFlag? 'flag':'unflag' } {selectedOption.title}</p></div>}
                    modalFooter={
                        <div className="flex items-center justify-center gap-4 my-4">
                            <Button type="button" className="text-gray-500 bg-white hover:bg-gray-100 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 "
                            content={'No, cancel'} handelEvent={()=>{setModal('');setSelectedOption({});setLoading('')}}/>
                            <Button type="submit" handelEvent={flagOption} className={`text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2 duration-[500ms,800ms]`}content={
                                <div className="flex items-center justify-center">{loading === 'flagingOption' ? (
                                <><div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-4"></div><p className="ml-2"> Processing... </p></>
                            ) : (<p>Yes, I&apos;m sure</p>)}</div>}/>
                        </div>}
                />:''}
                
            </section>
        </>
    )
}

export default Options