import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/admin.css';

const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      
        const response = await axios.get(`${import.meta.url.REACT_APP_API_URL}`);
        setSubmissions(response.data);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-wrapper">
      <h2 className="dashboard-title">Admin Dashboard</h2>
      {submissions.length === 0 ? (
        <p>No data</p>
      ) : (
        submissions.map((user) => (
          <div className="user-card" key={user.id}>
            <div className="user-details">
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Social Media Handle:</strong> {user.socialMediaHandle}</p>
            </div>
            <div className="image-list">
              {user.imageBase64Array.map((image, idx) => (
                <img key={idx}
                src={`data:image/jpeg;base64,${image}`}
                alt={`Upload ${idx}`} className="image-item" />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminDashboard;
