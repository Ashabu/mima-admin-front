import React, {useState} from 'react';
import './appSearch.scss';

const AppSearch = (props) => {

    const [searchValue, setSearchValue] = useState('');
    return (
        <div className = 'appSearch'>
            <input type = 'text' value = { searchValue } placeholder = 'Search...'
                onFocus = {(e) => e.target.placeholder = ''} 
                onBlur = {(e) => e.target.placeholder = 'Search...'} 
                onChange = {(e) => {setSearchValue(e.target.value); props.onSearch(e.target.value)}} />
        </div>
    )
}

export default AppSearch;


