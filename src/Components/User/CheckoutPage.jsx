import { useEffect, useState } from 'react'
import ServiceOptions from './ServiceOptions'
import CheckoutForm from './CheckoutForm'
import { useLocation, useNavigate } from 'react-router-dom'

const Checkout = () => {
  
  const [checkout,setCheckout] = useState(false)
  const [selectedOption, setSelectedOption] = useState([])
  const [provider, setProvider] = useState({})
  const location =  useLocation()
  const navigate =  useNavigate()
  const [orderDetails,setOrderDetails] = useState({
    customerId:'',
    providerId:"",
    name:'',
    email:'',
    date:'',
    mobile:'',
    address:{
        landmark:'',
        city:'',
        zip:'',
        district:''
    },
    option:[],
    grandTotal:''
})

  useEffect(() => {
    if(location.state){
        setProvider(location.state)
    }else navigate('/providers')
}, []);


  return (
    <>
      {checkout?<CheckoutForm setCheckout={setCheckout} orderDetails={orderDetails} setOrderDetails={setOrderDetails} selectedOption={selectedOption} provider={provider} setSelectedOption={setSelectedOption} />
        :<ServiceOptions setCheckout={setCheckout} selectedOption={selectedOption} provider={provider} setSelectedOption={setSelectedOption}/>
      }
    </>
  )
}

export default Checkout