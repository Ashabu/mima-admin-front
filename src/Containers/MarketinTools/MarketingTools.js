import React, { useState, useEffect, useContext } from 'react';
import './marketingTools.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import MarketingTool from '../../Services/MarketinToolsServices';
import Image from '../../Services/ImageService';
import { AppContext } from '../../Context/AppContext';
import ItemList from '../../Components/ItemLIst/ItemList';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ImageList from '../../Components/ItemLIst/ImageList';
import AppPreLoader from '../../Components/AppPreLoader/AppPreLoader';


const MarketingTools = () => {

    const [marketingTools, setMarketingTools] = useState(undefined);
    const [bgImg, setBgImg] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [singleToolData, setSingleToolData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [imgId, setImgId] = useState(null);

    const { activeLang } = useContext(AppContext);

    useEffect(() => {
        GetMarketingTools();
    }, []);

    useEffect(() => {
        if (marketingTools !== undefined) {
                setIsLoading(false);
        };
    }, [marketingTools]);

    console.log(marketingTools)

    const GetMarketingTools = () => {
        MarketingTool.GetMarketingTools()
            .then(res => {
                console.log('res.data ===> ', res.data)
                console.log('res.data.data ===> ', res.data.data)
                if (res.data.success) {
                    setMarketingTools(res.data.data.tools);
                    setBgImg(res.data.data.images);
                } else {
                    throw Error()
                }
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleSingleTool = (data) => {
        setSingleToolData(data.data);
        if (data.isEditing) {
            setActionType('EDIT')
        } else {
            setActionType('DELETE');
        };
        setShowModal(true);
    };

    const handleNewTool = (data) => {
        setBtnLoading(true);
        if (actionType == 'EDIT') {
            let newData = { ...singleToolData }
            newData.title[activeLang] = data.title;;
            newData.description[activeLang] = data.description;
            MarketingTool.UpdateMarketingTool(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetMarketingTools();
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
                description: {
                    en: '',
                    ru: ''
                }
            };
            newData.title[activeLang] = data.title;;
            newData.description[activeLang] = data.description;
            console.log(newData)
            MarketingTool.AddMarketingTool(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        GetMarketingTools();
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
    }

    const handleDeleteTool = (id) => {
        setBtnLoading(true);
        MarketingTool.DeleteMarketingTool(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetMarketingTools();
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
            relatesTo: 'MarketingTool'
        };
        if (!imgId) {
            Image.CreateImage(data).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    GetMarketingTools();
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
                    GetMarketingTools();
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
        Image.DeleteImage(bgImg._id).then(res => {
            if (res.data.success) {
                setShowModal(false);
                setBtnLoading(false);
                GetMarketingTools()
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


    return (
        <AppLayout>
            <ActionModal
                hasTitle
                show={showModal}
                onHideModal={() => { setSingleToolData(undefined); setShowModal(false) }}
                type={actionType}
                data={singleToolData}
                onEditData={actionType === 'UPLOAD' ? handleUploadImg : handleNewTool}
                onDeleteData={actionType === 'DELETE_IMG' ? handleDeleteImg : handleDeleteTool}
                loading={btnLoading} />
            {isLoading ?
                <AppPreLoader />
                :
                <div className='cont-wrap'>
                    <h1>Why Us Page</h1>
                    <div className='page-header'>
                        
                        <AppButton
                            buttonClass='button-add'
                            onClick={() => {
                                setImgId(null);
                                setActionType('UPLOAD');
                                setShowModal(true);
                            }}>
                            ბანერის დამატება
                        </AppButton>
                    </div>
                    <div className='cont-1'>
                        <ImageList
                            data={bgImg}
                            onEditImg={() => {
                                setActionType('UPLOAD');
                                setImgId(bgImg._id);
                                setShowModal(true)
                            }}
                            onDeleteImg={() => {
                                setActionType('DELETE_IMG');
                                setImgId(bgImg._id);
                                setShowModal(true)
                            }} />
                        <AppButton
                            buttonClass='button-add'
                            onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                            ტექსტის დამატება
                        </AppButton>
                        {marketingTools?.map((tool, i) => (
                            <ItemList key={i} data={tool} index={i}
                                onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                                onGetData={handleSingleTool} />
                        ))}
                    </div>
                </div>}
        </AppLayout>
    );
};

export default MarketingTools;