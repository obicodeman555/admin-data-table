import React from 'react'
import funnelIcon from '../../assets/svg/funnel.svg';
const FilterButton = () => {
    return (
        <div className="action-group__item data-table__filter">
            <button>
                <span className="item__icon item__icon--funnel">
                    <img src={funnelIcon} alt="funnel icon" />
                </span>
                <span>Filter</span>
            </button>
        </div>
    )
}

export default FilterButton