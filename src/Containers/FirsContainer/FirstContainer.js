import React, { useState, useEffect, useContext } from 'react';
import './firstContainer.scss';
import { AppContext } from '../../Context/AppContext';
import AppLayout from '../../Components/AppLayout/AppLayout';

import Affiliate from '../../Services/AffiliateService';
import ActionModal from '../../Components/UI/Modals/ActionModal';

const FirstContainer = () => {

    const [showModal, setShowModal] = useState(false);
    const [mainInfo, setMainInfo] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [actionType, setActionType] = useState('');
    const [actionData, setActionData] = useState({});

    const {activeLang} = useContext(AppContext);


    useEffect(() => {
        GetMainInfo();
    }, []);

    useEffect(() => {
        if (mainInfo !== undefined) {
            setIsLoading(false);
        }
        
    }, [mainInfo]);

    const GetMainInfo = () => {
        Affiliate.GetAffiliateInfos()
            .then(res => {
                if (res.data.success) {
                    setMainInfo(res.data.data.data)
                } else {
                    throw Error()
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    console.log(activeLang)

    
    return (

        <AppLayout>
            <ActionModal 
            show = {showModal} 
            onHideModal = {() => setShowModal(false)} 
            type = {actionType}
            data = {actionData}
            />

            {isLoading ? <div>Loading......</div>
                :
                <div className='cont-wrap'>
                    <h1>First Container Page</h1>
                    <div className='cont-1'>
                       { mainInfo[0].imgUrl !== ''? <img src={mainInfo[0]?.imgUrl} onClick={() => setShowModal(true)} />: null}
                        {mainInfo[0].title.activeLang !== ''?  <div className='list-wrap'>
                            <p style={{ fontSize: 24 }}>{mainInfo[0]?.title?.[activeLang]}</p>
                            <div className='action-icons'>
                                <img src='../../Assets/Images/edit-icon.png' onClick={() => {setActionType('EDIT'); setActionData({title: mainInfo[0].title}); setShowModal(true); }}/>
                                <img src='../../Assets/Images/delete-icon.png' onClick={() => {setActionType('DELETE'); setShowModal(true)}} />
                            </div>
                        </div> : null}
                       {mainInfo[0]?.subTitle? 
                       <div className='list-wrap'>
                            <p style={{ fontSize: 18 }}>{mainInfo[0]?.subTitle?.[activeLang]}</p>
                            <div className='action-icons'>
                                <img src='../../Assets/Images/edit-icon.png' onClick={() => {setActionType('EDIT'); setActionData({title: mainInfo[0]?.subTitle}); setShowModal(true)}}/>
                                <img src='../../Assets/Images/delete-icon.png' onClick={() => {setActionType('DELETE'); setShowModal(true)}}/>
                            </div> 
                        </div>
                        : null}
                    </div>
                </div>
            }
        </AppLayout>
    );
};

export default FirstContainer;