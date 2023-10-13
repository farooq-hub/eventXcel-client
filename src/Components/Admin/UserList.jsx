import { useState, useEffect } from "react";
import axiosInstance from '../../api/axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const UserList = () => {

    const token = useSelector((state) => state.admin.token);

    const[selectedUser,setSelectedUser] = useState({});

    const [confirmAction, setConfirmAction] = useState(false)

    const [userList, setUserList] = useState([]);

    const [searchText, setSearchText] = useState('');

    

    const getUserData = async () => {
        try {
            const response = await axiosInstance.get('/admin/userList', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            setUserList(response.data.userData);
            
        } catch (error) {
            toast.error('Something went wrong')
        }
    }


    const handleUnBlock = async (userId) => {
        try {

            const response = await axiosInstance.patch(`/admin/UnblockUser/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            if (response.status === 200) {
                toast.success('Unblocked Successfully');
                setUserList(prevList => {
                    const updatedList = prevList.map(user => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                isBanned: false
                            };
                        }
                        return user;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    };

    const handleBlock = async (userId) => {
        try {
            const response = await axiosInstance.patch(`/admin/blockUser/${userId}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (response.status === 200) {
                toast.success('Blocked Successfully');
                setUserList(prevList => {
                    const updatedList = prevList.map(user => {
                        if (user._id === userId) {
                            return {
                                ...user,
                                isBanned: true
                            };
                        }
                        return user;
                    });
                    return updatedList;
                });
            }

        } catch (error) {
            toast.error(error.response.data.errMsg);
        }
    };

    const handleConfirmation = (userId) => {
        const user = userList.find((user) => user._id === userId);
        setSelectedUser(user)
        setConfirmAction(true); 
    };

    const handleConfirmAction = () => {
       if(selectedUser.isBanned===true){
            handleUnBlock(selectedUser._id)
       }else {
           handleBlock(selectedUser._id)
       }
    };

    useEffect(() => {
        getUserData()
    }, [])


    return (
        <>
            <section className="container px-4 mx-auto ">
                <div className="sm:flex sm:items-center sm:justify-between ">
                    <div className="flex  justify-start w-full ">
                        <div className="flex items-center gap-x-3">
                            <h2 className="text-lg font-medium text-gray-800 d-text-white">Users</h2>
                            <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full d-bg-gray-800 d-text-blue-400">{userList?.length || 0}</span>
                        </div>
                        <div className="mt-6 w-64 ml-4">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none d-border-neutral-600 d-text-neutral-200 d-placeholder:text-neutral-200 d-focus:border-primary"
                                    placeholder="Search User"
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
                            <div className="overflow-hidden border border-gray-200 d-border-gray-700 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 d-divide-gray-700">
                                    <thead className="bg-gray-50 d-bg-gray-800">
                                        <tr>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 d-text-gray-400">
                                                <button className="flex items-center gap-x-3 focus:outline-none">
                                                    <span>Name</span>
                                                </button>
                                            </th>
                                            <th scope="col" className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 d-text-gray-400">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 d-text-gray-400">
                                                Email
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 d-text-gray-400">Status</th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 d-text-gray-400">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 d-divide-gray-700 d-bg-gray-900">
                                        {userList?.length > 0 ? (
                                            userList.filter((user)=>user.name.toLowerCase().includes(searchText)).map((user) => (
                                                <tr key={user._id}>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-black">{user?.name}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{user?.phone}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{user?.email}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="font-medium text-bold">{user.isBanned ? ('Blocked') : ('Accessible')}</h2>
                                                        </div>
                                                    </td>
                                                   
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            {user.isBanned ? (
                                                                <button
                                                                    onClick={() => handleConfirmation(user?._id)}
                                                                    className="h-8 w-16 bg-green-900 text-white rounded shadow hover:bg-green-950"
                                                                >
                                                                    access
                                                                </button>
                                                            ) : (
                                                                <button
                                                                        onClick={() => handleConfirmation(user?._id)}
                                                                    className=" h-8 w-16 bg-red-500 text-white rounded shadow hover:bg-red-900"
                                                                >
                                                                    block
                                                                </button>
                                                            )}
                                                            {confirmAction && (
                                                                toast.info(
                                                                    <div className="ml-4">
                                                                        <p className="text-sm mb-2">Are you sure ?</p>
                                                                        <button className="h-8 w-16 bg-gray-700 text-white text-sm  rounded-md" onClick={() => handleConfirmAction()}>Confirm</button>
                                                                        <button className="h-8 w-16 bg-red-500 ml-1 text-white text-sm rounded-md" onClick={() => setConfirmAction(false)}>Cancel</button>
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
                                                    No User found
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
        </>
    )
}

export default UserList;