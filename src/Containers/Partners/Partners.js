import React, { useState, useEffect } from 'react';
import './partners.scss';
import Partner  from '../../Services/PartnerServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ItemList from '../../Components/ItemLIst/ItemList';
import DeleteModal from '../../Components/UI/Modals/DeleteModal';
import EditModal from '../../Components/UI/Modals/EditModal';

const Partners = () => {
    const [partners, setPartners] = useState([]);
    const [searchInPartner, setSearchInPartner] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [singlePartnerData, setSinglePartnerData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

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
            return f.title.toLowerCase().includes(value.toLowerCase());
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
            setShowEditModal(true);
        } else {
            setShowDeleteModal(true);
        }

    };

    const handleNewPartner = (data) => {
        setBtnLoading(true);
        if (data.isNew) {
            Partner.CreatePartner({ title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
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
            const { id } = singlePartnerData;
            Partner.EditPartner(id, { title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
                        handleGetPartners();
                    } else {
                        setBtnLoading(false);
                        setResponseMessage(res.data.errorMessage.message);
                    };
                    setStep(1)
                })
                .catch(e => {
                    setBtnLoading(false);
                    console.log(e);
                });
        };
    };

    const handleDeletePartner = () => {
        setBtnLoading(true);
        const { id } = singlePartnerData;
        Partner.DeletePartner(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowDeleteModal(false);
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
            <DeleteModal
                showModal = {showDeleteModal}
                data = {singlePartnerData}
                loading = {btnLoading}
                message = {responseMessage}
                onDeleteData = {handleDeletePartner}
                onHideModal = {() => { setShowDeleteModal(false) }} />
            <EditModal
                showModal = {showEditModal}
                data = {singlePartnerData}
                loading = {btnLoading}
                message = {responseMessage}
                onNewData = {handleNewPartner}
                onHideModal = {() => setShowEditModal(false)} />

            <div className='page-container'>
                <h1>Partners page</h1>
                <div className='page-header'>
                    <AppSearch onSearch = {handleSearchPartner} />
                    <AppButton
                        onClick = {() => setShowEditModal(true)}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInPartner?.map((partner, i) => (
                        <ItemList key = {i} data = {partner} index = {i}
                            onShowModal = {() => setShowDeleteModal(true)}
                            onHideModal = {() => setShowEditModal(false)}
                            onGetData = {handleGetSinglePartner}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Partners;