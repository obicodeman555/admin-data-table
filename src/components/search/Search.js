import React from 'react'
import searchIcon from '../../assets/svg/search.svg';
const Search = () => {
    return (
        <div className="action-group__item data-table__search">
            <span className="item__icon item__icon--search">
                <img src={searchIcon} alt="search icon" />
            </span>
            <input
                type="text"
                placeholder="Search Users by Name, Email or Date"
            />
        </div>
    )
}

export default Search