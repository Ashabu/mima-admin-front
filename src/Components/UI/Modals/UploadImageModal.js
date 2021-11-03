import React, {Fragment, useState } from 'react';
import './modals.scss';
import BackFlip from '../BackFlip/BackFlip';
import AppButton from '../AppButton/AppButton';

const UploadImageModal = (props) => {

    const [uploadLoading, setUploadLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');



    const getBase64String = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    };

    const choseFile = (e) => {
        setUploadLoading(true);
        getBase64String(e.target.files[0])
        .then(res => {
            setImageUrl(res);
            setUploadLoading(false);
        })
        .catch(e => {
            console.log(e);
            setUploadLoading(false)
        });
    };

    return (
        
        <Fragment>
            <BackFlip show={props.showModal} onClick={props.onHideModal} />
            <div className={props.showModal ? 'upload-modal shown' : 'upload-modal hidden'}>
                <div className = 'upload-image' >
                    <p>Please Select Image</p>
                    <input type='file'  onChange={(e) => choseFile(e)}   size="60"/>
                </div>
                
                
                {props.message? <p  style={{color: '#DC143C'}}>{props.message}</p>: null}
                <div className='modal-buttons'>
                    <AppButton
                        buttonClass='btn btn-yes'
                        loading={props.loading}
                        onClick={() => props.onNewData({ isNew, title: newTitle, description: newDescription, img })}>
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

export default UploadImageModal;