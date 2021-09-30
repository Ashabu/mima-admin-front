import React, { useState, useEffect } from 'react';
import './faqs.scss';
import Faq from '../../Services/FaqServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ItemList from '../../Components/ItemLIst/ItemList';
import DeleteModal from '../../Components/UI/Modals/DeleteModal';
import EditModal from '../../Components/UI/Modals/EditModal';


const Faqs = () => {

    const [faqs, setFaqs] = useState([]);
    const [searchInFaq, setSearchInFaq] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [singleFaqData, setSingleFaqData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        handleGetFaqs();
        setSearchInFaq(faqs);
    }, []);

    useEffect(() => {
        setSearchInFaq(faqs);
    }, [faqs])


    const handleGetFaqs = () => {
        Faq.GetFaqs().then(res => {
            if (res.data.success) {
                setFaqs(res.data.data.faqs);
            } else {
                console.log('Cannot Get Faqs');
            };
        }).catch(e => {
            console.log(e);
        });
    };

    const handleSearchFaq = (value) => {
        let tempFaqs = faqs.filter(f => {
            return f.title.toLowerCase().includes(value.toLowerCase());
        });
        if (value === '') {
            setSearchInFaq([...faqs]);
        } else {
            setSearchInFaq([...tempFaqs])
        };
    };

    const handleGetSingleFaq = (data) => {
        setSingleFaqData(data.data);
        if (data.isEditing) {
            setShowEditModal(true);
        } else {
            setShowDeleteModal(true);
        }

    };

    const handleNewFaq = (data) => {
        setBtnLoading(true);
        if (data.isNew) {
            Faq.CreateFaq({ title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
                        handleGetFaqs();
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
            const { id } = singleFaqData;
            Faq.EditFaq(id, { title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
                        handleGetFaqs();
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

    const handleDeleteFaq = () => {
        setBtnLoading(true);
        const { id } = singleFaqData;
        Faq.DeleteFaq(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowDeleteModal(false);
                handleGetFaqs();
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
                data = {singleFaqData}
                loading = {btnLoading}
                message = {responseMessage}
                onDeleteFaq = {handleDeleteFaq}
                onHideModal = {() => { setShowDeleteModal(false) }} />
            <EditModal
                showModal = {showEditModal}
                data = {singleFaqData}
                loading = {btnLoading}
                message = {responseMessage}
                onNewFaq = {handleNewFaq}
                onHideModal = {() => setShowEditModal(false)} />

            <div className='page-container'>
                <h1>Faqs page</h1>
                <div className='page-header'>
                    <AppSearch onSearch = {handleSearchFaq} />
                    <AppButton
                        onClick = {() => setShowEditModal(true)}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInFaq?.map((faq, i) => (
                        <ItemList key = {i} data = {faq} index = {i}
                            onShowModal = {() => setShowDeleteModal(true)}
                            onHideModal = {() => setShowEditModal(false)}
                            onGetFaq = {handleGetSingleFaq}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Faqs;