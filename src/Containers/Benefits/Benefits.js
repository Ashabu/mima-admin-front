import React, { useState, useEffect, useContext } from 'react';
import './benefits.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Benefit from '../../Services/BenefitsServices';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import { AppContext } from '../../Context/AppContext';

const Benefits = () => {

    const [benefits, setBenefits] = useState([]);
    const [singleBenefitData, setSingleBenefitData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    
    const {activeLang} = useContext(AppContext);

    useEffect(() => {
        GetBenefits();
    }, []);

    const GetBenefits = () => {
        Benefit.GetBenefits()
        .then(res => {
            if(res.data.success) {
                console.log(res.data.data.benefits)
                setBenefits(res.data.data.benefits);
                    
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
              <ActionModal
                show={showModal}
                onHideModal={() => { setSingleTestimonialData(null); setShowModal(false) }}
                type={actionType}
                data={singleTestimonialData}
                onEditData={handleNewTestimonial}
                onDeleteData={handleDeleteTestimonial}
                loading={btnLoading} />
                
            <div className = 'cont-wrap'>
                <h1>Benefits Page</h1>
                {benefits?.map((b, i) => (
                    <div className='cont-1' key={i}>
                    <img src = {b.imgUrl} />
                    <p>{b.description?.en}</p>
                  </div>
                ))}
                

            </div>

        </AppLayout>
    );
};

export default Benefits;