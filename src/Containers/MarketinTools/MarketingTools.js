import React, { useState, useEffect, useContext } from 'react';
import './marketingTools.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import MarketingTool from '../../Services/MarketinToolsServices';
import { AppContext } from '../../Context/AppContext';
import ItemList from '../../Components/ItemLIst/ItemList';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ImageList from '../../Components/ItemLIst/ImageList';


const MarketingTools = () => {

    const [marketingTools, setMarketingTools] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [singleToolData, setSingleToolData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [imgId, setImgId] = useState('');

    const { activeLang } = useContext(AppContext);

    useEffect(() => {
        GetMarketingTools();
    }, []);

    const GetMarketingTools = () => {
        MarketingTool.GetMarketingTools()
            .then(res => {
                if (res.data.success) {
                    setMarketingTools(res.data.data.tools);
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
            relatesTo: marketingTools[0]._id
        };

        MarketingTool.AddMarketingBaner(data).then(res => {
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
        })
    };

    const handleDeleteImg = () => {
        setBtnLoading(true);
        MarketingTool.DeleteMarketingBaner(marketingTools[0]._id, imgId).then(res => {

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
                onHideModal={() => { setSingleToolData(null); setShowModal(false) }}
                type={actionType}
                data={singleToolData}
                onEditData={actionType === 'UPLOAD' ? handleUploadImg : handleNewTool}
                onDeleteData={actionType === 'DELETE_IMG' ? handleDeleteImg : handleDeleteTool}
                loading={btnLoading} />
            <div className='cont-wrap'>
                <h1>marketingTools Page</h1>
                <div className='page-header'>

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
                </div>
                <div className='cont-1'>
                    {marketingTools[0]?.images?.map((img, i) => (
                        <ImageList key={i} data={img} onDeleteImg={() => { setActionType('DELETE_IMG'); setImgId(img._id); setShowModal(true) }} />
                    ))}
                    {marketingTools?.map((tool, i) => (
                        <ItemList key={i} data={tool} index={i}
                            onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                            onGetData={handleSingleTool} />
                    ))}
                </div>

            </div>

        </AppLayout>
    );
};

export default MarketingTools;