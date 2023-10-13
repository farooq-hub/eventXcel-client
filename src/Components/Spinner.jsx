import PropTypes from 'prop-types';

const Spinner = ({className}) => {
  return (
    <div className={``}>
        <div className="flex justify-center items-center h-full">
        <img className={` ${className ? className :''}`} src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" alt=""/>
        </div>
    </div>
  )
}

Spinner.propTypes = {
    className:PropTypes.string
};

export default Spinner