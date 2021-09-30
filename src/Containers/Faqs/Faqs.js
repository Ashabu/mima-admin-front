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
    const [editFaqData, setEditFaqData] = useState({});

    useEffect(() => {
        getFaqs();
        setSearchInFaq(faqs)
    }, []);

    useEffect(() => {
        setSearchInFaq(faqs)
    }, [faqs])


    const getFaqs = () => {
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

    const searchFaq = (value) => {
        let tempFaqs = faqs.filter(f => {
            return f.title.toLowerCase().includes(value.toLowerCase());
        });
        if (value === '') {
            setSearchInFaq([...faqs]);
        } else {
            setSearchInFaq([...tempFaqs])
        };
    };

    const editFaq = (data) => {
        console.log(data)
        setEditFaqData(data)
    }

    const handleCreateFaq = (data) => {
        Faq.CreateFaq(data).then(res => {
            if(res.data.success) {
                console.log(res)
            } else {
                console.log('error', res);
            }
        }).catch(e => {
            console.log(e)
        })
    };

    const handleEditFaq = () => {
        
    }


    return (
        <AppLayout>
            <DeleteModal showModal = {showDeleteModal} onHideModal = {() => {setShowDeleteModal(false)}}/>
            <BackFlip show={false}/>
            <EditModal data={editFaqData} showModal = {showEditModal} onHideModal = {()=> setShowEditModal(false)} onEditFaq = {handleEditFaq} onCreateFaq = {handleCreateFaq}/>

            <div className='page-container'>
                <h1>Faqs page</h1>
                <div className='page-header'>
                    <AppSearch onSearch={searchFaq} />
                    <button onClick = {()=>setShowEditModal(true)}>დამატება</button>
                </div>
                <div className='page-body'>
                    {searchInFaq?.map((faq, i) => (
                        <ItemList key={i} data={faq} index={i} 
                            onShowModal = {() => setShowDeleteModal(true)}
                            onHideModal = {()=> setShowEditModal(false)}
                            onEditing = {editFaq} 
                            />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Faqs;