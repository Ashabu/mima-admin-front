import React, { useState, useEffect } from 'react';
import AppLayout from '../../Components/AppLayout/AppLayout';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';
import Links from '../../Services/CommonServices';

const HomePage = () => {

    const [link, setLink] = useState(undefined);
    const [showModal, setShowModal] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');

    useEffect(() => {
        handleGetSkypeLink();
    }, [])

    const handleGetSkypeLink = () => {
        Links.GetLinks().then(res => {
            if (res.data.success) {
                setLink(res.data.data.link[0]);
            } else {
                console.log('Cannot Get Partners');
            };
        }).catch(e => {
            console.log(e);
        });
    };



    const handleNewLink = (data) => {
        console.log(data)
        setBtnLoading(true);
        if (actionType == 'NEW') {
            let newData = {
                description: data.description,
            };
            Links.CreateSkypeLink(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        handleGetSkypeLink();
                    } else {
                        setBtnLoading(false);
                        setResponseMessage(res.data.errorMessage.message);
                    };
                })
                .catch(e => {
                    setBtnLoading(false);
                    console.log(e);
                });
        } else {
            let newData = { ...link };
            newData.description = data.description;

            Links.EditSkypeLink(newData._id, newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        handleGetSkypeLink();
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

    const handleDeleteSkypeLink = () => {
        setBtnLoading(true);
        Links.DeleteSkypeLink(link._id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                handleGetSkypeLink();
            } else {
                setBtnLoading(false);
                setResponseMessage(res.data.errorMessage.message);
            };
        })
            .catch(e => {
                setBtnLoading(false);
                console.log(e);
            })
    };


    return (
        <AppLayout>
            <ActionModal
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={link}
                onEditData={handleNewLink}
                onDeleteData={handleDeleteSkypeLink}
                loading={btnLoading} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1>Welcome to Mima Admin Panel</h1>
                <p>Skype Link</p>
                <div className='list-item' style={{gridTemplateColumns: 'auto 60px 60px'}}>
                    <div className='list-item-body'>
                        <span className='list-item-title'>{link?.description}</span>
                    </div>
                    <div className='list-item-edit' onClick={() => { setActionType('EDIT'); setShowModal(true) }} style={{ marginRight: 10 }}>
                        <img src='../../Assets/Images/edit-icon.png' alt='icon' />
                    </div>
                    <div className='list-item-delete' onClick={() => { setActionType('DELETE'); setShowModal(true) }}>
                        <img src='../../Assets/Images/delete-icon.png' alt='icon' />
                    </div>
                    
                </div>
                <AppButton
                        buttonClass='button-add'
                        onClick={() => {
                            setActionType('NEW'); 
                            setShowModal(true);
                            }}>
                        დამატება
                    </AppButton>

            </div>

        </AppLayout>
    );
};

export default HomePage;