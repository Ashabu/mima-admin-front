import React, { Fragment, useState, useEffect, useContext } from 'react';
import BackDrop from './BackDrop';
import AppButton from '../AppButton/AppButton';
import { AppContext } from '../../../Context/AppContext';

const ActionModal = (props) => {
    const { data, loading, onEditData, onDeleteData, onHideModal, show, type } = props;


    const { activeLang } = useContext(AppContext);


    const [newValue, setNewValue] = useState('');
    const [newDescValue, setNewDescValue] = useState('');
    const [uploadLoading, setUploadLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');


    useEffect(() => {
        if (data && type == 'EDIT') {
            setNewValue(data.title[activeLang]);
            setNewDescValue(data.description[activeLang]);
        } else {
            setNewValue('');
            setNewDescValue('');
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
            onDeleteData(data._id);
            return;
        } else {
            onEditData({ title: newValue, description: newDescValue });
            return;
        }
    }


    let ModalBody;

    if (type == 'NEW' || type == 'EDIT') {
        ModalBody = (
            <div className='action-modal-body'>

                <div className='content'>
                    <span>
                        Title
                    </span>
                    <input type='text' value={newValue} onInput={(e) => setNewValue(e.target.value)} />
                </div>

                <div className='content'>
                    <span>
                        Description
                    </span>
                    <textarea type='text' value={newDescValue} onInput={(e) => setNewDescValue(e.target.value)} />
                </div>

            </div>
        );
    };

    if (type == 'DELETE') {
        ModalBody = (
            <div className='action-modal-body'>
                <span>
                    ნამდვივლად გსურთ წაშლა ?
                </span>
            </div>
        );
    };

    if (type == 'UPLOAD') {
        <div className='upload-image' >
            <p>Please Select Image</p>
            <input type='file' onChange={(e) => choseFile(e)} size="60" />
        </div>
    }





    return (
        <Fragment>
            <BackDrop show={show} />
            <div className={show ? 'action-modal shown' : 'action-modal hidden'}>
                <div className='action-modal-body'>
                    {ModalBody}
                </div>
                <div className='action-modal-buttons'>
                    <AppButton
                        buttonClass='btn btn-danger'
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