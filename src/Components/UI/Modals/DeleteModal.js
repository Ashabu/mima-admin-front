import React from 'react';
import BackFlip from '../BackFlip/BackFlip';
import './modals.scss';

const DeleteModal = (props) => {
    return (
        <>
        <BackFlip show = {props.showModal} onClick = {props.onHideModal}/>
        <div className = {props.showModal? 'delete-modal shown' : 'delete-modal hidden'}>
            <div className = 'delete-modal-body'>
                <span>დარწმუნებული ხართ რო გსურთ კითხვის წაშლა?</span>
            </div>
            <div className = 'modal-buttons'>
                <button>დიახ</button>
                <button onClick ={props.onHideModal}>არა</button>
            </div>
        </div>
        </>
    );
};

export default DeleteModal;