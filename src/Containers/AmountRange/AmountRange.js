import React, { useState } from 'react';
import Commissions from '../../Services/CommissionsService';
import ItemList from '../../Components/ItemLIst/ItemList';
import AppButton from '../../Components/UI/AppButton/AppButton';
import ActionModal from '../../Components/UI/Modals/ActionModal';

const AmountRange = (props) => {

    const [singleRangeData, setSingleRangeData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [actionType, setActionType] = useState('');


    const handleNewAmountRange = (data) => {
        setBtnLoading(true);

        if (actionType == 'EDIT') {
            let newData = { ...singleRangeData }
            newData.percent = data.title;
            newData.range = data.description;

            Commissions.EditAmountRange(newData._id, newData).then(res => {
                if (res.data.success) {
                    setBtnLoading(false);
                    setShowModal(false);
                    props.callBack();
                } else {
                    setBtnLoading(false);
                };
            })
                .catch(e => {
                    console.log(e);
                });
        } else {
            let newData = {
                percent: data.title,
                range: data.description,
            };
            Commissions.CreateAmountRange(newData)
                .then(res => {
                    if (res.data.success) {
                        setBtnLoading(false);
                        setShowModal(false);
                        props.callBack();
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



    const handleDeleteAmountRange = () => {
        setBtnLoading(true);
        Commissions.DeleteAmountRange(singleRangeData._id).then(res => {
            if (res.data.success) {
                setBtnLoading(false);
                setShowModal(false);
                props.callBack();
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


    const handleSingleRange = (data) => {
        setSingleRangeData(data.data);
        if (data.isEditing) {
            setActionType('EDIT')
        } else {
            setActionType('DELETE');
        };
        setShowModal(true);

    }

    return (
        <div style={{marginTop: 30}}>
            <ActionModal
                hasTitle
                show={showModal}
                onHideModal={() => { setShowModal(false) }}
                type={actionType}
                data={singleRangeData}
                onEditData={handleNewAmountRange}
                onDeleteData={handleDeleteAmountRange}
                loading={btnLoading} />
            {props.amountRanges.map((item, index) => (
                <ItemList key={index} data={item} index={index}
                    onShowModal={() => { setActionType('EDIT'); setShowModal(true) }}
                    onGetData={handleSingleRange}
                />
            ))}
            <AppButton
                buttonClass='button-add'
                onClick={() => { setActionType('NEW'); setShowModal(true) }}>
                დამატება
            </AppButton>
        </div>
    );
};

export default AmountRange;