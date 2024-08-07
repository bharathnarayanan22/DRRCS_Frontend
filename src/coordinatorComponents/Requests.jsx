import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendRequest } from "../redux/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [location, setLocation] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(sendRequest({ type, quantity, location }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="type">Type:</label>
      <input
        type="text"
        id="type"
        name="type"
        value={type}
        onChange={(event) => setType(event.target.value)}
      />

      <label htmlFor="quantity">Quantity:</label>
      <input
        type="number"
        id="quantity"
        name="quantity"
        value={quantity}
        onChange={(event) => setQuantity(event.target.value)}
      />

      <label htmlFor="location">Location:</label>
      <input
        type="text"
        id="location"
        name="location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />

      <button type="submit">Send Request</button>
    </form>
  );
};

export default Requests;