import * as React from "react";
import Button from "../Button";
import './ActivityCard.css';
import Inbound from '../../images/incoming-call.png';
import Outbound from '../../images/phone-receiver.png';
import { formatTime } from "../../utils";

const ActivityCard = ({
    direction,
    from,
    to,
    isArchived,
    callType,
    onDetail,
    timestamp,
    onClickArchive
}) => {

    const formattedTime = React.useMemo(() => formatTime(timestamp), [timestamp]);

    return (
        <div className="card-block">
            <div className={"card-block-row"}>
                <div className="direction-icon">
                    <img src={direction == 'inbound' ? Inbound : Outbound} />
                </div>
                <div>
                    <h5>{formattedTime}</h5>
                    {/* <span className="notification-count">{count}</span> */}
                </div>
            </div>
            <div className="main-text-content">
                <div className="text-container">
                    <h3>{from}</h3>
                </div>
                <div className="text-container">
                    <h4>{to}</h4>
                </div>
            </div>
            <div className="card-block-row">
                <div>
                    <Button title={"Details"} onClick={onDetail} btnStyle={"underlined"} btnType={"secondary"} />
                </div>
                <div>
                    <h5 style={
                        callType === 'answered' ? { color: 'green' } :
                            callType === 'missed' ? { color: 'red' } :
                                callType === 'voicemail' ? { color: 'orange' } :
                                    {}
                    }>{callType}</h5>
                </div>
            </div>
            <div className="bottom-container">
                <Button title={isArchived ? 'Archive' : 'Unarchive'} btnStyle={"outlined"} btnType={"secondary"} onClick={onClickArchive} />
            </div>
        </div >
    )
}

export default ActivityCard;