'use client'
import React, { useState, useEffect } from "react";
import ReportCard from "./ReportCard";
import ReportForm from "./ReportForm";

const DisplayUserReports = () => {
    const [reports, setReports] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newReport, setNewReport] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        // Placeholder reports
        setReports([
            { id: 1, title: "Report 1", description: "Description 1" },
            { id: 2, title: "Report 2", description: "Description 2" },
            { id: 3, title: "Report 3", description: "Description 3" },
        ]);
    }, []);

    const handleReportChange = (event) => {
        const { name, value } = event.target;
        setNewReport((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRemoveReport = (report) => {
        const newReports = reports.filter(
            (reportDetail) => reportDetail !== report
        );
        setReports(newReports);
    };

    const handleAddReport = () => {
        if (!newReport.title || !newReport.description) {
            alert("Please provide all required input");
            return;
        }

        setReports((prevState) => [...prevState, newReport]);
        setNewReport({
            title: "",
            description: "",
        });
        setShowAddModal(false);
    };

    const handleEditReport = (reportId, reportTitle, reportDescription) => {
        const editedReport = {
            id: reportId,
            title: reportTitle,
            description: reportDescription,
        };
        setReports((prevState) =>
            prevState.map((report) =>
                report.id === editedReport.id ? editedReport : report
            )
        );
        setShowEditModal(false);
    };

    return (
        <div className="items-center m-8">
            <h1 className="text-4xl text-center my-8 font-bold">User Reports</h1>
            <div className="mt-4 text-center mb-8">
                <button
                    className="bg-blue-600 p-4 rounded font-semibold"
                    onClick={() => setShowAddModal(true)}
                >
                    Add New Report
                </button>
            </div>
            {showAddModal && (
                <ReportForm
                    handleAddReport={handleAddReport}
                    setShowModal={setShowAddModal}
                    newReport={newReport}
                    handleReportChange={handleReportChange}
                />
            )}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-4">
                {reports?.map((report) => (
                    <div className="col-md-4 mb-4 mx-4 flex" key={report.id}>
                        <ReportCard
                            report={report}
                            showModal={showEditModal}
                            setShowModal={setShowEditModal}
                            removeReport={handleRemoveReport}
                            editReport={handleEditReport}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DisplayUserReports;