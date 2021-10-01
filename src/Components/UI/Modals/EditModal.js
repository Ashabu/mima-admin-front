import React, { Fragment, useState, useEffect } from 'react';
import BackFlip from '../BackFlip/BackFlip';
import AppButton from '../AppButton/AppButton';

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
    }, [props.data]);

    const [newTitle, setNewTitle] = useState('');
    const [newDescription, setNewDescription] = useState('');



    return (

        <Fragment>
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
                {props.message? <p  style={{color: '#DC143C'}}>{props.message}</p>: null}
                <div className='modal-buttons'>
                    <AppButton
                        buttonClass='btn btn-yes'
                        loading={props.loading}
                        onClick={() => props.onNewData({ isNew, title: newTitle, description: newDescription })}>
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

export default EditModal;