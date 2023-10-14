import { useEffect, useState } from "react";
import { usersGet } from "../../Services/userApi";
import { v4 as uuidv4 } from 'uuid';
import ProviderCard from "./ProviderCard";
import ProviderCardSkeleton from "../Loading.jsx/ProviderCardSkeleton";
import Button from "../CustomComponent/Button";
import { RiFilterFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { updateServiece } from "../../store/slice/user";
import Spinner from "../Spinner";
import { SlArrowDown } from "react-icons/sl";
import { FiSearch } from "react-icons/fi";


// import Select from 'react-select';



const  Providers = ()=> {

    const [providers, setProviders] = useState([]);
    const [services, setServices] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState('fetchingProviderFirst');
    const [noMore,setMore] = useState(false)
    const [activeTab, setActiveTab] = useState('');
    const [filter,setFilter] = useState({
        service:'All',
        place : 'All',
    })
    const dispatch = useDispatch();
    const servicesData = useSelector((state) => state.user.serviece);

    const fetchProviders = async (loading,showMor) => {
        try {
            setLoading(loading?loading:'fetchingProvider')
            console.log(loading,searchText,'1');
            await usersGet(`/providersList?skip=${loading=='morePost'?providers.length:0}&search=${searchText}&service=${filter.service}&place=${filter.place}`)
            .then((res)=>{
                res.providersData&&res.providersData.length&&res.providersData.length%6==0?setMore(true):setMore(false)
                res.providersData?(!showMor?setProviders(res.providersData):res.providersData.length&&setProviders((prev)=>([...prev,res.providersData]))):''
                loading == 'fetchingProviderFirst'&&fetchServiceList()
                setLoading('')
            }).catch((error)=>{
                console.log(error);
            })

        } catch (error) {
            console.log(error);
        }
    }

    const fetchServiceList = async () =>{
        await usersGet(`/service`).then((res)=>{
            if(res.serviceList){
                setServices(res.serviceList)
                dispatch(updateServiece({ serviece:res.serviceList}));
            }
        }).catch((error)=>{
            console.log(error);
        })
    }



    useEffect(() => {
       services&&services.length&&fetchProviders();
    }, [filter]);
    
    useEffect(() => {
        setLoading('fetchingProviderFirst')
        if(servicesData)setServices(servicesData)
        fetchProviders('fetchingProviderFirst')
    }, []);

        


    const keralaDistricts = [
        "All",
        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad",
    ];
    
    
    return (
        <>
            <section className="w-full ">
                <div className="">
                    <div className=" bg-gray-100 shadow-sm py-5 sm:pt-8 sm:pb-10">
                        <h1 className="text-2xl sm:mb-8 mb-4 font-serif text-center text-gray-800 capitalize lg:text-4xl">PROVIDERS</h1>
                        <p className="max-w-2xl p-2 mx-auto sm:mb-3 font-medium text-center text-gray-500 ">
                            Discover service providers that meet your criteria and connect with them through messaging to place your orders.
                        </p>
                    </div>
                    <div className="py-4 md:py-6">

                    <div className="grid grid-cols-1 gap-2 lg:grid-cols-2 md:ml-0 overflow-hidden">
                    <div className={`flex space-x-3  ${activeTab?'items-start':'items-center'} mx-auto`}> 
                    <p className="text-black flex items-center "><RiFilterFill className="font-mono text-xl"/> <span className="font-semibold">Filter  : </span></p>
                    <div className="flex flex-col mx-auto">
                        <ul className="flex space-x-2 list-none text-sm mx-auto  md:text-base font-semibold text-gray-700 border rounded-md">
                            <li className="">
                                <Button className={`cursor-pointer capitalize  ${activeTab == 'services'&&'bg-slate-200'}  hover:bg-slate-300 duration-300  rounded-md py-2 xl:w-36 w-20 sm:w-24`} handelEvent={()=>setActiveTab('services')} 
                                    content={'Services'}/>
                            </li>
                            <li className="">
                                <Button className={`cursor-pointer capitalize ${activeTab =='place'&&'bg-slate-200'}  hover:bg-slate-300 duration-300  rounded-md py-2 xl:w-36 w-20 sm:w-24`}
                                handelEvent={()=>setActiveTab('place')}
                                content={'place'}/>
                            </li>
                        </ul>
                        {
                            activeTab?
                                <div className="mx-auto  my-2 h-56 md:w-72 overflow-y-auto w-56 bg-white border rounded">
                                    <div className="text-end">
                                        <Button className={'p-1 border rounded-full text-center bg-white m-1'} content={<AiOutlineClose/>} handelEvent={()=>setActiveTab('')}/>
                                    </div>
                                    <div>
                                        <ul role="list" className="px-2 sm:mx-2  py-3 font-medium text-gray-900">        
                                            {
                                                activeTab == 'services'?(
                                                    <>
                                                        <label key={uuidv4()}>
                                                        <div className='flex items-center'>
                                                        <input onChange={() => setFilter((prev)=>({...prev,service:'All'}))} name='service' type="radio" checked={filter.service == 'All'}
                                                            disabled={loading} className="h-4 w-4  rounded-none border-gray-300"/>
                                                        <div   
                                                            className='cursor-pointer mx-3'>
                                                            ALL
                                                        </div>
                                                        </div>
                                                    </label>
                                                    {
                                                    services.map((services) => (
                                                    <label key={services._id}>
                                                        <div className='flex items-center'>
                                                            <input id={services._id} disabled={loading} name='service' type="radio" onChange={(e) => setFilter((prev)=>({...prev,service:e.target.id}))}
                                                                className="h-4 w-4  rounded-none border-gray-300" checked={filter.service == services._id}/>
                                                            <div className='cursor-pointer mx-3'>{services.serviceName}</div>
                                                        </div>
                                                    </label>
                                                ))}</>
                                                ): activeTab == 'place'?
                                                    keralaDistricts.map((place) => (
                                                        <label key={uuidv4()}>
                                                            <div className='flex items-center'>
                                                                <input id={place} name='place' disabled={loading} onChange={(e) => setFilter((prev)=>({...prev,place:e.target.id}))}
                                                                    type="radio" checked={filter.place == place}
                                                                    className="h-4 w-4  rounded-none border-gray-300"/>
                                                                <div className='cursor-pointer mx-3'>{place}</div>
                                                            </div>
                                                        </label>
                                                )): null
                                            }
                                        </ul>
                                    </div>
                                </div>
                            :null
                        }
                    </div>
                </div>
                        <div className="mx-auto flex md:w-72 w-56">
                            <div className="flex w-full  space-x-2 mb-auto items-center">
                                <input  type="search" className="h-10 m-0 rounded-md -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none "
                                    placeholder="Search provider..." value={searchText}
                                    onChange={(event) => setSearchText(event.target.value)} maxLength={50}/>
                                    <Button content={<FiSearch className="text-lg"/>} type={'button'} 
                                      handelEvent={fetchProviders}  className={'text-white p-2.5 bg-black rounded-md'}/>
                            </div>
                        </div>

                    </div>
                    </div>
                    <hr />
                    <div className={'grid grid-cols-1 2xl:grid-cols-3 lg:grid-cols-2 px-2 sm:px-6 py-6 sm:py-10 gap-8'}>
                        {loading !== ('fetchingProvider'||'fetchingProviderFirst') ?(
                        providers?.length && 
                        providers?.length !== 0 ? (
                                providers
                                // .filter((provider) => provider.name.includes(searchText))
                                .map((provider) =><ProviderCard provider={provider} key={provider?._id}/>)
                            ):<ProviderCard role={'noProvider'} />)
                            :([1,2,3,4].map(()=><ProviderCardSkeleton key={uuidv4()}/>))
                        }
                    
                    </div>
                    <div className="text-center">
                        {
                            loading == 'morePost'?<Spinner className={'h-12 w-12'}/>
                            :noMore?
                            <Button className={'text-center '} handelEvent={()=>fetchProviders('morePost',true)}
                            content={<p className='flex items-center text-sm text-blue-600'>Show More<span><SlArrowDown className='text-blue-600 mx-2'/></span></p>}/>:''
                        }
                    </div>
                </div>
            </section>
        </>
    )
    }


export default Providers