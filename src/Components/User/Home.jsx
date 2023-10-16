import { useEffect, useState } from 'react'
import LoadingPost from '../CustomComponent/LoadingPost'
import { usersGet } from '../../Services/userApi'
import OnePost from '../OnePost'
import { useSelector } from 'react-redux'
import Button from '../CustomComponent/Button'
import { SlArrowDown } from 'react-icons/sl'
import Spinner from '../Spinner'
import SinglePost from '../SinglePost'

const Home = () => {

    const [loading,setLoading] = useState()
    const [postList,setPostList] = useState([])
    const [noMore,setMore] = useState(false)
    const [singlePost, setSinglePost] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const userData = useSelector((state) => state.user.userData);

    const getPost =async ({more})=>{
        more ?setLoading('morePost'):setLoading('post')
        await usersGet(`/all-post?skip=${postList.length}`).then((res)=>{
            res.postsList&&!res.noPost?setPostList([...postList,...res.postsList]):''
            res.noPost||res.postsList.length < 5 ?setMore(true):''
            setLoading('')
        })
    }

    const openPost = (post) =>{
        setSinglePost(true)
        setSelectedPost(post)
    }


    useEffect(()=>{
        getPost({more:false})
    },[])

    
  return (
    <div className='h-96 w-full maxw-screen'>
        <div className="grid md:mx-2 grid-cols-1 lg:grid-cols-6">
            <div className='flex mt-4 flex-col items-center  lg:col-span-4'>
                {loading == 'post'?
                    [1,2,3].map((val)=><LoadingPost key={1999+val}/>)  :
                    <div className='md:w-[30rem] sm:w-[28rem] w-[21rem] sm:p-0 p-3'>
                    {postList.length&&postList.map((post) => (
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
                    <div className='flex justify-center my-4'>
                        {
                            loading == 'morePost'?<Spinner className={'h-12 w-12'}/>
                            :!noMore?
                                <Button className={'text-center '} handelEvent={()=>getPost({more:true})} 
                                    content={<p className='flex items-center text-sm text-blue-600'>Show More<span><SlArrowDown className='text-blue-600 mx-2'/></span></p>}/>:''
                        }
                    </div>
                    </div>}

            </div>
            <div className='border-l w-full overflow-hidden hidden lg:block  border-gray-100 lg:col-span-2'>
                    <div  className="overflow-hidden bg-cover rounded-lg mx-auto cursor-pointer h-96 group mt-8 w-72 "
                      style={{ backgroundImage: `url('https://res.cloudinary.com/dq0tq9rf5/image/upload/v1690904935/u6k5hqrrwcnqjhro1qab.jpg')` }}>
                      <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                          <h2 className="mt-4 text-xl font-semibold text-white capitalize">Teccas Events</h2>
                          <a className="mt-2 text-lg tracking-wider text-indigo-200 uppercase" 
                         
                          >Visit Provider</a>
                      </div>
                  </div>
                    <div  className="overflow-hidden bg-cover mx-auto rounded-lg cursor-pointer h-96 group mt-8 w-72 "
                    style={{ backgroundImage: `url('https://res.cloudinary.com/dq0tq9rf5/image/upload/v1690904854/gil5yqxwxlnbmaesolls.jpg')` }}>
                    <div className="flex flex-col justify-center w-full h-full px-8 py-4 transition-opacity duration-700 opacity-0 backdrop-blur-sm bg-gray-800/60 group-hover:opacity-100">
                        <h2 className="mt-4 text-xl font-semibold text-white capitalize">Teccas Events</h2>
                        <a className="mt-2 text-lg tracking-wider text-indigo-200 uppercase" 
                        
                        >wisdeom Provider</a>
                    </div>
                  </div>

                  
            </div>
        </div>
        {singlePost?<SinglePost post={selectedPost} setPostsData={setPostList} setSelectedPost={setSelectedPost} setIOpenPost={setSinglePost} user={userData} role={'user'}/>:''}
    </div>
  )
}

export default Home