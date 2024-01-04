import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('user');
        if (loggedInUser) {
            const foundUser = JSON.parse(loggedInUser);
            setUser(foundUser);
        }
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const fetchProgress = async () => {
        try {
            const res = await axios.get(`/api/users/${user._id}/progress`);
            setUser(prevState => ({
                ...prevState,
                progress: res.data
            }));
        } catch (err) {
            setError('Failed to fetch progress.');
        }
    };

    useEffect(() => {
        if (user) {
            fetchProgress();
        }
    }, [user]);

    return (
        <div className="dashboard">
            <h2>Welcome, {user ? user.username : ''}</h2>
            {user && (
                <div>
                    <h3>Your Progress</h3>
                    {/* Display user progress here */}
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
            {!user && <p>Please log in.</p>}
            {error && <p className="error">{error}</p>}
        </div>
    );
}

export default Dashboard;
