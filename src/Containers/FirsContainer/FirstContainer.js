import React, { useState, useEffect, useContext } from 'react';
import './firstContainer.scss';
import { AppContext } from '../../Context/AppContext';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Affiliate from '../../Services/AffiliateService';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ImageList from '../../Components/ItemLIst/ImageList';

const FirstContainer = () => {

    const [showModal, setShowModal] = useState(false);
    const [mainInfo, setMainInfo] = useState(undefined);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [imgId, setImgId] = useState('');


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
                    if (res.data.data.data.length === 0) {
                        setIsLoading(false);
                    } else {
                        setMainInfo(res.data.data.affiliates[0])
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
            newData.title[activeLang] = data.title;
            newData.subTitle[activeLang] = data.description;
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
            };
            newData.title[activeLang] = data.title;;
            newData.subTitle[activeLang] = data.description;
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

    const handleUploadImg = (value) => {
        console.log(value.imgUrl)
        setBtnLoading(true);
        let data = {
            imgUrl: value.imgUrl,
            relatesTo: mainInfo._id
        };

        Affiliate.AddAffiliateBaner(data).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetMainInfo();
            } else {
                setBtnLoading(false);
            }

        }).catch(e => {
            console.log(e);
            setBtnLoading(false);
        })
    };

    const handleDeleteImg = () => {
        setBtnLoading(true);
        Affiliate.DeleteAffiliateBaner(mainInfo._id, imgId).then(res => {
            
            if (res.data.success) {
                setShowModal(false);
                setBtnLoading(false);
                GetMainInfo()
            } else {
                setBtnLoading(false);
                console.log(res.data.data.message);
            };
        })
            .catch(e => {
                setBtnLoading(false);
                console.log(e)
            });
    }

    return (

        <AppLayout>
            <ActionModal
                hasTitle
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={mainInfo}
                onEditData={actionType === 'UPLOAD'? handleUploadImg : handleNewMainInfo}
                onDeleteData={actionType === 'DELETE_IMG'? handleDeleteImg: handleDeleteMainInfo}
                loading={btnLoading} />

            {isLoading ? <div>Loading......</div>
                :
                <div className='cont-wrap'>
                    <h1>First Container Page</h1>
                    <div className='cont-1'>
                        {mainInfo?.images.map((img, i) => (
                            <ImageList key={i} data={img} onDeleteImg={() =>{setActionType('DELETE_IMG'); setImgId(img._id); setShowModal(true)}} />
                        ))}





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
                                <AppButton
                                    buttonClass='button-add'
                                    onClick={() => { setActionType('UPLOAD'); setShowModal(true) }}>
                                    ბანერის დამატება
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