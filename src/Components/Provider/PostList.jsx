import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { providerDelete, providerGet, providerPost } from "../../Services/providerApi";
import { RiDeleteBin6Line, RiEditLine, RiEyeLine } from "react-icons/ri";
import { BiBlock } from "react-icons/bi";
import SinglePost from "../SinglePost";
import ImageSlider from "../ImageSlider";
import { useSelector } from "react-redux";  
import PostUpdate from "./PostUpdate";
import PropTypes from 'prop-types';
import { adminGet, adminPatch } from "../../Services/adminApi";



const Post = ({providerId,setProviderId,setPostOpen}) => {

    const [loading, setLoading] = useState(false);
    const [postsList, setPostsList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [openPost, setIOpenPost] = useState(false);
    const [postEdit, setPostEdit] = useState(false);
    const [editPost, setEditPost] = useState({});
    const [selectedPost, setSelectedPost] = useState({});
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [confirmAction, setConfirmAction] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const [bannedPost, setBannedPost] = useState({});
    const [formData, setFormData] = useState({
        caption: '',
        tagline:'',
        postImages: [],

    });

  const providerData = useSelector((state) => state.provider.providerData);


    const validateFormData = () => {
        const { postImages, caption } = formData;

        if (caption.trim().length ==0) {
            toast.warn('Add Caption for post');
            setError('Add Caption for post')
            return true;
        }else if (postImages.length == 0) {
            toast.warn('Add a Image for post');
            setError('Add a Image for post')
            return true;
        }else if (postImages.length > 10) {
            toast.warn('Maximum 10 Images only allowed');
            setError('Maximum 10 Images only allowed')
            return true;
        }else {
            setError('')
            return false
        }
    };

    const handleChange = (event) => {
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
              postImages: files,
            }));
            setCurrentImageIndex(0)
        }else{
            toast.warn('Unsupported file found(Only Image files is allowed)!');
            setError('Unsupported file found(Only Image files is allowed)!')
        }
    };
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors =await validateFormData();
        if (!errors) {
            setLoading(true);
            let img = true
            try {
                const form = new FormData();
                form.append('caption',formData.caption)
                form.append('tagline', formData.tagline)
                formData.postImages.forEach((file) => {
                    form.append('postImages', file);
                });
                console.log(form);
                await providerPost('/post',form,img).then((res)=>{
                    res && res.newPost?setPostsList(prevPostsList => [...prevPostsList, res.newPost]):''
                    addPostClose()
                    setLoading(false);
                    setIsOpen(false);
                }).catch((error)=> {console.log(error)})
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    };

    const getPostList = async () => {
        try {
            const response = providerId?await adminGet(`/post?id=${providerId}`):await providerGet(`/post?id=${providerData._id}`)
            response.postsList ? setPostsList(response.postsList):''
        } catch (error) {
            toast.error(error?.response?.data?.errMsg)
        }
    };

    const addPostClose = ()=>{
        setIsOpen(false)
        setFormData({
            caption: '',
            tagline:'',
            postImages: [],
        })
        setCurrentImageIndex(0)
    }

    const deletePost =async (postId) =>{
        setConfirmAction(false)
        if(postId){
            await providerDelete(`/post?postId=${postId}`).then((res)=>{
            if(res.delete){
                setPostsList((prev) =>
                prev.filter((post) => post._id !== postId))
            }
            }).catch((err) => console.log(err))
        }
    }

    const bannPost =async () =>{
        setConfirmAction(false)
        console.log(bannedPost);
            await adminPatch(`/post?postId=${bannedPost._id}`,{bann:bannedPost.isBanned}).then((res)=>{
            if(res.bann){
                setPostsList((prev) =>
                prev.map((post) =>{ 
                    if(post._id == bannedPost._id) post.isBanned = res.isBanned
                    return post
                }))
            }
            }).catch((err) => console.log(err))
        
    }


    useEffect(() => {
        getPostList()
    }, []);

    return (
        <>
            <section className="container px-4 mx-auto ">
                <div className="sm:flex sm:items-center sm:justify-between  ">
                    <div className="flex w-full ">
                        {!providerId?<div className="flex items-center gap-x-3">
                                <div className="relative flex justify-center">
                                    <button onClick={() => setIsOpen(true)}
                                        className="px-4 py-2 mx-auto tracking-wide text-white transition-colors duration-300  bg-slate-500 rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >Add <span className="font-semibold text-xl">+</span></button>
                                </div>       
                            </div>:
                            <div className="flex items-center gap-x-3">
                                <div className="relative flex justify-center">
                                    <button onClick={() => {
                                        setProviderId('')
                                        setPostOpen(false)
                                    }}
                                        className="px-4 py-2 mx-auto tracking-wide text-white transition-colors duration-300  bg-slate-500 rounded-md hover:bg-slate-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                    >Back</button>
                                </div>       
                            </div>
                            }
                        <div className="mt-6 w-64 ml-4">
                            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                                <input
                                    type="search"
                                    className="relative h-10 m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none -border-neutral-600 -text-neutral-200 -placeholder:text-neutral-200 -focus:border-primary"
                                    placeholder="Search posts by taglins"
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
                    <div className="overflow-x-scroll">
                        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 max-h-screen-sm  cursor-pointer">
                                    <thead className="bg-gray-50 ">
                                        <tr>
                                            <th className="px-1 text-sm text-gray-500 font-normal text-center ">No</th>
                                            <th scope="col" className="py-3.5 text-sm font-normal text-center  text-gray-500">
                                                Image
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500">
                                                <span>Status</span>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500">
                                                <span>Likes</span>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500">
                                                <span>Reports</span>
                                            </th>
                                            <th scope="col" className="py-3.5 px-4 text-sm font-normal text-center  text-gray-500">
                                                <span>view</span>
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-sm font-normal text-center  text-gray-500">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 -divide-gray-700  -bg-gray-900">
                                        {postsList?.length > 0 ? (
                                            postsList.filter((post) => post.tagline.includes(searchText)).map((post,i) => (
                                                <tr key={post._id}>
                                                    <td className="text-sm text-center text-gray-500 font-normal  whitespace-nowrap">{i+1}</td>
                                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap ">
                                                        <div className="flex justify-center ">
                                                            <img className="h-12 w-16 font-bold ml-9" src={post.postImages[0]} alt="Service Image" />
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-sm text-center font-medium whitespace-nowrap">
                                                        <div>
                                                        {!post?.isBanned ?<h2 className="text-green-700">Active</h2>: <h2 className="text-red-700">Banned</h2>}
                                                            <h2 className="text-red-700"></h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-center text-sm font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-black">{post?.likes.length}</h2>
                                                        </div>
                                                    </td>
                                                    <td className="px-4 py-4 text-sm text-center font-medium whitespace-nowrap">
                                                        <div>
                                                            <h2 className="text-red-700">{post?.reports.length}</h2>
                                                        </div>
                                                    </td>

                                                    <td className="px-4 py-4 text-center text-sm font-thin whitespace-nowrap">
                                                        <button className="mr-2 mx-auto tracking-wide text-lg text-gray-700 capitaliz" onClick={()=>{
                                                        setSelectedPost(post);
                                                        setIOpenPost(true)
                                                        }}><RiEyeLine/></button>
                                                    </td>
                                                    {!providerId?<td className="px-4 py-4 text-center text-sm font-thin whitespace-nowrap">
                                                    {confirmAction && (
                                                                toast.info(
                                                                    <div>
                                                                        <p>Are you sure you want to proceed?</p>
                                                                        <button className="px-1 py-1 bg-indigo-500 text-white rounded-md" onClick={() => {deletePost(post._id)}}>Confirm</button>
                                                                        <button className="px-1 py-1 bg-red-500 ml-1 text-white rounded-md" onClick={() => setConfirmAction(false)}>Cancel</button>
                                                                    </div>,
                                                                    {
                                                                        toastId: '',
                                                                        autoClose: false,
                                                                        closeOnClick: true,
                                                                        draggable: false,
                                                                    }
                                                                )
                                                            )}
                                                        {!post?.isBanned ?<button className="mr-2 mx-auto tracking-wide text-lg text-blue-700 capitaliz" onClick={()=>{setPostEdit(true),setEditPost(post)}}><RiEditLine/></button>:''}
                                                        <button className=" mx-auto tracking-wide text-lg text-red-700 capitaliz "onClick={()=>setConfirmAction(true)}><RiDeleteBin6Line/></button>
                                                    </td>:<td className="px-4 py-4 text-center text-sm font-thin whitespace-nowrap">
                                                        <button className=" mx-auto tracking-wide text-lg text-red-700 capitaliz "onClick={()=>{setBannedPost(post);setConfirmAction(true)}}><BiBlock/></button>
                                                        {confirmAction && (
                                                                toast.info(
                                                                    <div >
                                                                        <p>Are you sure you want to proceed?</p>
                                                                        <button className="px-1 py-1 bg-indigo-500 text-white rounded-md"  onClick={() => bannPost()}>Confirm</button>
                                                                        <button className="px-1 py-1 bg-red-500 ml-1 text-white rounded-md" onClick={() => {setBannedPost('');setConfirmAction(false)}}>Cancel</button>
                                                                    </div>,
                                                                    {
                                                                        toastId: '',
                                                                        autoClose: false,
                                                                        closeOnClick: true,
                                                                        draggable: false,
                                                                    }
                                                                )
                                                            )}
                                                        </td>}
                                                    
                                                </tr>
                                                                
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-500" colSpan={3}>
                                                    No posts yet add posts...
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
                {postEdit && <PostUpdate editPost={editPost} setPostsList={setPostsList} setPostEdit={setPostEdit}/>}
                {isOpen && (
                    <div
                        className="fixed inset-0 z-10 overflow-y-auto bg-slate-200"
                        aria-labelledby="modal-title"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div className="flex  items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                                &#8203;
                            </span>
                    
                            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                                <ImageSlider images={formData.postImages} height={'h-56'} manageIndex={setCurrentImageIndex} currentIndex={currentImageIndex} />
                                <form onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div>
                                        <label htmlFor="Caption" className="block text-sm text-gray-500 -text-gray-300 mt-4">Caption</label>
                                        <textarea className="border-2 border-slate-300 w-full h-24" name="caption" id=""  onChange={handleChange}/>
                                    </div>                                    
                                    <div>
                                        <label htmlFor="tagline" className="block text-sm text-gray-500 -text-gray-300 mt-4">Hash Tag</label>
                                        <textarea  className="border-2 border-slate-300 w-full text-blue-600" id=""  name="tagline" onChange={handleChange} placeholder="#new #party"/>
                                    </div>
                                    <div>
                                        <label htmlFor="image" className="block text-sm text-gray-500 -text-gray-300 mt-4">Image</label>
                                        <input 
                                            type="file" 
                                            multiple
                                            // accept="image/jpeg, image/jpg, image/avif, image/png, image/gif ,image/webp"
                                            onChange={handleFileChange}  
                                            name="postImages" 
                                            className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full -file:bg-gray-800 -file:text-gray-200 -text-gray-300 placeholder-gray-400/70 -placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 -border-gray-600 -bg-gray-900 -focus:border-blue-300" />
                                    </div>
                                    <p className='text-center text-sm text-red-600'>{error}</p>
                                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                                        <button
                                            onClick={addPostClose}
                                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300  border border-gray-200 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                                        >Cancel</button>
                                        <button
                                            type="submit" className="px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-slate-700 rounded-md hover:bg-slate-500"
                                        >
                                            {loading ?<span className="">Loading...</span> : 'Submit'}
                                        </button>
                                    </div>
                                </form>
                            </div>                                           
                        </div>
                    </div>
                )}

                {openPost?<SinglePost post={selectedPost} setPostsData={setPostsList} setSelectedPost={setSelectedPost} setIOpenPost={setIOpenPost} user={providerId?{}:providerData} role={providerId?'admin':'provider'}/>:''}


            </section>
        </>

    )

};

Post.propTypes = {
    providerId: PropTypes.string, 
    setPostOpen: PropTypes.func,
    setProviderId: PropTypes.func,

};


export default Post;