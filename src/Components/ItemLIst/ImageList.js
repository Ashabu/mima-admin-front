import React from 'react';

const ImageList = (props) => {
   const {data, onDeleteImg} = props;
    return (
        <div className = 'image-list'>
            <div className = 'img'>
                 <img src ={data?.imgUrl} />
            </div>
            <div className = 'del-icon'>
                <img src = '../../Assets/Images/delete-icon.png' onClick = {onDeleteImg}/>
            </div>
        </div>
    );
};

export default ImageList;