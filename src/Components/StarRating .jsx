import { useState } from "react";
import PropTypes from 'prop-types';


const StarRating = ({setRating,rating,className,role}) => {
   
    const [hover, setHover] = useState(0);
    return (
      <div className={`${className?className:''}`}>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              style={{color: index <= (hover || rating) ? '#0b57cf' : '#ccc'}
              }
              className={`bg-transparent border-none outline-none cursor-pointer`}
              onClick={role == 'addFeedback'?() => setRating(index):null}
              onMouseEnter={role == 'addFeedback'?() => setHover(index):null}
              onMouseLeave={role == 'addFeedback'?() => setHover(rating):null}
            >&#9733;
            </button>
          );
        })}
      </div>
    );
  };

  StarRating.propTypes = {
    rating:PropTypes.any,
    role: PropTypes.string,
    className: PropTypes.string,
    setRating:PropTypes.func // Define the expected type and mark it as required

};

export default StarRating