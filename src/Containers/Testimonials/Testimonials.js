import React, { useState, useEffect } from 'react';
import './testimonials.scss';
import Testimonial from '../../Services/TestimonialServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ItemList from '../../Components/ItemLIst/ItemList';
import DeleteModal from '../../Components/UI/Modals/DeleteModal';
import EditModal from '../../Components/UI/Modals/EditModal';


const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [searchInTestimonial, setSearchInTestimonial] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [singleTestimonialData, setSingleTestimonialData] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    useEffect(() => {
        handleGetTestimonials();
        setSearchInTestimonial(testimonials);
    }, []);

    useEffect(() => {
        setSearchInTestimonial(testimonials);
    }, [testimonials])


    const handleGetTestimonials = () => {
        Testimonial.GetTestimonials().then(res => {
            if (res.data.success) {
                setTestimonials(res.data.data.testimonials);
            } else {
                console.log('Cannot Get Testimonials');
            };
        }).catch(e => {
            console.log(e);
        });
    };

    const handleSearchTestimonial = (value) => {
        let tempTestimonials = testimonials.filter(f => {
            return f.title.toLowerCase().includes(value.toLowerCase());
        });
        if (value === '') {
            setSearchInTestimonial([...testimonials]);
        } else {
            setSearchInTestimonial([...tempTestimonials])
        };
    };

    const handleGetSingleTestimonial = (data) => {
        setSingleTestimonialData(data.data);
        if (data.isEditing) {
            setShowEditModal(true);
        } else {
            setShowDeleteModal(true);
        }

    };

    const handleNewTestimonial = (data) => {
        setBtnLoading(true);
        if (data.isNew) {
            Testimonial.CreateTestimonial({ title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
                        handleGetTestimonials();
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
            const { id } = singleTestimonialData;
            Testimonial.EditTestimonial(id, { title: data.title, description: data.description })
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowEditModal(false);
                        handleGetTestimonials();
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

    const handleDeleteTestimonial = () => {
        setBtnLoading(true);
        const { id } = singleTestimonialData;
        Testimonial.DeleteTestimonial(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowDeleteModal(false);
                handleGetTestimonials();
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
                data = {singleTestimonialData}
                loading = {btnLoading}
                message = {responseMessage}
                onDeleteTestimonial = {handleDeleteTestimonial}
                onHideModal = {() => { setShowDeleteModal(false) }} />
            <EditModal
                showModal = {showEditModal}
                data = {singleTestimonialData}
                loading = {btnLoading}
                message = {responseMessage}
                onNewTestimonial = {handleNewTestimonial}
                onHideModal = {() => setShowEditModal(false)} />

            <div className='page-container'>
                <h1>Testimonials page</h1>
                <div className='page-header'>
                    <AppSearch onSearch = {handleSearchTestimonial} />
                    <AppButton
                        onClick = {() => setShowEditModal(true)}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInTestimonial?.map((testimonial, i) => (
                        <ItemList key = {i} data = {testimonial} index = {i}
                            onShowModal = {() => setShowDeleteModal(true)}
                            onHideModal = {() => setShowEditModal(false)}
                            onGetTestimonial = {handleGetSingleTestimonial}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Testimonials;