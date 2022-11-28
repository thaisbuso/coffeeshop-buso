import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

import { ProvideAuth } from './hooks/useAuth';
import { ProvideMode } from './hooks/useMode';
import { ProvideCart } from './hooks/useCart';

import Topbar from './components/topbar/index';
import Sidebar from './components/sidebar/index';

import Products from './pages/Products';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import ModeSelect from './pages/ModeSelect';
import Checkout from './pages/Checkout';
import Admin from './pages/Admin';

const socket = io();

function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [navigationOpen, setNavigationOpen] = useState(false);

    const toggleDrawer = (open) => {
        return (event) => {
            if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
            }
            setNavigationOpen(open);
        }
    };

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
        };
    }, []);

    return (
        <ProvideAuth>
            <ProvideMode>
                <ProvideCart>
                    <Router>
                        <div className="app">
                            <Topbar toggleDrawer={toggleDrawer} />

                            <Routes>
                                <Route path='/' element={<Products />} />
                                <Route path='/login' element={<Login />} />
                                <Route path='/registro' element={<Signup />} />
                                <Route path='/pedidos' element={<Cart socket={socket} />} />
                                <Route path='/selecao' element={<ModeSelect />} />
                                <Route path='/confirma' element={<Checkout socket={socket} />} />
                                <Route path='/admin' element={<Admin socket={socket} />} />
                            </Routes>

                            <Sidebar toggleDrawer={toggleDrawer} navigationOpen={navigationOpen} />
                        </div>
                    </Router>
                </ProvideCart>
            </ProvideMode>
        </ProvideAuth>
    );
}

export default App;