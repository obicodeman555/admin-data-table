import React, { useState } from 'react';


const Tabs = ({ group }) => {
    const [paymentStatusIndex, setPaymentStatusIndex] = useState(0);

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
                        name={tab}
                        onClick={() => setPaymentStatusIndex(i)}
                    >
                        {tab}
                    </button>
                </li>
            ))}
        </ul>
    )

}

export default Tabs;
