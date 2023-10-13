import { useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { adminGet, adminPatch } from "../../Services/adminApi"
import { RiEyeLine } from "react-icons/ri";
import Post from "../Provider/PostList";
import Modal from "../CustomComponent/Modal";
import Button from "../CustomComponent/Button";
import { TbCurrentLocation } from "react-icons/tb";
import { AiOutlineClose } from "react-icons/ai";
import { MdMiscellaneousServices } from "react-icons/md";
;


const ProviderList = () => {

    const [searchText, setSearchText] = useState('');
    const [confirmAction, setConfirmAction] = useState(false)
    const [providerList, setProviderList] = useState([]);
    const [providerAction,setProviderAction] = useState({});
    const [selectedProvider, setSelectedProvider] = useState([]);
    const [servOpen, setServOpen] = useState(false);
    const [placeOpen, setPlaceOpen] = useState(false);
    const [postOpen, setPostOpen] = useState(false);
    const [providerId, setProviderId] = useState('');

    const placeModalClose = () => setPlaceOpen(false);
    const closeModal = () => setServOpen(false);

    const getProviderData = async () => {
        try {
            await adminGet('/providerList').then((res)=>{
                res.providersData ? setProviderList(res.providersData):''
            }).catch((error)=>{
                console.log(error);
            }) 
        } catch (error) {
            console.log(error,'fffffffffff');
            toast.error('Something went wrong')
        }
    };

    const setProvider = (provider,modal) => {
        setSelectedProvider(provider);
        modal === 'service' ? setServOpen(true) : setPlaceOpen(true);
    }

    const handleUnBlock = async (providerId) => {
        try {
            await adminPatch(`/UnblockProvider/${providerId}`,{}).then((res)=>{
                if(res){
                    setProviderList(prevList => {
                        const updatedList = prevList.map(provider => {
                            if (provider._id === providerId) {
                                return {
                                    ...provider,
                                    isBanned: false
                                };
                            }
                            return provider;
                        });
                        return updatedList;
                    });
                }
            })
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.errMsg);
        }
    };

    const handleBlock = async (providerId) => {
        try {
            await adminPatch(`/blockProvider/${providerId}`,{}).then((res)=>{
                if(res){
                    setProviderList(prevList => {
                        const updatedList = prevList.map(provider => {
                            if (provider._id === providerId) {
                                return {
                                    ...provider,
                                    isBanned: true
                                };
                            }
                            return provider;
                        });
                        return updatedList;
                    });                    
                }
            })
        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    };


    const handleTBC = async (providerId) => {
        try {
            await adminPatch(`/confirmProvider/${providerId}`,{}).then((res)=>{
                if(res){
                    setProviderList(prevList => {
                        const updatedList = prevList.map(provider => {
                            if (provider._id === providerId) {
                                return {
                                    ...provider,
                                    adminConfirmed: true
                                };
                            }
                            return provider;
                        });
                        return updatedList;
                    });
                }
            }).catch((error)=>{
                console.log(error);
            })
        } catch (error) {
            console.log(error);
        }
    }

    const handleConfirmation = (id) => {
        const provider = providerList.find((provider) => provider._id === id);
        setProviderAction(provider);
        setConfirmAction(true);
    };

    const handleConfirmAction = () => {
       
        if(!providerAction.adminConfirmed){
            handleTBC(providerAction._id)
        }
        else if (providerAction.isBanned === true) {
            handleUnBlock(providerAction._id)
        } else {
            handleBlock(providerAction._id)
        }
    };

    useEffect(() => {
        getProviderData();
    }, [])


    return (
        <>
            {  !postOpen?
                <section className="container px-4 mx-auto ">
                    <div className="sm:flex sm:items-center sm:justify-between ">
                        <div className="flex  justify-start w-full ">
                            <div className="flex items-center gap-x-3">
                                <h2 className="text-lg font-medium text-gray-800 -text-white">Providers</h2>
                                <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full -bg-gray-800 -text-blue-400">{providerList?.length || 0}</span>
                            </div>
                            <div className="mt-6 w-64 ml-4">
                                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                    <input
                                        type="search"
                                        className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none -border-neutral-600 -text-neutral-200 -placeholder:text-neutral-200 -focus:border-primary"
                                        placeholder="Search Provider"
                                        aria-label="Search"
                                        aria-describedby="button-addon1"
                                        value={searchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col mt-6">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden border border-gray-200 -border-gray-700 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200 -divide-gray-700">
                                        <thead className="bg-gray-50 -bg-gray-800">
                                            <tr>
                                                <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                    <button className="flex items-center gap-x-3 focus:outline-none">
                                                        <span>Name</span>
                                                    </button>
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 -text-gray-400">
                                                    Phone
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500 -text-gray-400">
                                                    Services
                                                </th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">Places</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center rtl:text-right text-gray-500">Posts</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Status</th>
                                                <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 -divide-gray-700 -bg-gray-900">
                                            {providerList?.length > 0 ? (
                                                providerList.filter((provider) => provider.name.toLowerCase().includes(searchText)).map((provider) => (
                                                    <tr key={provider._id}>                                                    
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div>
                                                                <h2 className="font-medium text-black">{provider?.name}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div>
                                                                <h2 className="font-medium text-bold">{provider?.phone}</h2>
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div className="relative flex justify-center">
                                                                <button
                                                                    className="p-2  bg-gray-700 text-white rounded-md hover:bg-gray-500"
                                                                    onClick={() => setProvider(provider,'service')}
                                                                >Services</button>
                                                                {servOpen ? (
                                                                    <Modal closeModal={closeModal}
                                                                    modalHeader={
                                                                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                                                Services
                                                                            </h3>
                                                                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" content={<AiOutlineClose/>
                                                                        } handelEvent={closeModal}/>
                                                                        </div>}
                                                                    modalBody={
                                                                        <div className="p-5">
                                                                            <ul className="space-y-3 max-h-96 overflow-y-auto">
                                                                            {selectedProvider && selectedProvider?.services?.length > 0 ? selectedProvider.services.map((service) => 
                                                                                <li key={service._id} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                                                                                    <MdMiscellaneousServices/>
                                                                                    <span className="flex-1 ml-3 whitespace-nowrap uppercase font-mono">{service.serviceName}</span>
                                                                                    {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">Popular</span> */}
                                                                                </li>
                                                                                ):''}

                                                                            </ul>
                                                                        </div>}
                                                                    modalFooter={
                                                                        <div className="flex justify-end  items-center p-4  rounded-b">
                                                                            <Button  handelEvent={closeModal} type="button" className="text-white bg-red-500 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 " content={'Close'}/>
                                                                        </div>
                                                                    }
                                                                />
                                                                ):null}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="relative flex justify-center">
                                                                <button
                                                                    onClick={() => setProvider(provider,'place')}
                                                                    className="p-2 text-sm bg-gray-700 text-white rounded-md hover:bg-gray-500"
                                                                >Places</button>

                                                                {placeOpen && <Modal closeModal={placeModalClose}
                                                                    modalHeader={
                                                                        <div className="flex items-center justify-between p-5 border-b rounded-t dark:border-gray-600">
                                                                            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                                                                                Available
                                                                            </h3>
                                                                            <Button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center" content={<AiOutlineClose/>
                                                                        } handelEvent={placeModalClose}/>
                                                                        </div>}
                                                                    modalBody={
                                                                        <div className="p-5">
                                                                            <p className="text-sm font-normal text-gray-500 dark:text-gray-400">Servies Available At :</p>
                                                                            <ul className="my-4 space-y-3 max-h-96 overflow-y-auto">
                                                                            {selectedProvider && selectedProvider?.places?.length > 0  && selectedProvider.places.map((val,i) => 
                                                                                <li key={i+1931} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow">
                                                                                    <TbCurrentLocation/>
                                                                                    <span className="flex-1 ml-3 whitespace-nowrap uppercase font-mono">{val}</span>
                                                                                    {/* <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded ">Popular</span> */}
                                                                                </li>
                                                                                )}

                                                                            </ul>
                                                                        </div>}
                                                                    modalFooter={
                                                                        <div className="flex justify-end  items-center p-4  rounded-b">
                                                                            <Button  handelEvent={placeModalClose} type="button" className="text-white bg-red-500 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 " content={'Close'}/>
                                                                        </div>
                                                                    }
                                                                />
                                                                }
                                                            </div>
                                                        </td>
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div className="relative flex justify-center">
                                                                <button
                                                                    className="text-xl rounded-md"
                                                                    onClick={() => {
                                                                        setPostOpen(true) 
                                                                        setProviderId(provider._id)}}
                                                                ><RiEyeLine/></button>
                                                            </div>
                                                        </td>
                                                    
                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div>
                                                                {provider?.adminConfirmed ? (
                                                                    provider?.isBanned ? (
                                                                        <p className="text-red-600">Blocked</p>
                                                                    ) : (
                                                                        <p className="text-green-600">Accessible</p>
                                                                    )
                                                                ) : (   
                                                                    <h1 className="text-blue-600">TBC</h1>
                                                                )}
                                                            </div>
                                                        </td>

                                                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                            <div>
                                                                {provider.adminConfirmed ? (
                                                                    provider.isBanned ? (
                                                                        <button
                                                                            onClick={() => handleConfirmation(provider._id)}
                                                                            className="bg-green-900 p-2 text-white rounded shadow hover:bg-green-950"
                                                                        >access</button>
                                                                    ) : (
                                                                        <button
                                                                                onClick={() => handleConfirmation(provider._id)}
                                                                            className=" bg-red-500 p-2 text-white rounded shadow hover:bg-red-900"
                                                                        >
                                                                            block
                                                                        </button>
                                                                    )
                                                                ) : (
                                                                    <button
                                                                            onClick={() => handleConfirmation(provider._id)}
                                                                        className="bg-gray-600 p-2 text-white rounded shadow hover:bg-indigo-900"
                                                                    >
                                                                        Confirm
                                                                    </button>

                                                                )}
                                                            
                                                                {confirmAction && (
                                                                    toast.info(
                                                                        <div>
                                                                            <p>Are you sure you want to proceed?</p>
                                                                            <button className=" bg-indigo-500 text-white rounded-md" onClick={() => handleConfirmAction()}>Confirm</button>
                                                                            <button className=" bg-red-500 ml-1 text-white rounded-md" onClick={() => setConfirmAction(false)}>Cancel</button>
                                                                        </div>,
                                                                        {
                                                                            toastId: '',
                                                                            autoClose: false,
                                                                            closeOnClick: true,
                                                                            draggable: false,
                                                                        }
                                                                    )
                                                                )}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                        No Provider found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            :<Post providerId={providerId} setPostOpen={setPostOpen} setProviderId={setProviderId}/>}
        </>
    )
}

export default ProviderList;