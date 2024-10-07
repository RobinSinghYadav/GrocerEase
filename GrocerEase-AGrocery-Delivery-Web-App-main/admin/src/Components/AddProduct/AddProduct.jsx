import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'

const AddProduct = () => {
  const [image,setImage]=useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image:"",
    category:"Snacks",
    new_price:"",
    old_price:"",
    description:"",
  })
  const imageHandler =(e)=>{
      setImage(e.target.files[0]);
  }

  const changHandler =(e)=>{
      setProductDetails({...productDetails,[e.target.name]:e.target.value})
  }

  const Add_Product=async ()=>{
    console.log(productDetails);
    let responseData;
    let product = productDetails;

    let formData = new FormData();;
    formData.append('product',image);

    await fetch('https://grocerease-backend-k60z.onrender.com/upload',{
      method:'POST',
      headers:{
        Accept:'application/json',
      },
      body:formData,
    }).then((resp)=>resp.json()).then((data)=>{responseData=data});

    if(responseData.success){
      product.image=responseData.image_url;
      console.log(product);
      await fetch('https://grocerease-backend-k60z.onrender.com/addproduct',{
        method:'POST',
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify(product),
      }).then((resp)=>resp.json()).then((data)=>{
        data.success?alert("Product Added"):alert("Failed to Add")
      })
    }
  }


  return (
    <div className='add-product'>
        <div className="addproduct-itemfield">
            <p>Product Title</p>
            <input value={productDetails.name} onChange={changHandler} type="text" name='name' placeholder='Type Here!'/>
        </div>
        <div className="addproduct-price">
          <div className="addproduct-itemfield">
            <p>Price</p>
              <input value={productDetails.old_price} onChange={changHandler} type="text" name='old_price' placeholder='Type Here' />
            
          </div>
          
          <div className="addproduct-itemfield">
            <p>Offer Price</p>
              <input value={productDetails.new_price} onChange={changHandler} type="text" name='new_price' placeholder='Type Here' />
            
          </div>
          
        </div>
        <div className="addproduct-itemfield">
          <p>Product Category</p>
          <select value={productDetails.category} onChange={changHandler} name="category" className='add-product-selector'>
            <option value="Snacks">Snacks</option>
            <option value="Vegetables">Vegetables</option>
            <option value="HouseHolds">HouseHolds</option>

          </select>
        </div>
        <div className='addproduct-itemfield'>
          <p>Product Description</p>
          <textarea className='text-area' value={productDetails.description} onChange={changHandler} name='description' placeholder='Type Here' />
        </div>
        <div className="addproduct-itemfield">
          <label htmlFor="file-input">
            <img src={image?URL.createObjectURL(image):upload_area} className='addproduct-thumbnail-img' alt="" />
          </label>
          <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>
          <button onClick={()=>{Add_Product()}} className='addproduct-btn'>ADD</button>
        </div>
    </div>
  )
}

export default AddProduct
