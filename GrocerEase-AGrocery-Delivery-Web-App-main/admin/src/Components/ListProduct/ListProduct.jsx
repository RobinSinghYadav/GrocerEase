import React, { useEffect, useState } from 'react';
import './ListProduct.css';
import cross_icon from '../../assets/cross_icon.png';

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: '',
    old_price: '',
    new_price: ''
  });

  const fetchInfo = async () => {
    await fetch('https://grocerease-backend-k60z.onrender.com/allproducts')
      .then((res) => res.json())
      .then((data) => { setAllProducts(data) });
  }

  useEffect(() => {
    fetchInfo();
  }, []);

  const remove_product = async (id) => {
    await fetch('https://grocerease-backend-k60z.onrender.com/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: id })
    });
    await fetchInfo();
  }

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditFormData({
      name: product.name,
      old_price: product.old_price,
      new_price: product.new_price
    });
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  }

  const handleSaveClick = async (id) => {
    await fetch('https://grocerease-backend-k60z.onrender.com/updateproduct', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        name: editFormData.name,
        old_price: editFormData.old_price,
        new_price: editFormData.new_price
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setEditProductId(null);
        fetchInfo(); // Refresh the list of products
      } else {
        console.error('Error:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  }

  return (
    <div className='list-product'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Actions</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => (
          <React.Fragment key={index}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image} alt="" className='listproduct-product-icon' />
              {editProductId === product.id ? (
                <>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="listproduct-edit-input"
                  />
                  <input
                    type="text"
                    name="old_price"
                    value={editFormData.old_price}
                    onChange={handleEditChange}
                    className="listproduct-edit-input"
                  />
                  <input
                    type="text"
                    name="new_price"
                    value={editFormData.new_price}
                    onChange={handleEditChange}
                    className="listproduct-edit-input"
                  />
                  <button onClick={() => handleSaveClick(product.id)} className="listproduct-save-button">Save</button>
                </>
              ) : (
                <>
                  <p>{product.name}</p>
                  <p>₹{product.old_price}</p>
                  <p>₹{product.new_price}</p>
                </>
              )}
              <p>{product.category}</p>
              <div className="listproduct-actions">
                <button onClick={() => handleEditClick(product)} className={`listproduct-edit-button ${editProductId === product.id ? 'hidden' : ''}`}>Edit</button>
                {editProductId === product.id && <button onClick={() => setEditProductId(null)} className="listproduct-cancel-button">Cancel</button>}
                <img onClick={() => { remove_product(product.id) }} className='listproduct-remove-icon' src={cross_icon} alt="" />
              </div>
            </div>
            <hr />
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

export default ListProduct;
