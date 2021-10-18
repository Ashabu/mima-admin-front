import React from 'react';

const UserList = (props) => {
    const {userName, name, surname} = props.data;
    return (
        <div className = 'list-item'>
            <div className = 'list-item-index'>
                {props.index + 1}
            </div>
            <div className = 'list-item-body' style ={{flexDirection: 'row'}}>
                <span className = 'list-item-title'>{userName}</span>
                <span className = 'list-item-title'>{name}</span>
                <span className = 'list-item-title'>{surname}</span>
         
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

export default UserList;