import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import ActivityCard from "../components/ActivityCard";
import DetailBar from "../components/DetailBar";
import '../styles/activityFeed.css'
import Archive from '../images/download-file.png';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecords } from "../store/slices/getActivitiesReducer";
import Loader from "../components/loader";
import { patchhRecords } from "../store/slices/patchActivitesReducer";

const ArchivedCalls = () => {
    const dispatch = useDispatch();
    const { data, loading } = useSelector(state => state.activities);
    const { data: patchData, loading: patchLoading } = useSelector(state => state.patchActivites);

    const [isOpen, setIsOpen] = useState(false);
    const [activites, setActivites] = useState([])
    const [detailId, setDetailId] = useState("")

    useEffect(() => {
        if (data.length > 0) {
            return
        }
        dispatch(fetchRecords());
    }, [dispatch, data.length]);

    useEffect(() => {
        if (data) {
            setActivites(data)
        }
    }, [data]);

    const handleToggle = async (callId) => {
        setIsOpen(!isOpen);
        setTimeout(() => {
            setDetailId(callId)
        }, 400);
    };


    const handleArchive = async (callId, isArchived, callback = null, type) => {
        dispatch(patchhRecords(callId, !isArchived)).then(() => {
            // Once the PATCH request is successful, fetch the latest data
            if (type === "single" && patchData.length > 0) {
                alert(patchData);
            }
            if (typeof callback === 'function') {
                callback();
            } else {
                dispatch(fetchRecords());
            }
        });
    };

    const handleUnArchiveAll = async () => {
        const promises = activites.filter(item => !item.is_archived).map((item) => handleArchive(item.id, item.is_archived));
        await Promise.all(promises);
        dispatch(fetchRecords())
    };

    return (
        <main>
            <NavBar notificationCount={activites
                .filter(item => !item.is_archived).length} buttonTitle={'Unarchive all calls'} btnIcon={Archive}
                onClickButton={handleUnArchiveAll}
            />
            <div className="main-content">
                {patchLoading &&
                    <Loader />
                }
                {loading ?
                    <Loader />
                    :
                    <>
                        {activites
                            .filter(item => !item.is_archived) // only show items where is_archived is false
                            .map(item => (
                                <ActivityCard
                                    to={item.to}
                                    from={item.from}
                                    timestamp={item.created_at}
                                    direction={item.direction}
                                    isArchived={item.is_archived}
                                    key={item.id}
                                    callType={item.call_type}
                                    onDetail={() => handleToggle(item.id)}
                                    onClickArchive={() => handleArchive(item.id, item.is_archived, "single")}
                                />
                            ))}
                    </>
                }
            </div>
            <DetailBar detailID={detailId} isOpen={isOpen} onToggle={handleToggle} />
            {isOpen && <div className="overlay" />}
        </main>
    )
}
export default ArchivedCalls;