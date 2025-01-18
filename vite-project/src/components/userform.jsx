import React, { useState } from 'react';
import '../styles/userform.css';
import axios from 'axios';



const UserForm = () => {
  const [name, setName] = useState('');
  const [handle, setHandle] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('socialMediaHandle', handle);
    Array.from(images).forEach((image) => formData.append('images', image));

      await axios.post(`${import.meta.env.VITE_API_URL}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setName('');
      setHandle('');
      setImages([]);
  };

  return (
    <div>
      <h1>User Submission Form</h1>
      <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <label htmlFor="">Social Media Handle:</label>
        <input
          type="text"
          value={handle}
          onChange={(e) => setHandle(e.target.value)}
          required
        />
        <label htmlFor="image">Upload Images:</label>
        <input
          type="file"
          multiple
          onChange={(e) => setImages(e.target.files)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default UserForm;
