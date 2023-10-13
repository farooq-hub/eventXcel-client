import { Routes, Route,Navigate} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../Components/Login"
import Register from "../Components/Provider/Register"
import ProviderHome from "../Pages/Provider/Home";
import ProfilePage from "../Pages/Provider/Profile";
import PostPage from "../Pages/Provider/Posts";
import OptionPage from "../Pages/Provider/OptionPage";
import OrderPage from "../Pages/Provider/OrderPage";
import SingleOrderPage from "../Pages/Provider/SingleOrderPage";


const Provider = () => {
  const providerAuth = Boolean(useSelector((state) => state.provider.token));

  return (
    <Routes>
        <Route path="/order"  element={providerAuth ? <SingleOrderPage/> : <Navigate to='/provider/login'/>}/>
        <Route path="/orders"  element={providerAuth ? <OrderPage/> : <Navigate to='/provider/login'/>}/>
        <Route path="/login" element={providerAuth ? <Navigate to='/provider/' /> : <Login role='provider'/> }/>
        <Route path="/register" element={providerAuth ? <Navigate to='/provider/' /> : <Register/> }/>
        <Route path="/home" element={providerAuth ? <ProviderHome/> : <Navigate to='/provider/login' />}/>
        <Route path="/profile" element={providerAuth ? <ProfilePage/> : <Navigate to='/provider/login' />}/>
        <Route path="/post" element={providerAuth ? <PostPage/> : <Navigate to='/provider/login' />}/>
        <Route path="/option" element={providerAuth ? <OptionPage/> : <Navigate to='/provider/login' />}/>
        <Route path="/" element={providerAuth ? <ProviderHome/> : <Login role='provider'/>}/>
    </Routes>
  )
}
export default Provider
