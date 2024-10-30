import React, { useEffect, useState } from 'react';
import '../Asset/CSS/home.css';

function Home() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        const fetchTasks = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/agenda', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch tasks');
                }

                const data = await response.json();
                setTasks(data); // Assuming the tasks come in an array under "tasks"
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Call the fetchTasks function
        fetchTasks();
    }, []);

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div className='error-msg'>Error: {error}</div>;
    }

    return (
        <div className="home-container">
            <div className="tasks-section">
                <h1>Welcome to Admin Page</h1>
                <p>Total Tasks: {tasks?.length}</p>
                <div className="tasks-container">
                    {tasks?.map((task, index) => {
                        const dateWithFormate = new Date(task.date).toLocaleDateString();
                        return (
                            <div className="task-card" key={index + 1}>
                                <img src={`images/${task?.agendaTypes}.png`} alt={task.title} className="task-image" />
                                <h2>{`Task ${index + 1}: ${task.agendaTypes}`}</h2>
                                <p>Customer Name: {task.customerId.customerName}</p>
                                <p>Customer Address: {task.customerId.customerAddress}</p>
                                <p>Task is assigned to: {task.assigneeId.firstName}</p>
                                <p>Date: {dateWithFormate}</p>
                            </div>
                        )

                    }
                    )}
                </div>
            </div>
        </div>
    );
}

export default Home;
