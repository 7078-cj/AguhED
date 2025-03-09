import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();


export default AuthContext


export function AuthProvider({children}) {
    const [authTokens, setAuthTokens] = useState(
        JSON.parse(localStorage.getItem('authTokens')) || null
    );

    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem('user')) || null
    );
    const nav = useNavigate()

    const url = "http://127.0.0.1:8000/api/";

    const loginUser = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(url + 'token/', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
            });

            if (response.ok) {
                const data = await response.json();
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                localStorage.setItem('user', JSON.stringify(jwtDecode(data.access)));
                nav('/');
            } else {
                // Handle login error (e.g., show an error message)
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const updateToken = async () => {
        try {
            const response = await fetch(url+'token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'refresh': authTokens.refresh }),
            });

            if (response.ok) {
                const data = await response.json();
                setAuthTokens(data);
                setUser(jwtDecode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                localStorage.setItem('user', JSON.stringify(jwtDecode(data.access)));
            } else {
                logoutUser();
            }
        } catch (error) {
            console.error('Error updating tokens:', error);
        }
    };

    useEffect(() => {
        let interval = setInterval(() => {
            if (authTokens) {
                updateToken();
            }
        }, 600000); // Refresh token every 10 minutes

        return () => clearInterval(interval);
    }, [authTokens]);

    const logoutUser = () => {
        setUser(null);
        setAuthTokens(null);
        localStorage.removeItem('authTokens');
        localStorage.removeItem('user');
    }


    var context = {
        loginUser:loginUser,
        logOut:logoutUser,
        user:user,
        authTok:authTokens,
        



    }
    return (
      <AuthContext.Provider value={context}>
        {children}
      </AuthContext.Provider>
    )
  }
  