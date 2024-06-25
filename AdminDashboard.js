import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Import jwtDecode directly from jwt-decode
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [pendingAdmins, setPendingAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchPendingAdminRequests();
    }, []);

    const fetchPendingAdminRequests = async () => {
        setLoading(true);
        try {
            const token = getToken();
            const decodedToken = jwtDecode(token); // Use jwtDecode function
            console.log('Decoded Token:', decodedToken);

            const response = await axios.get('http://localhost:3000/api/admin/pending-requests', {
                headers: { Authorization: `Bearer ${token}` }
            });
            setPendingAdmins(response.data);
        } catch (error) {
            handleRequestError(error);
        } finally {
            setLoading(false);
        }
    };

    const getToken = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        return token;
    };

    const handleApprove = async (userId) => {
        try {
            const token = getToken();
            const response = await axios.post('http://localhost:3000/api/admin/approve-request', { userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingAdminRequests();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleDeny = async (userId) => {
        try {
            const token = getToken();
            const response = await axios.post('http://localhost:3000/api/admin/deny-request', { userId }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchPendingAdminRequests();
        } catch (error) {
            handleRequestError(error);
        }
    };

    const handleRequestError = (error) => {
        console.error('API Error:', error);
        if (error.response && error.response.data && error.response.data.message) {
            setErrorMessage(`Request failed: ${error.response.data.message}`);
        } else {
            setErrorMessage(`Request failed: ${error.message}`);
        }
    };

    return (
        <div className="admin-dashboard">
            <h2>Admin Dashboard</h2>
            <h3>Pending Admin Requests</h3>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul>
                    {pendingAdmins.map(admin => (
                        <li key={admin._id}>
                            {admin.email} - {admin.userId}
                            <button onClick={() => handleApprove(admin._id)}>Approve</button>
                            <button onClick={() => handleDeny(admin._id)}>Deny</button>
                        </li>
                    ))}
                </ul>
            )}
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    );
};

export default AdminDashboard;
