import React, { useEffect, useState } from "react";
import EditReportForm from "./EditReportForm";

const ReportCard = ({ report, showModal, setShowModal, removeReport, editReport }) => {
    const [isEditing, setIsEditing] = useState(false);
    
    useEffect(() => {
        if (!showModal) {
            setIsEditing(false)
        }
    }, [showModal]);

    return (
        <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-offwhite rounded p-4 flex flex-col flex-grow">
            <div className="bg-blue-800 mt-2 p-4 rounded-lg">
                <h5 className="text-xl font-bold">{report.title}</h5>
                <p className="text-md mt-2">{report.description}</p>
                <div className="relative h-16">
                    <div className="absolute bottom-0 left-0">
                        <button className="btn btn-danger mt-4 rounded" onClick={() => removeReport(report)}>
                            Remove
                        </button>
                    </div>
                    <div className="absolute bottom-0 right-0">
                        <button className="m-1" onClick={() => {setIsEditing(true); setShowModal(true)}}>
                            Edit
                        </button>
                        {showModal && isEditing && (
                            <EditReportForm
                                setShowModal={setShowModal}
                                report={report}
                                editReport={editReport}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportCard;