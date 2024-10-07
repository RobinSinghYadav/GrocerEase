import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import order_list from '../../assets/parcel_icon.png';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get('https://grocerease-backend-k60z.onrender.com/list');
      if (response.data.success) {
        setOrders(response.data.data);
        console.log(response.data.data);
      } else {
        toast.error('Error');
      }
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const statusHandler = async (event,orderId)=>{
    const response = await axios.post("https://grocerease-backend-k60z.onrender.com/status",{
      orderId,
      status: event.target.value
    })
    if(response.data.success){
      await fetchAllOrders();
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={order_list} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, idx) => (
                  <span key={idx}>
                    {item.name} x {item.quantity}
                    {idx < order.items.length - 1 && ', '}
                  </span>
                ))}

              </p>
              <p className="order-item-name">
                {order.address.firstName+ " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street+","}</p>
                <p>{order.address.city+","+ order.address.state+","+order.address.country+","+order.address.zipCode}</p>
                
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
                <p>Items:{order.items.length}</p>
                <p>₹{order.amount}</p>
                <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>
                    <option value="Order Processing">Order Processing</option>
                    <option value="Out for delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
