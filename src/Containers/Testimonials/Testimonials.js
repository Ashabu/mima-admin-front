import React, { useState, useEffect, useContext } from 'react';
import './testimonials.scss';
import Testimonial from '../../Services/TestimonialServices';
import AppLayout from '../../Components/AppLayout/AppLayout';
import AppSearch from '../../Components/UI/AppSearch/AppSearch';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ItemList from '../../Components/ItemLIst/ItemList';
import { AppContext } from '../../Context/AppContext';
import ActionModal from '../../Components/UI/Modals/ActionModal';




const Testimonials = () => {

    const [testimonials, setTestimonials] = useState([]);
    const [searchInTestimonial, setSearchInTestimonial] = useState();
    const [singleTestimonialData, setSingleTestimonialData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [actionType, setActionType] = useState('');
    const [btnLoading, setBtnLoading] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    const { activeLang } = useContext(AppContext);


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
                console.log(res.data.data.testimonials)
                setTestimonials([...res.data.data.testimonials]);
            } else {
                console.log('Cannot Get Testimonials');
            };
        }).catch(e => {
            console.log(e);
        });
    };

    const handleSearchTestimonial = (value) => {
        let tempTestimonials = testimonials.filter(f => {
            return f.title[activeLang].toLowerCase().includes(value.toLowerCase());
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
            setActionType('EDIT')
        } else {
            setActionType('DELETE')
        }

        setShowModal(true);
    };

    const handleNewTestimonial = (data) => {
        setBtnLoading(true);
        if (actionType == 'NEW') {
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
            Testimonial.CreateTestimonial(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
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
            let newData = { ...singleTestimonialData }
            newData.title[activeLang] = data.title;;
            newData.description[activeLang] = data.description;

            Testimonial.EditTestimonial(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
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
        };
    };

    const handleDeleteTestimonial = (id) => {
        setBtnLoading(true);
        Testimonial.DeleteTestimonial(id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
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
    };

    return (
        <AppLayout>
            <ActionModal
                show={showModal}
                onHideModal={() => { setSingleTestimonialData(null); setShowModal(false) }}
                type={actionType}
                data={singleTestimonialData}
                onEditData={handleNewTestimonial}
                onDeleteData={handleDeleteTestimonial}
                loading={btnLoading} />

            <div className='page-container'>
                <h1>Testimonials page</h1>
                <div className='page-header'>
                    <AppSearch onSearch={handleSearchTestimonial} />
                    <AppButton
                        onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                        დამატება
                    </AppButton>
                </div>
                <div className='page-body'>
                    {searchInTestimonial?.map((testimonial, i) => (
                        <ItemList key={i} data={testimonial} index={i}
                            onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                            onGetData={handleGetSingleTestimonial}
                        />
                    ))}
                </div>
            </div>
        </AppLayout>

    );
};

export default Testimonials;