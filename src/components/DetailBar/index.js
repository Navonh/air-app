import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecordDetails } from '../../store/slices/getActivityDetailReducer';
import { formatTime } from '../../utils';
import Button from '../Button';
import Loader from '../loader';
import './DetailBar.css';

const DetailBar = ({ isOpen, onToggle, detailID }) => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.activityDetail);

    const [details, setDetails] = useState([])
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        if (!detailID) {
            return
        }
        dispatch(fetchRecordDetails(detailID));
    }, [detailID, dispatch]);

    useEffect(() => {
        if (data) {
            setDetails(data)
        }
    }, [data]);

    useEffect(() => {
        if (isOpen) {
            document.getElementById("detailBar").classList.add("open");
            document.body.classList.add('sidebar-open');
        } else {
            document.getElementById("detailBar").classList.remove("open");
            document.body.classList.remove('sidebar-open');
        }
    }, [isOpen]);


    useEffect(() => {
        function handleScroll() {
            const scrollTop = window.pageYOffset;
            if (scrollTop > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const divStyle = {
        top: isScrolled ? '245px' : '0',
    };
    return (
        <div id="detailBar" className="detailBar"
        >
            <div className='detailBar-inner'>
                {loading ?
                    <Loader />
                    :
                    (details &&
                        <>
                            <Button title={"Close"} onClick={onToggle} btnStyle={"underlined"} btnType={"secondary"} />
                            {/* DetailBar content */}
                            <div className='detail-title-row'>
                                <h2>Details</h2>
                            </div>
                            <div className='detail-row-container'>
                                {details.from &&
                                    <div className='detail-row'>
                                        <h3>From:</h3>
                                        <h4>{details.from}</h4>
                                    </div>
                                }
                                {details.to &&
                                    <div className='detail-row'>
                                        <h3>To:</h3>
                                        <h4>{details.to}</h4>
                                    </div>
                                }

                                {details.duration &&
                                    <div className='detail-row'>
                                        <h3>Duration:</h3>
                                        <h4>{details.duration}</h4>
                                    </div>
                                }
                                {details.created_at &&

                                    <div className='detail-row'>
                                        <h3>Created at:</h3>
                                        <h4>{formatTime(details.created_at)}</h4>
                                    </div>
                                }
                                {details.call_type &&

                                    <div className='detail-row'>
                                        <h3>Call status:</h3>
                                        <h4>{details.call_type}</h4>
                                    </div>
                                }
                                {details.via &&

                                    <div className='detail-row'>
                                        <h3>Call via:</h3>
                                        <h4>{details.via}</h4>
                                    </div>
                                }
                                {details.direction &&
                                    <div className='detail-row'>
                                        <h3>Call type:</h3>
                                        <h4>{details.direction === "inbound" ? "Incoming" : "Outgoing"}</h4>
                                    </div>
                                }
                            </div>
                            <div className="bar-bottom-container">
                                <Button title={details.is_archived ? 'Archive' : 'Unarchive'} btnStyle={"outlined"} btnType={"secondary"} />
                            </div>
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default DetailBar;
