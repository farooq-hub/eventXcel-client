import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useState } from 'react';
import StarRating from './StarRating ';
import { v4 as uuidv4 } from 'uuid';

function RatingStats({user_ratings}) {

  const [rating,setRaiting] = useState([]) 
  
  useEffect(()=>{
    if(user_ratings){

      setRaiting(user_ratings.reduce((accumulator, current) => {
        const rating = current.rating;
        if (rating >= 1 && rating <= 5) {
          accumulator[rating - 1].count++;
        }
        return accumulator;
        }, [
          { stars: 1, count: 0 },
          { stars: 2, count: 0 },
          { stars: 3, count: 0 },
          { stars: 4, count: 0 },
          { stars: 5, count: 0 }
        ]))
        console.log(Math.floor(user_ratings?.reduce((accumulator, current) =>accumulator + current.rating,0)/5));
      }

  },[user_ratings])
  return (
    <div className='flex flex-col space-y-2 p-4 my-auto w-full h-96' key={uuidv4()}>
    <p className='mx-2 text-2xl font-serif mb-4  text-center'>Total Rating</p>

    <div className='flex items-center mx-auto space-x-2'>
    <StarRating rating={user_ratings&&user_ratings.length?Math.floor(user_ratings?.reduce((accumulator, current) =>accumulator + current.rating,0)/user_ratings.length):0}  
    className={'text-4xl'}/><span className='leading-none font-mono'>({user_ratings.length?user_ratings?.reduce((accumulator, current) =>accumulator + current.rating,0)/user_ratings.length:0})</span>
    </div>
    <p className='ml-2 leading-none text-center text-gray-900 font-mono'>{user_ratings.length?user_ratings.length:0} reviews</p>
    <div className='mx-auto space-y-3 '>
      {rating.map((rating) => (<>
        <div className="flex items-center" key={uuidv4()}>
          <a
            href="#"
            className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
          >
            {rating?.stars}
          </a>
          <div className="w-56 md:w-80 h-5 mx-4 bg-gray-100 rounded">
            <div
              className={`h-4 bg-blue-600 rounded`}
              style={{ 
                width: `${user_ratings.length?(rating?.count/user_ratings.length)*100:0}%`
              }}
            ></div>
          </div>
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {Math.floor(rating?.count)}
          </span>
        </div>
        </>
      ))}
    </div>
    <p className="text-gray-700 underline italic mx-auto">Add riview and riting in from your order details.</p>
    </div>
  );
}

RatingStats.propTypes = {
  className: PropTypes.string,
  user_ratings:PropTypes.any // Define the expected type and mark it as required

};


export default RatingStats;