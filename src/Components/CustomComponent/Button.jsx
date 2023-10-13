import React from 'react'
import PropTypes from 'prop-types';


const Button = ({content,type,className,handelEvent}) => {
  return (
    <>
        <button type={type} className={className}  onClick={handelEvent}>{content}</button>
    </>
  )
}

Button.propTypes = {
    content: PropTypes.any, // Define the expected type and mark it as required
    onClick:PropTypes.func,
    className:PropTypes.string,
    type:PropTypes.string,
    handelEvent:PropTypes.func,


};
export default Button