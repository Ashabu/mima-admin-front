import React from 'react';
import { Link } from 'react-router-dom';
import './navigationPanel.scss'

const NavigationPanel = () => {
    return (
        <div className='nav-panel'>
            <Link to='faqs'>FAQs</Link>
            <Link to='testimonials'>Testimonials</Link>
            <Link to='partners'>Partners</Link>
            <Link to='users'>Users</Link>
        </div>
    );
};

export default NavigationPanel;