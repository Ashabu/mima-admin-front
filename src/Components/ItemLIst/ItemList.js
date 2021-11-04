import React, { useContext } from 'react';
import './itemLIst.scss';
import { AppContext } from '../../Context/AppContext';

const ItemList = (props) => {
    const {title, description, itemKey, linkUrl, hasLink, imgUrl, percent, range} = props.data;
    const {activeLang} = useContext(AppContext)
    return (
        <div className = 'list-item'>
            <div className = 'list-item-index'>
                {props.index + 1}
            </div>
            <div className = 'list-item-body'>
                <img src = {imgUrl} />
                {hasLink? 
                <a href ={linkUrl} target='_blank'><span className = 'list-item-title'>{title?.[activeLang] || percent}</span></a>
                :
                <span className = 'list-item-title'>{linkUrl || title?.[activeLang] || percent}</span>
                }
                
                <span className = 'list-item-desc'>{description?.[activeLang] || range}</span>
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