import React, { useState, useEffect, useContext } from 'react';
import './faqs.scss';
import Faq from '../../Services/FaqServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ItemList from '../../Components/ItemLIst/ItemList';
import ActionModal from '../../Components/UI/Modals/ActionModal';
import { AppContext } from '../../Context/AppContext';




const Faqs = () => {

    const [faqs, setFaqs] = useState([]);
    const [searchInFaq, setSearchInFaq] = useState();
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [singleFaqData, setSingleFaqData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const { activeLang } = useContext(AppContext);

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
            return f.title[activeLang].toLowerCase().includes(value.toLowerCase());
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
            setActionType('EDIT')
        } else {
            setActionType('DELETE');
        };
        setShowModal(true);

    };

    const handleNewFaq = (data) => {
        setBtnLoading(true);

        if (actionType == 'EDIT') {
            let newData = { ...singleFaqData }
            newData.title[activeLang] = data.title;;
            newData.description[activeLang] = data.description;
            Faq.EditFaq(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
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
            Faq.CreateFaq(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
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
        };
    };

    const handleDeleteFaq = (id) => {
        setBtnLoading(true);
        Faq.DeleteFaq(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
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
    };

    return (
        <AppLayout>
            <ActionModal
                hasTitle
                show={showModal}
                onHideModal={() => {setSingleFaqData(null); setShowModal(false)}}
                type={actionType}
                data={singleFaqData}
                onEditData={handleNewFaq}
                onDeleteData={handleDeleteFaq}
                loading={btnLoading} />

            <div className='page-container'>
                <h1>Faqs page</h1>
                <div className='page-header'>
                    <AppSearch onSearch={handleSearchFaq} />
                    <AppButton
                    buttonClass='button-add'
                        onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInFaq?.map((faq, i) => (
                        <ItemList key={i} data={faq} index={i}
                            onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                            onGetData={handleGetSingleFaq}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Faqs;