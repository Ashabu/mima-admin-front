import React from 'react';

const ImageList = (props) => {
    const { data, onEditImg, onDeleteImg } = props;
    return (
        <div className='image-list'>
            <div className='img'>
                <img src={data?.imgUrl} />
            </div>
            <div className='list-wrap'>
                <div className='action-icons'>
                    <div className='edit-icon'>
                        <img src='../../Assets/Images/edit-icon.png' onClick={onEditImg} />
                    </div>
                    <div className='del-icon'>
                        <img src='../../Assets/Images/delete-icon.png' onClick={onDeleteImg} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImageList;