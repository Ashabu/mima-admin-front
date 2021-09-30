import React, { useEffect, useState } from 'react';
import BackFlip from '../BackFlip/BackFlip';
import './modals.scss';
import AppButton from '../AppButton/AppButton';

const DeleteModal = (props) => {

    return (
        <>
            <BackFlip show={props.showModal} onClick={props.onHideModal} />
            <div className={props.showModal ? 'delete-modal shown' : 'delete-modal hidden'}>
                <div className='delete-modal-body'>
                    <span>დარწმუნებული ხართ რო გსურთ კითხვის წაშლა?</span>
                </div>
                <div className='modal-buttons'>
                    <AppButton 
                        buttonClass = 'btn btn-danger'
                        loading = {props.loading} 
                        onClick = {props.onDeleteFaq}>დიახ</AppButton>
                    <AppButton 
                        buttonClass = 'btn btn-no' 
                        onClick={props.onHideModal}>არა</AppButton>
                </div>
            </div>
        </>
    );
};

export default DeleteModal;