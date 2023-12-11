'use client'
import React, { useState, useEffect } from "react";
import ReportCard from "./ReportCard";
import ReportForm from "./ReportForm";

const DisplayUserReports = () => {
    const [reports, setReports] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newReport, setNewReport] = useState({
        pelapor: "",
        isiLaporan: "",
    });

    useEffect(() => {
        fetch('https://rpl.fitbookit.net/api/laporan')
            .then(response => response.json())
            .then(data => setReports(data.data));
    }, []);

    const handleReportChange = (event) => {
        const { name, value } = event.target;
        setNewReport((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRemoveReport = (reportId) => {
        fetch(`https://rpl.fitbookit.net/api/hapusLaporan/${reportId}`, {
            method: 'DELETE',
        })
        .then(() => {
            setReports(reports.filter((report) => report.id !== reportId));
        });
    };

    const handleAddReport = () => {
        if (!newReport.pelapor || !newReport.isiLaporan) {
            alert("Please provide all required input");
            return;
        }

        fetch('https://rpl.fitbookit.net/api/buatLaporan', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newReport),
        })
        .then(response => response.json())
        .then(data => {
            setReports((prevState) => [...prevState, data.data]);
            setNewReport({
                pelapor: "",
                isiLaporan: "",
            });
            setShowAddModal(false);
        });
    };

    const handleEditReport = (reportId, balasanLaporan) => {
        fetch(`https://rpl.fitbookit.net/api/balasLaporan/${reportId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balasanLaporan }),
        })
        .then(response => response.json())
        .then(data => {
            setReports(reports.map((report) =>
                report.id === data.data.id ? data.data : report
            ));
            setShowEditModal(false);
        });
    };

    return (
        <div className="items-center m-8">
            <h1 className="text-4xl text-center my-8 font-bold">User Reports</h1>
            <div className="mt-4 text-center mb-8">
                <button
                    className="bg-green p-4 rounded font-semibold text-white"
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