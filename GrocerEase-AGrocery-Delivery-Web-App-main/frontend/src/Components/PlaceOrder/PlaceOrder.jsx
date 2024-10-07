import React, { useContext,  useState } from 'react'
import './PlaceOrder.css'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios';

const PlaceOrder = () => {
    const {getTotalCartAmount,token,all_product,cartItems}=useContext(ShopContext)
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipCode:"",
        country:"",
        phone:""
    })

    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }

  const placeOrder = async (event)=>{
    event.preventDefault();
    let orderItems =[];
    all_product.map((item)=>{
        if(cartItems[item.id]>0){
            let itemInfo = item;
            itemInfo["quantity"]=cartItems[item.id];
            orderItems.push(itemInfo);
        }
    })
    let orderData={
        address:data,
        items:orderItems,
        amount:getTotalCartAmount()
    }
    let response = await axios.post("https://grocerease-backend-k60z.onrender.com/place",orderData,{headers:{
        Accept:'application/form-data',
          'auth-token':`${localStorage.getItem('auth-token')}`,
          'Content-Type': 'application/json',
    }});
    if (response.data.success){
        const{session_url}=response.data;
        window.location.replace(session_url);
    }
    else{
        alert("Error");
    }
  }

  return (
    <form onSubmit={placeOrder} className='place-order mt-[16vh]'>
       <div className="place-order-left">
        <p className='title'>
            Delivery Information
        </p>
        <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'/>
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last Name'/>
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'/>
        <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>

        <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'/>
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'/>
        </div>
        <div className="multi-fields">
            <input required name='zipCode' onChange={onChangeHandler} value={data.zipCode} type="text" placeholder='Zip Code'/>
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'/>
        </div>
        <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'/>
        </div> 

        <div className="place-order-right">
        <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div >
                    <div className="cartitems-total-item">
                    <p>Subtotal</p>
                    <p>₹{getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                    <p>Shipping Fee</p>
                    <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                    <h3>Total</h3>
                    <h3>₹{getTotalCartAmount()}</h3>
                    </div>
                <div/>
            
            </div>
            <button className='place rounded-md' type='submit'>PROCEED TO Payment</button>
            </div>
        </div>
    </form>
  )
}

export default PlaceOrder
