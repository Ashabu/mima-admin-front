import React, { useState, useEffect } from 'react';
import './commission.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Commissions from '../../Services/CommissionsService';

const Commission = () => {

    const [description, setDescription] = useState(undefined);
    const [imgUrl, setImgUrl] = useState('');
    const [revenue, setRevenue] = useState('')
   

    useEffect(() => {
        GetCommision();
    }, []);

    const GetCommision = () => {
        Commissions.GetCommisions()
        .then(res => {
            if(res.data.success) {
                console.log(res.data.data)
                setDescription(res.data.data.commissions[0].description);
                    setImgUrl(res.data.data.commissions[0].imgUrl);
                    setRevenue(res.data.data.commissions[0].revenue)
            } else {
                throw Error()
            }
        })
        .catch(err => {
            console.log(err)
        });
    };

    return (
        <AppLayout>
            <div className = 'cont-wrap'>
                <h1>Commissions Page</h1>
                <div className='cont-1'>
                  <img src = {imgUrl} />
                  <p>{description?.en}</p>
                  <p>{revenue}</p>
                </div>

            </div>

        </AppLayout>
    );
};

export default Commission;