import React, { Fragment } from 'react';
import BackFlip from '../BackFlip/BackFlip';
import './modals.scss';
import AppButton from '../AppButton/AppButton';

const DeleteModal = (props) => {

    return (
        <Fragment>
            <BackFlip show={props.showModal} onClick={props.onHideModal} />
            <div className={props.showModal ? 'delete-modal shown' : 'delete-modal hidden'}>
                <div className='delete-modal-body'>
                    <span>დარწმუნებული ხართ რო გსურთ მონაცემის წაშლა?</span>
                </div>
                {props.message ? <p style={{ color: '#DC143C' }}>{props.message}</p> : null}
                <div className='modal-buttons'>
                    <AppButton
                        buttonClass='btn btn-danger'
                        loading={props.loading}
                        onClick={props.onDeleteData}>
                        დიახ
                    </AppButton>
                    <AppButton
                        buttonClass='btn btn-no'
                        onClick={props.onHideModal}>
                        არა
                    </AppButton>
                </div>
            </div>
        </Fragment>
    );
};

export default DeleteModal;