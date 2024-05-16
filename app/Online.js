import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const AdminPage = () => {
  const [onlineUsers, setOnlineUsers] = useState(0);
  const [userIPs, setUserIPs] = useState({});

  useEffect(() => {
    const socket = io();

    socket.on('updateUserCount', ({ onlineUsers, userIPs }) => {
      setOnlineUsers(onlineUsers);
      setUserIPs(userIPs);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const playNotificationSound = () => {
    const audio = new Audio('/mp3.mp3'); 
    audio.play();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
   
      <h2>Online: {onlineUsers}</h2>
      <ul>
        {userIPs && Object.keys(userIPs).map((key) => (
          <li key={key}>IP: {userIPs[key]}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
