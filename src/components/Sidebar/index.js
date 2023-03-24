import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Header from '../Header'
import './nav.css'
import Call from '../../images/phone-receiver-silhouette.png';
import Archived from '../../images/archive.png';

function Sidebar() {
    const location = useLocation();

    return (
        <nav>
            <Header />
            <ul>
                <li>
                    <Link
                        className={`link ${location.pathname === '/' ? 'active' : ''
                            }`}
                        to="/">
                        <img src={Call} alt="Activity" />
                        Activity Feed</Link>
                </li>
                <li>
                    <Link
                        className={`link ${location.pathname === '/archived' ? 'active' : ''
                            }`}
                        to="/archived">
                        <img src={Archived} alt="Archived" />
                        Archived Calls</Link>
                </li>
                <span className='border-indicator'
                    style={{ top: location.pathname === '/archived' ? '52px' : '0px' }}
                />
            </ul>
        </nav>
    );
}

export default Sidebar;
