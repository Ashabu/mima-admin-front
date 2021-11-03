import React, { useState, useEffect, useContext } from 'react';
import './firstContainer.scss';
import { AppContext } from '../../Context/AppContext';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Affiliate from '../../Services/AffiliateService';
import Image from '../../Services/ImageService';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ImageList from '../../Components/ItemLIst/ImageList';
import AppPreLoader from '../../Components/AppPreLoader/AppPreLoader';

const FirstContainer = () => {

    const [showModal, setShowModal] = useState(false);
    const [affiliates, setAffiliates] = useState(undefined);
    const [singleAffiliateData, setSingleAffiliateData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [banners, setBanners] = useState(undefined);
    const [imgId, setImgId] = useState('');


    const { activeLang } = useContext(AppContext);


    useEffect(() => {
        GetAffiliate();
    }, []);

    useEffect(() => {
        if (affiliates !== undefined) {
            setIsLoading(false);
        }

    }, [affiliates]);

    const GetAffiliate = () => {
        Affiliate.GetAffiliateInfos()
            .then(res => {
                if (res.data.success) {
                    setAffiliates(res.data.data.affiliates);
                    setBanners(res.data.data.images)
                    setIsLoading(false);
                    console.log(res.data.data)

                } else {
                    throw Error()
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    const handleNewAffiliate = (data) => {
        setBtnLoading(true);
        if (actionType == 'EDIT') {
            let newData = { ...affiliates[0] }
            newData.title[activeLang] = data.title;
            newData.subTitle[activeLang] = data.description;
            Affiliate.UpdateAffiliateInfo(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetAffiliate();
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
                        GetAffiliate();
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
        Affiliate.DeleteAffiliateInfo(affiliates[0]._id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetAffiliate();
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
        setBtnLoading(true);

        let data = {
            imgUrl: value.imgUrl,
            relatesTo: 'Affiliate'
        };
        if (!imgId) {
            Image.CreateImage(data).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetAffiliate();
                } else {
                    setBtnLoading(false);
                }

            }).catch(e => {
                console.log(e);
                setBtnLoading(false);
            });
        } else {
            Image.EditImage(imgId, data).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetAffiliate();
                } else {
                    setBtnLoading(false);
                }

            }).catch(e => {
                console.log(e);
                setBtnLoading(false);
            });
        }

    };

    const handleDeleteImg = () => {
        setBtnLoading(true);
        Image.DeleteImage(imgId).then(res => {

            if (res.data.success) {
                setShowModal(false);
                setBtnLoading(false);
                GetAffiliate()
            } else {
                setBtnLoading(false);
                console.log(res.data.data.message);
            };
        })
            .catch(e => {
                setBtnLoading(false);
                console.log(e)
            });
    };

    console.log('affiliates', affiliates)

    return (

        <AppLayout>
            <ActionModal
                hasTitle
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={singleAffiliateData}
                onEditData={actionType === 'UPLOAD' ? handleUploadImg : handleNewAffiliate}
                onDeleteData={actionType === 'DELETE_IMG' ? handleDeleteImg : handleDeleteMainInfo}
                loading={btnLoading} />

            {isLoading ?
                <AppPreLoader />
                :
                <div className='cont-wrap'>
                    <h1>First Container Page</h1>
                    <div className='cont-1'>
                        {banners?.map((img, i) => (
                            <ImageList
                                key={i}
                                data={img}
                                onDeleteImg={() => {
                                    setActionType('DELETE_IMG');
                                    setImgId(img._id);
                                    setShowModal(true)
                                }}
                                onEditImg={() => {
                                    setActionType('UPLOAD');
                                    setImgId(img._id);
                                    setShowModal(true)
                                }}
                            />
                        ))}
                        <div className='action-icons'>
                            {affiliates ?
                                <AppButton
                                    buttonClass='button-add'
                                    onClick={() => {
                                        setActionType('UPLOAD');
                                        setImgId(null);
                                        setShowModal(true)
                                    }}>
                                    ბანერის დამატება
                                </AppButton>
                                : null}
                        </div>

                        {affiliates?.[0]?.title ?
                            <div className='list-wrap'>
                                <p style={{ fontSize: 24 }}>{affiliates?.[0].title?.[activeLang]}</p>
                            </div> : null}
                        {affiliates?.[0]?.subTitle ?
                            <div className='list-wrap'>
                                <p style={{ fontSize: 18 }}>{affiliates?.[0].subTitle?.[activeLang]}</p>
                            </div>
                            : null}
                        <div className='list-wrap' style ={{marginTop: 30}}>
                            <div className='action-icons'>
                                <AppButton
                                    buttonClass='button-add'
                                    onClick={() => {
                                        setSingleAffiliateData(null);
                                        setActionType('NEW');
                                        setShowModal(true)
                                    }}>
                                    დამატება
                                </AppButton>
                                <img src='../../Assets/Images/edit-icon.png' onClick={() => {
                                    setSingleAffiliateData(affiliates[0]);
                                    setActionType('EDIT');
                                    setShowModal(true);
                                }}
                                />
                                <img src='../../Assets/Images/delete-icon.png' alt='icon' onClick={() => {
                                    setActionType('DELETE');
                                    setShowModal(true);
                                }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </AppLayout>
    );
};

export default FirstContainer;