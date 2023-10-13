import PropTypes from 'prop-types';
import ProfileHeader from '../Provider/ProfileHeader';
import { BiGridAlt } from "react-icons/bi";
import { useEffect, useState } from 'react';
import { MdMiscellaneousServices, MdOutlineReviews } from 'react-icons/md';
import ProfilePost from '../ProfilePost';
import OnePost from '../OnePost';
import Service from '../Service';
import Spinner from '../Spinner';
import { usersGet } from '../../Services/userApi';
import useWidthSize from '../../utils/useWidthSize';
import Button from '../CustomComponent/Button';
import { useSelector } from 'react-redux';
import SinglePost from '../SinglePost';
import OptionByService from '../OptionByService';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import RatingStats from '../RitingStars';
import RiviewsList from '../RiviewsList';


const SingleProvider = () => {

    const [activeTab, setActiveTab] = useState('post')
    const [providerData, setProviderDta] = useState({})
    const [loading, setLoding] = useState('')
    const [postList, setPostList] = useState([])
    const widthSize = useWidthSize();
    const [singlePost, setSinglePost] = useState(false);
    const [optionsByService, setOptionsByService] = useState(false);
    const [selectedService, setSelectedService] = useState({});
    const [selectedPost, setSelectedPost] = useState({});
    const userData = useSelector((state) => state.user.userData);
    const location = useLocation();
    const navigate = useNavigate();


    const getPosts = async (id)=>{
        setLoding('post')
        await usersGet(`/post?id=${id}`)
        .then((res)=>{
            res ? setPostList(res.postsList) : null
            setLoding('')

        }).catch((error)=>{
            console.log(error);
        })
    }

    const openPost = (post) =>{
        setSinglePost(true)
        setSelectedPost(post)
    }

    useEffect(() => {
        if(location&&location.state&&location.state.provider){
            setProviderDta(location.state?.provider)
            getPosts(location.state.provider?._id)
        }else navigate('/providers')
    }, []);

    return (
        <div className='w-full max-w-screen bg-white'>
            <ProfileHeader userId={userData?._id} providerData={providerData} role={'user'} />
            <div className="flex flex-row text-2xl gap-3 lg:text-xs items-center justify-evenly  border-t uppercase text-gray-400 tracking-widest h-16">
                        <a
                            className={`${
                                activeTab === "post"
                                    ? "text-black border-t border-black"
                                    : ""
                            } flex justify-center items-center h-full hover:text-black hover:border-t hover:border-black cursor-pointer`}
                            onClick={() => setActiveTab("post")}
                        >
                            <BiGridAlt />
                            <span className="hidden lg:inline-block ml-2">
                                Posts
                            </span>
                        </a>
                        <a
                            className={`${
                                activeTab === "service"
                                    ? "text-black border-t border-black"
                                    : ""
                            } flex justify-center items-center h-full hover:text-black hover:border-t hover:border-black  cursor-pointer`}
                            onClick={() => setActiveTab("service")}
                        >
                            <MdMiscellaneousServices  />
                            <span className="hidden lg:inline-block ml-2">
                                Services
                            </span>
                        </a>
                        <Button className={`${activeTab === "review"? "text-black border-t border-black": ""
                            } flex justify-center uppercase hover:text-black hover:border-t hover:border-black items-center h-full  cursor-pointer`}
                            handelEvent={() => setActiveTab("review")} 
                            content={<><MdOutlineReviews  />
                            <span className="hidden lg:inline-block ml-2">
                                reviews
                            </span></>}/>

            </div>
            {!loading ?(
            <div className="grid mx-2 mb-10 duration-300 xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-1 lg:gap-8">
                {activeTab == 'post' ?(postList.length !=0 ? (widthSize >= 768 ?postList.filter((post) => post.isBanned === false).map((post) => (
                    <ProfilePost
                        key={post._id}
                        post = {post}
                        handleEvent ={()=>openPost(post)}
                        // showCurrentPost={() => showCurrentPost(post)}
                        // image={post.image}
                    />
                )):
                <div className="bg-white pt-4 w-full px-2">
                    {postList.filter((post) => post.isBanned === false).map((post) => (
                        <OnePost
                            key={post._id}
                            post = {post}
                            handleEvent ={()=>openPost(post)}
                            user={userData}
                            role={'user'}
                            // showCurrentPost={() => showCurrentPost(post)}
                            // image={post.image}
                        />
                    ))}
                </div>):<div className="col-span-3 w-full text-center"> <p className="text-lg text-indigo-900">No posts</p></div>):activeTab == 'service' ?(providerData.services && providerData.services.map((val) => (
                    <Service key={val._id} service={val} onClick={()=>{setOptionsByService(true);setSelectedService(val)}}/> ))):activeTab == 'review'?(providerData.feedback&&providerData.feedback.length?
                        <><RatingStats key={uuidv4()} user_ratings={providerData.feedback}/>

                    {providerData.feedback.map((feedback)=><RiviewsList feedback={feedback}  key={uuidv4()}/>)}</>:<RatingStats user_ratings={[]} key={uuidv4()}/>)
                    :''}
            </div>):
            <div className="flex h-full items-center justify-center bg-white">
                <Spinner className={'h-28 w-28 '}/>
            </div>
        }

        {singlePost?<SinglePost post={selectedPost} setPostsData={setPostList} setSelectedPost={setSelectedPost} setIOpenPost={setSinglePost} user={userData} role={'user'}/>:''}
        {optionsByService?<OptionByService handleClose={()=>{setOptionsByService(false);setSelectedService({})}} service={selectedService} providerId={providerData._id}/>:''}

        </div>
    )
}

SingleProvider.propTypes = {
    providerData: PropTypes.object, // Define the expected type and mark it as required
    setViewProvider:PropTypes.func,
    setSelectedProvider:PropTypes.func
};


export default SingleProvider