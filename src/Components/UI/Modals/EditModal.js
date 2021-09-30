import React, { useState, useEffect } from 'react';
import BackFlip from '../BackFlip/BackFlip';
import Faq from '../../../Services/FaqServices';

const EditModal = (props) => {
    const [isNew, setIsNew] = useState(false);
    useEffect(() => {
        if (props.data) {
            setIsNew(false);
            setNewTitle(props.data.title);
            setNewDescription(props.data.description);
        } else {
            setIsNew(true);
        }
    }, [props.data])

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');

    let faqData = {
        
    };
    
    console.log(newTitle, newDescription)
   

    return (
        <>
            <BackFlip show={props.showModal} onClick={props.onHideModal} />
            <div className={props.showModal ? 'edit-modal shown' : 'edit-modal hidden'}>
                <div className='edit-modal-header'>
                    <span>Title</span>
                    <input type='text' value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                </div>
                <div className='edit-modal-body'>
                    <span>Description</span>
                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                </div>
                <div className='modal-buttons'>
                    <button onClick={()=>props.onNewFaq({isNew, title: newTitle, description: newDescription})}>დიახ</button>
                    <button onClick={props.onHideModal}>არა</button>
                </div>
            </div>
        </>
    );
};

export default EditModal;