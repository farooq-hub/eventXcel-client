import { useState } from 'react'
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import PropTypes from 'prop-types';
import { providerPatch } from '../../Services/providerApi';


const PostUpdate = ({setPostEdit,editPost,setPostsList}) => {


    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [caption, setCaption] = useState(editPost.caption);
    const [tagline, setTagline] = useState(editPost.tagline);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(caption);
        const errors =await validateFormData();
        if (!errors) {
            setLoading(true)
            try {
                await providerPatch(`/post?postId=${editPost._id}`,{caption,tagline}).then((res)=>{
                    res && res.postData?setPostsList((prev) =>
                    prev.map((data) => {
                        if (data._id === editPost._id) {
                            data.caption = data.caption !== caption?caption:data.caption;
                            data.tagline = data.tagline !== tagline?tagline:data.tagline;
                            console.log(data);
                        } 
                        return data
                    })):''
                    setLoading(false);
                    closeUpdatePost()
                }).catch((error)=> {console.log(error)})
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
    };

    const validateFormData = () => {
        if (caption.trim().length ==0) {
            toast.warn('Add Caption for post');
            setError('Add Caption for post')
            return true;
        }else if (tagline == editPost.tagline && caption == editPost.caption) {
            toast.warn("Didn't found any update");
            setError("Didn't found any update")
            return true;
        }else {
            setError('')
            return false
        }
    };

    const closeUpdatePost = ()=>{
        setPostEdit(false)
        setCaption('')
        setTagline('')
        setLoading(false)
    }


  return (
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">

    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl sm:max-w-sm rounded-xl -bg-gray-900 sm:my-8 sm:w-full sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="Caption" className="block text-sm text-gray-500 -text-gray-300 mt-4">Caption</label>
                        <textarea className="border-2 border-slate-300 w-full h-24" name="caption" id=""  value={caption} onChange={(e)=>setCaption(e.target.value)}/>
                    </div>                                    
                    <div>
                        <label htmlFor="tagline" className="block text-sm text-gray-500 -text-gray-300 mt-4">Hash Tag</label>
                        <textarea  className="border-2 border-slate-300 w-full text-blue-600" id="" value={tagline}  name="tagline"  onChange={(e)=>setTagline(e.target.value)} placeholder="#new #party"/>
                    </div>
                    <p className='text-center text-sm text-red-600'>{error}</p>
                    <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                        <button
                            type='button'
                            onClick={closeUpdatePost}
                            className="px-4 sm:mx-2 w-full py-2.5 text-sm font-medium tracking-wide text-black capitalize transition-colors duration-300  border border-gray-200 rounded-md hover:bg-gray-200 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                        >Cancel</button>
                        <button
                            type="submit" className={`${loading ?'bg-white border border-gray-200':'bg-slate-700 rounded-md hover:bg-slate-500'}px-4 sm:mx-2 w-full py-2.5 mt-3 sm:mt-0 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform `}
                        >
                            {loading ?<Spinner className={'h-4 w-4 '}/> : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>   
        </div>
    </div>
    </div>
  )
}


PostUpdate.propTypes = {
    setPostEdit:PropTypes.func,
    setPostsList:PropTypes.func,
    editPost:PropTypes.object,
    // setCommentsList:PropTypes.func,

};

export default PostUpdate