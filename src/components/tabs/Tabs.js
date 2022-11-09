import React, { useState } from 'react';


const Tabs = ({ group, setStatusGroup }) => {
    const [paymentStatusIndex, setPaymentStatusIndex] = useState(0);


    const changePaymentStatus = (selectedIndex) => {
        setPaymentStatusIndex(selectedIndex);

    };
    return (
        <ul className="tabs">
            {group.map((tab, i) => (
                <li key={tab}>
                    <button
                        type="button"
                        className={
                            i === paymentStatusIndex
                                ? 'tab-button selected'
                                : 'tab-button'
                        }
                        // name={tab}
                        onClick={(e) => { changePaymentStatus(i); setStatusGroup(tab) }}
                    >
                        {tab}
                    </button>
                </li>
            ))}
        </ul>
    )

}

export default Tabs;
