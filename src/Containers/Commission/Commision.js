import React, { useState, useEffect, useContext } from 'react';
import './commission.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Commissions from '../../Services/CommissionsService';
import { AppContext } from '../../Context/AppContext';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';

const Commission = () => {

    const [commission, setCommission] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');



    const { activeLang } = useContext(AppContext)
    useEffect(() => {
        if (commission !== undefined) {
            setIsLoading(false);
        }

    }, [commission]);

    useEffect(() => {
        GetCommision();
    }, []);

    const GetCommision = () => {
        Commissions.GetCommisions()
            .then(res => {
                if (res.data.success) {
                    
                    setCommission(res.data.data.commissions[0]);
                    setIsLoading(false);
                } else {
                    throw Error()
                }
            })
            .catch(err => {
                console.log(err)
            });
    };


    const handleNewCommission = (data) => {
        setBtnLoading(true);

        if (actionType == 'EDIT') {
            let newData = { ...commission }
            newData.title[activeLang] = data.description;;
            if (data.imgUrl) {
                newData.imgUrl = data.imgUrl;
            };
            Commissions.EditCommision(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetCommision();
                } else {
                    setBtnLoading(false);
                };
            })
                .catch(e => {
                    console.log(e);
                });
        } else {
            let newData = {
                description: {
                    en: '',
                    ru: '',
                },
               
                imgUrl: data.imgUrl
            };
            newData.description[activeLang] = data.description;
            Commissions.CreateCommision(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        GetCommision();
                    } else {
                        setBtnLoading(false);
                        setResponseMessage(res.data.errorMessage.message);
                    };
                })
                .catch(e => {
                    setBtnLoading(false);
                    console.log(e);
                });
        };
    };


    
    const handleDeleteComission = () => {
        setBtnLoading(true);
        Commissions.DeleteCommision(commission._id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetCommision();
            } else {
                setBtnLoading(false);
                setResponseMessage(res.data.errorMessage.message);
            };
        })
        .catch(e => {
            setBtnLoading(false);
            console.log(e);
        });
    };



    return (
        <AppLayout>
            <ActionModal
                withImg
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={commission}
                onEditData={handleNewCommission}
                onDeleteData={handleDeleteComission}
                loading={btnLoading} />
            {isLoading ? <div>Loading......</div>
                :
                <div className='cont-wrap'>
                    <h1>Commissions Page</h1>
                    <div className='cont-1'>
                        <img src={commission?.imgUrl} />
                        <p style={{ fontSize: 24, maxWidth: '100ch' }}>{commission?.description[activeLang]}</p>
                        {/* <p>{commission?.revenue}</p> */}
                        <div className='list-wrap'>
                        <div className='action-icons' >
                            <AppButton
                                buttonClass='button-add'
                                onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                                დამატება
                            </AppButton>
                            <img  src='../../Assets/Images/edit-icon.png' onClick={() => { setActionType('EDIT'); setShowModal(true) }} />
                            <img  src='../../Assets/Images/delete-icon.png' alt='icon' onClick={() => { setActionType('DELETE'); setShowModal(true) }} />
                        </div>
                    </div>
                    </div>
                    
                </div>}

        </AppLayout>
    );
};

export default Commission;