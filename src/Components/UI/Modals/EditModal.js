import React, { useState, useEffect } from 'react';
import BackFlip from '../BackFlip/BackFlip';

const EditModal = (props) => {
//    const {title, description} = props.data
    useEffect(() => {
        setNewTitle(props.data.title);
        setNewDescription(props.data.description)
    }, [props.data])

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription ] = useState('');    

    return (
        <>
         <BackFlip show = {props.showModal} onClick = {props.onHideModal}/>
        <div className = {props.showModal? 'edit-modal shown': 'edit-modal hidden'}>
            <div className = 'edit-modal-header'>
                <span>Title</span>
                <input type = 'text' value={newTitle} onChange ={(e) => setNewTitle(e.target.value)}/>
            </div>
            <div className = 'edit-modal-body'>
                <span>Description</span>
                <textarea value={newDescription} onChange ={(e) => setNewDescription(e.target.value)}/>
            </div>
            <div className = 'modal-buttons'>
                <button onClick = {() => props.onCreateFaq({title: newTitle, description: newDescription})}>დიახ</button>
                <button onClick ={props.onHideModal}>არა</button>
            </div>
        </div>
        </>
    );
};

export default EditModal;