import  { useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import PropTypes from 'prop-types';


 const ProfilePost = ({post,handleEvent}) => {

    // const { image, showCurrentPost } = props;

    return (
        <div
        className="relative overflow-hidden w-full pt-[100%] group"
        onMouseEnter={(e) => e.currentTarget.classList.add('hover:overlay-visible')}
        onMouseLeave={(e) => e.currentTarget.classList.remove('hover:overlay-visible')}
        onClick={handleEvent}
      >
        <img
          loading="lazy"
          src={post.postImages[0]}
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div
          className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity`}
        >
          <AiFillHeart icon={"heart"} className="text-lg" />{" "}
          <span className="ml-2 text-lg">{post.likes.length}</span>
        </div>
      </div>
    );
}

ProfilePost.propTypes = {
    post: PropTypes.object,
    handleEvent: PropTypes.func
};
export default ProfilePost