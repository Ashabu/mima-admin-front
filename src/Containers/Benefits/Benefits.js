import React, { useState, useEffect, useContext } from 'react';
import './benefits.scss';
import AppLayout from '../../Components/AppLayout/AppLayout';
import Benefit from '../../Services/BenefitsServices';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import ItemListWithImg from '../../Components/ItemLIst/ItemListWithImg';
import { AppContext } from '../../Context/AppContext';
import AppButton from '../../Components/UI/AppButton/AppButton';
import AppPreLoader from '../../Components/AppPreLoader/AppPreLoader';

const Benefits = () => {

    const [benefits, setBenefits] = useState([]);
    const [singleBenefitData, setSingleBenefitData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const { activeLang } = useContext(AppContext);

    useEffect(() => {
        GetBenefits();
    }, []);

    useEffect(() => {
        if (benefits !== undefined) {
            setIsLoading(false);
        }

    }, [benefits]);

    const GetBenefits = () => {
        Benefit.GetBenefits()
            .then(res => {
                if (res.data.success) {
                    setBenefits(res.data.data.benefits);

                } else {
                    throw Error()
                }
            })
            .catch(err => {
                console.log(err)
            });
    };

    const handleGetSingleBenefit = (data) => {
        setSingleBenefitData(data.data);
        if (data.isEditing) {
            setActionType('EDIT')
        } else {
            setActionType('DELETE')
        }
        setShowModal(true);
    };

    const handleNewBenefit = (data) => {
        setBtnLoading(true);
        if (actionType == 'NEW') {
            let newData = {
                description: {
                    en: '',
                    ru: '',
                },
                imgUrl: data.imgUrl
            };
            newData.description[activeLang] = data.description;
            console.log(newData)
            Benefit.CreateBenefit(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        GetBenefits();
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
            let newData = { ...singleBenefitData }
            newData.description[activeLang] = data.description;
            if (data.imgUrl) {
                newData.imgUrl = data.imgUrl;
            }
            console.log(newData);
            Benefit.EditBenefit(newData._id, newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        GetBenefits();
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

    const handleDeleteBenefit = (id) => {
        setBtnLoading(true);
        Benefit.DeleteBenefit(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                GetBenefits();
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
                show={showModal}
                onHideModal={() => { setSingleBenefitData(null); setShowModal(false) }}
                withImg
                type={actionType}
                data={singleBenefitData}
                onEditData={handleNewBenefit}
                onDeleteData={handleDeleteBenefit}
                loading={btnLoading} />
            {isLoading ?
                <AppPreLoader />
                :
                <div className='cont-wrap'>
                    <h1>Benefits Page</h1>
                    <div className='page-header'>
                        <AppButton
                            buttonClass='button-add'
                            onClick={() => { setSingleBenefitData(null); setActionType('NEW'); setShowModal(true) }}>
                            დამატება
                        </AppButton>
                    </div>
                    {benefits?.map((b, i) => (
                        <ItemListWithImg key={i} data={b} index={i}
                            onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                            onGetData={handleGetSingleBenefit} />
                    ))}
                </div>}
        </AppLayout>
    );
};

export default Benefits;