import { Routes, Route,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import ProvidersPage from "../Pages/User/ProviderPage";
import HomePage from "../Pages/User/HomePage";
import PyamentPage from "../Pages/User/PyamentPage";
import OrderPage from "../Pages/User/OrderPage";
import ChatPage from "../Pages/User/ChatPage";
import CheckoutPage from "../Pages/User/CheckoutPage";
import SingleOrderPage from "../Pages/User/SingleOrderPage";
import SingleProviderPage from "../Pages/User/SingleProviderPage";
import Register from "../Components/User/Register";
import Login from "../Components/Login";
import OtpLogin from "../Components/OtpLogin";
import ProfilePage from "../Pages/User/ProfilePage";




const User = () => {
  const userAuth = Boolean(useSelector((state) => state.user.token));
  return (
    <Routes>
        <Route path="/chats"  element={userAuth ? <ChatPage/> : <Navigate to='/login'/>}/>
        <Route path="/order"  element={userAuth ? <SingleOrderPage/> : <Navigate to='/login'/>}/>
        <Route path="/orders"  element={userAuth ? <OrderPage/> : <Navigate to='/login'/>}/>
        <Route path="/payments"  element={userAuth ? <PyamentPage/> : <Navigate to='/login'/>}/>
        <Route path="/profile" element={userAuth ? <ProfilePage/> : <Navigate to='/login' /> }/>
        <Route path="/providers/:providerId" element={userAuth ? <SingleProviderPage/> : <Navigate to='/login' /> }/>
        <Route path="/providers" element={userAuth ? <ProvidersPage/> : <Navigate to='/login' /> }/>
        <Route path="/providers/checkout" element={userAuth ? <CheckoutPage/> : <Navigate to='/login' /> }/>
        <Route path="/otpLogin" element={userAuth ? <Navigate to='/' /> : <OtpLogin role='user'/> }/>
        <Route path="/login" element={userAuth ? <Navigate to='/' /> : <Login role='user'/> }/>
        <Route path="/register"  element={userAuth ? <Navigate to='/' /> : <Register />}/>
        <Route path="/" element={userAuth ? <HomePage/> :<Navigate to='/login'/>}/>

    </Routes>
  )
}

export default User