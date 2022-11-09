import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import { dateFormat } from '../../utils/dateFormat';
import threeDotsIcon from "../../assets/svg/vertical-three-dots.svg";
import "./table-body.scss";


const TableBody = ({ users }) => {
    const [hasDetails, setHasDetails] = useState(false);
    const [activeId, setActiveId] = useState();

    const handleClick = (id) => {
        setActiveId(id);
        setHasDetails(has => !has)
    }

    return (
        <div className='table-body'>

            {
                users?.length === 0 ? (<div className='loading'>
                    <span className="loader"></span>
                    <span>Processing...</span>
                </div>) :
                    users?.map((user) => (

                        <main key={user.id}>
                            <article className='table__row'>
                                <div className='flex-1 hrztal-stack'>
                                    <span className='hrztal-stack checkbox'>
                                        <input type="checkbox" />

                                    </span>
                                    <span className={`hrztal-stack spacing-left-md-2 ${hasDetails && activeId === user.id ? "rotate" : "remove-rotate"}`} onClick={() => handleClick(user.id)}>
                                        <Icon icon="ph:caret-circle-down" style={{ color: "#8B83BA", fontSize: '20px' }} />
                                    </span>
                                </div>
                                <div className='vertical-stack flex-3'>
                                    <span>{`${user.firstName} ${user.lastName}`}</span>
                                    <span className='text-sm-grey fw-300'>{user.email}</span>
                                </div>
                                <div className='vertical-stack flex-3'>
                                    <span className={`pill-tag ${user.userStatus === "active" ? "active" : user.userStatus === "inactive" && "in-active"}`}>
                                        <Icon icon="ci:dot-04-l" />
                                        <span className='text-xs text-capitalize'>{user.userStatus}</span>
                                    </span>
                                    <span>
                                        <span className='text-xs-grey'>Last login:</span>
                                        <span className="text-sm-grey"> {dateFormat(user.lastLogin)}</span>
                                    </span>
                                </div>
                                <div className='vertical-stack flex-2'>
                                    <span className={`pill-tag ${user.paymentStatus === "paid" ? "paid" : user.paymentStatus === "unpaid" ? "unpaid" : user.paymentStatus === "overdue" && "overdue"}`}>
                                        <Icon icon="ci:dot-04-l" />
                                        <span className='text-xs text-capitalize'>{user.paymentStatus}</span>
                                    </span>
                                    <span className='text-sm'>
                                        {user?.paymentStatus === "paid" ? `Paid on ${dateFormat(user.paidOn)}` : user?.paymentStatus === "unpaid" ? `Dues on ${dateFormat(user.paidOn)}` : user?.paymentStatus === "overdue" && `Dued on ${dateFormat(user.paidOn)}`}
                                    </span>
                                </div>
                                <div className='vertical-stack flex-1'>
                                    <span>
                                        ${((user.amountInCents) / 100).toFixed(2)}
                                    </span>
                                    <span className="text-sm-grey spacing-left-md fw-300">
                                        USD
                                    </span>
                                </div>
                                <div className='flex-1 hrztal-stack place-at-end'>
                                    <span className="text-xs-grey spacing-right-md">
                                        View More
                                    </span>
                                    <span className=''>
                                        <img src={threeDotsIcon} alt="three vertical dots icon" />
                                    </span>
                                </div>
                            </article>
                            <article>
                                {
                                    activeId === user.id && (hasDetails && <div className='table-row__details'>
                                        <div className='table-activity__head'>
                                            <div className='table-activity__row'>
                                                <div className='flex-1'>date</div>
                                                <div className='flex-2'>user activity</div>
                                                <div className='flex-3 hrztal-stack'>
                                                    <span>details</span>
                                                    <Icon icon="charm:circle-warning" style={{ color: "#8B83BA", fontSize: '18px', marginLeft: "5px" }} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='table-activity__body'>
                                            {
                                                user.activities?.map((activity, i) => (
                                                    <div className='table-activity__row table-activity__row--background-grey' key={i}>
                                                        <span className='flex-1 text-md-grey '>
                                                            {dateFormat(activity.date)}
                                                        </span>
                                                        <span className='flex-2 text-sm fw-300'>{activity.userActivity}</span>
                                                        <span className='flex-3 text-sm fw-300'>{activity.details}</span>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>)
                                }
                            </article>
                        </main>




                    )
                    )
            }


        </div>
    )
}

export default TableBody