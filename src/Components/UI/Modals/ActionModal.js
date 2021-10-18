import React, { Fragment, useState, useEffect, useContext } from 'react';
import './modals.scss';
import BackDrop from './BackDrop';
import AppButton from '../AppButton/AppButton';
import { AppContext } from '../../../Context/AppContext';

const ActionModal = (props) => {
    const { data, loading, onEditData, onDeleteData, onHideModal, show, type, withImg, hasTitle } = props;


    const { activeLang } = useContext(AppContext);


    const [newValue, setNewValue] = useState('');
    const [newDescValue, setNewDescValue] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        if (data && type == 'EDIT') {
            if (data.title) {
                setNewValue(data.title[activeLang]);
            }

            if (data.description) {
                setNewDescValue(data.description[activeLang]);
            } else if(data.subTitle) {
                setNewDescValue(data.subTitle[activeLang])

            } else {
                setNewDescValue(data.linkUrl);
            }

            if(data.imgUrl) {
                setImageUrl(data.imgUrl)
            }

        } else {
            setNewValue('');
            setNewDescValue('');
            setImageUrl('');
        };
    }, [data, activeLang]);




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
                console.log(res)
                setImageUrl(res);
                setUploadLoading(false);
            })
            .catch(e => {
                console.log(e);
                setUploadLoading(false)
            });
    };

    const handleAction = () => {
        if (type == 'DELETE') {
            console.log(data._id)
            onDeleteData(data._id);
            return;
        } else {
            onEditData({ title: newValue, description: newDescValue, imgUrl: imageUrl });
            return;
        }
    }


    let ModalBody;

    if (type == 'NEW' || type == 'EDIT') {
        ModalBody = (
            <div className='action-modal-body'>

              {hasTitle? <div className='content'>
                    <span>
                        Title
                    </span>
                    <input type='text' value={newValue} onInput={(e) => setNewValue(e.target.value)} />
                </div> : null}

                <div className='content'>
                    <span>
                        Description
                    </span>
                    <textarea type='text' value={newDescValue} onInput={(e) => setNewDescValue(e.target.value)} />
                </div>

                {withImg ?
                    <div className='upload-image' >
                        <p>Please Select Image</p>
                        <input type='file' onChange={(e) => choseFile(e)} size="60" />
                    </div> : null}

            </div>
        );
    };

    if (type == 'DELETE') {
        ModalBody = (
            <div className='action-modal-body'>
                <p>
                    ნამდვივლად გსურთ წაშლა ?
                </p>
            </div>
        );
    };

    if (type == 'UPLOAD') {
        <div className='upload-image' >
            <p>Please Select Image</p>
            <input type='file' value = {imageUrl} onChange={(e) => choseFile(e)} size="60" />
        </div>
    }





    return (
        <Fragment>
            <BackDrop show={show} />
            <div className={show ? 'action-modal shown' : 'action-modal hidden'}>
                    {ModalBody}
                
                <div className='action-modal-buttons'>
                    <AppButton
                        buttonClass={type == 'DELETE'? 'btn btn-danger' : 'btn btn-yes'}
                        loading={loading}
                        onClick={handleAction}>
                        დიახ
                    </AppButton>
                    <AppButton
                        buttonClass='btn btn-no'
                        onClick={onHideModal}>
                        არა
                    </AppButton>
                </div>
            </div>
        </Fragment>
    );
};

export default ActionModal;