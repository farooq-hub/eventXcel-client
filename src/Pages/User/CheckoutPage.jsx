import Checkout from "../../Components/User/CheckoutPage";
import Sidebar from "../../Components/User/Sidebar";

const CheckoutPage = () => {
    return (

        <div className=''>
            <Sidebar/>

            <div className=' md:ml-64 lg:ml-64 bg-white'>
                <Checkout/>
            </div>
        </div>

    );
};
export default CheckoutPage