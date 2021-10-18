import React, { useState, useEffect, useContext } from 'react';
import './partners.scss';
import Partner from '../../Services/PartnerServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import ItemListWithImg from '../../Components/ItemLIst/ItemListWithImg';
import { AppContext } from '../../Context/AppContext';

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [searchInPartner, setSearchInPartner] = useState();
    const [showModal, setShowModal] = useState(false);
    const [singlePartnerData, setSinglePartnerData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const { activeLang } = useContext(AppContext);

    useEffect(() => {
        handleGetPartners();
        setSearchInPartner(partners);
    }, []);

    useEffect(() => {
        setSearchInPartner(partners);
    }, [partners])


    const handleGetPartners = () => {
        Partner.GetPartners().then(res => {
            if (res.data.success) {
                setPartners(res.data.data.partners);
            } else {
                console.log('Cannot Get Partners');
            };
        }).catch(e => {
            console.log(e);
        });
    };

    const handleSearchPartner = (value) => {
        let tempPartners = partners.filter(f => {
            return f.linkUrl.toLowerCase().includes(value.toLowerCase());
        });
        if (value === '') {
            setSearchInPartner([...partners]);
        } else {
            setSearchInPartner([...tempPartners])
        };
    };

    const handleGetSinglePartner = (data) => {
        setSinglePartnerData(data.data);
        if (data.isEditing) {
            setActionType('EDIT')

        } else {
            setActionType('DELETE')
        };

        setShowModal(true);
    };

    const handleNewPartner = (data) => {
        setBtnLoading(true);
        if (actionType == 'NEW') {
            let newData = {
                linkUrl: data.description,
                imgUrl: data.imgUrl
            };
            Partner.CreatePartner(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        handleGetPartners();
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
            let newData = { ...singlePartnerData };
           
            newData.linkUrl = data.description;
            if(data.imgUrl) {
                newData.imgUrl = data.imgUrl
            }
            

            Partner.EditPartner(newData._id, newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        handleGetPartners();
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

    const handleDeletePartner = (id) => {
        setBtnLoading(true);
        Partner.DeletePartner(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                handleGetPartners();
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
                onHideModal={() => { setSinglePartnerData(null); setShowModal(false) }}
                withImg
                type={actionType}
                data={singlePartnerData}
                onEditData={handleNewPartner}
                onDeleteData={handleDeletePartner}
                loading={btnLoading} />

            <div className='page-container'>
                <h1>Partners page</h1>
                <div className='page-header'>
                    <AppSearch onSearch={handleSearchPartner} />
                    <AppButton
                        buttonClass='button-add'
                        onClick={() => { setSinglePartnerData(null); setActionType('NEW'); setShowModal(true) }}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInPartner?.map((partner, i) => (
                        <ItemListWithImg key={i} data={partner} index={i}
                            onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                            onGetData={handleGetSinglePartner}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Partners;