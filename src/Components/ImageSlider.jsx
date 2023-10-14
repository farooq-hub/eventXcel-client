import PropTypes from 'prop-types';
import { GrNext, GrPrevious } from 'react-icons/gr';



const ImageSlider = ({images,height,width,manageIndex,currentIndex,object,onClick}) => {


    const nextImage = () => {
        console.log(currentIndex);
        manageIndex((prevIndex) => Math.floor((prevIndex + 1) % images.length));
    };
    
    const prevImage = () => {
        manageIndex((prevIndex) =>
            prevIndex === 0 ? Math.floor(images.length - 1) : Math.floor(prevIndex - 1)
        );
    };
  return (
    <>
        {images.length > 0 ? 
            <div className="relative w-full max-w-screen-lg mx-auto">
                <div className={`relative ${height ? height : 'h-auto'} ${width ? width : 'w-auto'} overflow-hidden `}>
                {Array.from(images).map((image, index) => (
                    <img
                    loading="lazy"
                    key={index}
                    src={image instanceof File ? URL.createObjectURL(image) :  image}
                    alt="Slider Image"
                    onClick={onClick?onClick:null}
                    className={`w-full h-auto  top-0 left-0 transition-opacity duration-500 bg-gray-100 ${object?object:''} ease-in-out ${
                        index === currentIndex ? 'opacity-100' : 'opacity-0 absolute'
                    }`}
                    />
                ))}
                { images.length > 1 &&
                    <>
                        <button
                        className="absolute left-1 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 opacity-70 rounded-full cursor-pointer"
                        onClick={(e)=>{e.stopPropagation(); prevImage()}}
                        ><GrPrevious /></button>
                        <button
                        className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 bg-gray-200 opacity-70 rounded-full cursor-pointer"
                        onClick={(e)=>{e.stopPropagation(); nextImage()}}
                        ><GrNext/></button>
                    </>
                }

                </div>
            </div>
        :''}
    </>
  )
}

ImageSlider.propTypes = {
    images: PropTypes.array.isRequired, // Define the expected type and mark it as required
    width: PropTypes.string, // Define the expected type and mark it as required
    height: PropTypes.string, // Define the expected type and mark it as required
    manageIndex: PropTypes.func, // Define the expected type and mark it as required
    currentIndex: PropTypes.number, // Define the expected type and mark it as required
    object:PropTypes.string,
    onClick:PropTypes.any

};



export default ImageSlider