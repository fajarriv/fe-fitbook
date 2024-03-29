import React, { useEffect, useState } from "react";
import EditReportForm from "./EditReportForm";
import { useAuthContext } from "@/contexts/authContext";

const ReportCard = ({ report, showModal, setShowModal, removeReport, editReport }) => {
    const [isEditing, setIsEditing] = useState(false);
    const { pengguna } = useAuthContext();
    const userRole = pengguna.role;

    useEffect(() => {
        if (!showModal) {
            setIsEditing(false)
        }
    }, [showModal]);

    return (
        <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-green text-white rounded p-4 flex flex-col flex-grow">
            <div className="bg-green mt-2 p-4 rounded-lg text-white">
                <h5 className="text-xl font-bold">Pelapor : {report.pelapor}</h5>
                <p className="text-md mt-2">Isi : {report.isiLaporan}</p>
                <p className="text-md mt-2">Balasan Laporan : {report.balasanLaporan}</p>
                <div className="relative h-16">
                    {userRole.toLowerCase() === 'admin' && (
                        <div className="absolute bottom-0 left-0">
                            <button className="btn btn-danger mt-4 rounded text-white" onClick={() => removeReport(report)}>
                                Remove
                            </button>
                        </div>
                    )}
                    {userRole.toLowerCase() === 'admin' && (
                        <div className="absolute bottom-0 right-0">
                            <button className="m-1 text-white" onClick={() => {setIsEditing(true); setShowModal(true)}}>
                                Reply
                            </button>
                            {showModal && isEditing && (
                                <EditReportForm
                                    setShowModal={setShowModal}
                                    report={report}
                                    editReport={editReport}
                                />
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReportCard;