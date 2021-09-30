import React from 'react';
import './itemLIst.scss';

const ItemList = (props) => {
    const {title, description} = props.data
    return (
        <div className = 'list-item'>
            <div className = 'list-item-index'>
                {props.index + 1}
            </div>
            <div className = 'list-item-body'>
                <span className = 'list-item-title'>{title}</span>
                <span className = 'list-item-desc'>{description}</span>
            </div>
            <div className = 'list-item-edit' onClick = {() => props.onEditing(props.data)} style={{marginRight: 10}}>
                <img src = '../../Assets/Images/edit-icon.png' alt='icon' />
            </div>
            <div className = 'list-item-delete' onClick = {props.onShowModal}>
                <img src = '../../Assets/Images/delete-icon.png' alt='icon' />
            </div>
        </div>
    );
};

export default ItemList;