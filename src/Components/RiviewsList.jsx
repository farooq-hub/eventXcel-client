import PropTypes from 'prop-types';
import  avatar  from "../assets/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg"
import StarRating from './StarRating ';


const RiviewsList = ({feedback}) => {
  return (
    <div key={feedback?._id}  className="mb-12 hover:shadow-lg hover:border-b duration-300 flex flex-col justify-between rounded-md p-4 md:mb-0 text-center">
            <div>

        <div className="h-28 overflow-hidden rounded-t-lg bg-black"></div>
          
            <img
                src={feedback?.userId?.image?feedback?.userId?.image:avatar}
          className="mx-auto -mt-12 w-32 h-32 rounded-full p-1 object-cover bg-gray-200"

                // className="w-32 h-32 rounded-full p-1 object-cover bg-gray-200 dark:shadow-black/30" 
                />
            <h5 className="text-lg font-semibold capitalize">{feedback?.userId?.name}</h5>
            <div className='flex items-center justify-center space-x-2'>
                <StarRating rating={feedback.rating}/><span className='text-xs font-mono'>({feedback.rating})</span>
            </div>
            <p className="my-2 px-2 lg:px-10 xl:px-16 whitespace-normal text-lg font-mono">&quot;<span className='text-sm font-serif'>{feedback.description}</span>&quot;</p>
            {/* <p className='flex items-center justify-center space-x-2'>
                <StarRating rating={feedback.rating}/><span className='text-xs font-mono'>({feedback.rating})</span>
            </p> */}
            </div>
            <div className='flex w-full items-end bottom-0 justify-end'>
                <p className='text-xs text-gray-500 leading-none tracking-tighter font-mono mr-2'>{(() => new Date(feedback.date).toLocaleDateString("en-US", {year: "numeric",month: "short",day: "numeric"}))()}</p>
                {/* <BiTrash className='mr-4 md:mr-0 lg:mr-16 text-lg text-gray-900 hover:text-red-500'/> */}
            </div>

            </div>
  )
}

RiviewsList.propTypes = {
  className: PropTypes.string,
  feedback:PropTypes.any 

};

export default RiviewsList

