import React, { useState, useEffect } from 'react';
import './faqs.scss';
import Faq from '../../Services/FaqServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import ItemList from '../../Components/ItemLIst/ItemList';
import BackFlip from '../../Components/UI/BackFlip/BackFlip';
import DeleteModal from '../../Components/UI/Modals/DeleteModal';
import EditModal from '../../Components/UI/Modals/EditModal';


const Faqs = () => {

    const [faqs, setFaqs] = useState([]);
    const [searchInFaq, setSearchInFaq] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [singleFaqData, setSingleFaqData] = useState(null);
    const [btnLoading, setBtnLoading] =useState(false);
    const [step, setStep] = useState(0);

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
        if (data.isNew) {
            Faq.CreateFaq({ title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        console.log('crate', res.data);
                    } else {
                        console.log('create res error', res.data);
                    };
                })
                .catch(e => {
                    console.log(e);
                });
        } else {
            const { id } = singleFaqData;
            Faq.EditFaq(id, { title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        console.log('delete', res.data);
                    } else {
                        console.log('delete res error', res.data);
                    };
                })
                .catch(e => {
                    console.log(e);
                });
        };
    };

    const handleDeleteFaq = () => {
        setBtnLoading(true);
        return
        const {id} = singleFaqData;
        Faq.DeleteFaq(id).then(res => {
            if(res.data.success) {
                console.log('delete', res.data)
                setBtnLoading(false)
            } else {
                setBtnLoading(false)
                console.log('delete res error', res.data)
            }
        })
        .catch(e => {
            console.log(e);
        })
    };







    return (
        <AppLayout>
            <DeleteModal 
                showModal={showDeleteModal} 
                data={singleFaqData}
                loading = {btnLoading} 
                onDeleteFaq = {handleDeleteFaq} 
                onHideModal={() => { setShowDeleteModal(false) }} />
            <EditModal showModal={showEditModal} data={singleFaqData} onNewFaq={handleNewFaq} onHideModal={() => setShowEditModal(false)} />

            <div className='page-container'>
                <h1>Faqs page</h1>
                <div className='page-header'>
                    <AppSearch onSearch={handleSearchFaq} />
                    <button onClick={() => setShowEditModal(true)}>დამატება</button>
                </div>
                <div className='page-body'>
                    {searchInFaq?.map((faq, i) => (
                        <ItemList key={i} data={faq} index={i}
                            onShowModal={() => setShowDeleteModal(true)}
                            onHideModal={() => setShowEditModal(false)}
                            onGetFaq={handleGetSingleFaq}

                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Faqs;