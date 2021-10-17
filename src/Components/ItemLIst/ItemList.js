import React, { useContext } from 'react';
import './itemLIst.scss';
import { AppContext } from '../../Context/AppContext';

const ItemList = (props) => {
    const {title, description, itemKey, linkUrl, imgUrl} = props.data;
    const {activeLang} = useContext(AppContext)
    return (
        <div className = 'list-item'>
            <div className = 'list-item-index'>
                {props.index + 1}
            </div>
            <div className = 'list-item-body'>
                <img src = {imgUrl} />
                <span className = 'list-item-title'>{linkUrl || title[activeLang]}</span>
                <span className = 'list-item-desc'>{description?.[activeLang]}</span>
            </div>
            
            <div className = 'list-item-edit' onClick = {() => props.onGetData({isEditing:true, data: props.data})} style={{marginRight: 10}}>
                <img src = '../../Assets/Images/edit-icon.png' alt='icon' />
            </div>
            <div className = 'list-item-delete' onClick = {() =>  props.onGetData({isEditing:false, data: props.data})}>
                <img src = '../../Assets/Images/delete-icon.png' alt='icon' />
            </div>
        </div>
    );
};

export default ItemList;