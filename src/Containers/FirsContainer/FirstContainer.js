import React, { useState, useEffect, useContext } from 'react';
import './firstContainer.scss';
import { AppContext } from '../../Context/AppContext';
import AppLayout from '../../Components/AppLayout/AppLayout';

import Affiliate from '../../Services/AffiliateService';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';

const FirstContainer = () => {

    const [showModal, setShowModal] = useState(false);
    const [mainInfo, setMainInfo] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');


    const { activeLang } = useContext(AppContext);


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
                    console.log(res.data.data.data.length)
                    if(res.data.data.data.length === 0) {
                        setIsLoading(false);
                    } else {
                        setMainInfo(res.data.data.data[0])
                    }
                    
                } else {
                    throw Error()
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    const handleNewMainInfo = (data) => {
        setBtnLoading(true);

        if (actionType == 'EDIT') {
            let newData = { ...mainInfo }
            newData.title[activeLang] = data.title;;
            newData.subTitle[activeLang] = data.subTitle;
            if (data.imgUrl) {
                newData.imgUrl = data.imgUrl;
            };
            Affiliate.UpdateAffiliateInfo(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetMainInfo();
                } else {
                    setBtnLoading(false);
                };
            })
                .catch(e => {
                    console.log(e);
                });
        } else {
            let newData = {
                title: {
                    en: '',
                    ru: '',
                },
                subTitle: {
                    en: '',
                    ru: ''
                },
                imgUrl: data.imgUrl
            };
            newData.title[activeLang] = data.title;;
            newData.subTitle[activeLang] = data.subTitle;
            Affiliate.AddAffiliateInfo(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        GetMainInfo();
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


    
    const handleDeleteMainInfo = () => {
        setBtnLoading(true);
        Affiliate.DeleteAffiliateInfo(mainInfo._id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetMainInfo();
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
                hasTitle
                withImg
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={mainInfo}
                onEditData={handleNewMainInfo}
                onDeleteData = {handleDeleteMainInfo}
                loading={btnLoading} />

            {isLoading ? <div>Loading......</div>
                :
                <div className='cont-wrap'>
                    <h1>First Container Page</h1>
                    <div className='cont-1'>
                        {mainInfo?.imgUrl !== '' ? <img src={mainInfo?.imgUrl} /> : null}
                        {mainInfo?.title[activeLang] !== '' ?
                            <div className='list-wrap'>
                                <p style={{ fontSize: 24 }}>{mainInfo?.title?.[activeLang]}</p>
                            </div> : null}
                        {mainInfo?.subTitle ?
                            <div className='list-wrap'>
                                <p style={{ fontSize: 18 }}>{mainInfo?.subTitle?.[activeLang]}</p>
                            </div>
                            : null}
                        <div className='list-wrap'>
                            <div className='action-icons'>
                                <AppButton
                                buttonClass='button-add'
                                    onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                                    დამატება
                                </AppButton>
                                <img src='../../Assets/Images/edit-icon.png' onClick={() => { setActionType('EDIT'); setShowModal(true) }} />
                                <img src='../../Assets/Images/delete-icon.png' alt='icon' onClick={() => { setActionType('DELETE'); setShowModal(true) }} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </AppLayout>
    );
};

export default FirstContainer;