'use client'
import React, { useState, useEffect } from "react";
import ReportCard from "./ReportCard";
import ReportForm from "./ReportForm";
import { useAuthContext } from "@/contexts/authContext";
import useFetchWithToken from "@/hooks/fetchWithToken";

const DisplayUserReports = () => {
    const { pengguna } = useAuthContext();
    const fetchWithToken = useFetchWithToken();
    const [reports, setReports] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newReport, setNewReport] = useState({
        pelapor: "",
        isiLaporan: "",
        balasanLaporan: "",

    });

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/laporan`);
                if (!response.ok) {
                    throw new Error("Failed to fetch reports");
                }
                const data = await response.json();
                setReports(data.responseObject || []);
            } catch (error) {
                console.error("Error fetching reports:", error);
            }
        };
        fetchReports();
    }, []);

    const handleReportChange = (event) => {
        const { name, value } = event.target;
        setNewReport((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleRemoveReport = async (reportId) => {
        try {
            const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/hapusLaporan/${reportId}`, 'DELETE');
            if (!response.ok) {
                throw new Error("Failed to remove report");
            }
            setReports(reports.filter((report) => report.id !== reportId));
        } catch (error) {
            console.error("Error removing report:", error);
        }
    };

    const handleAddReport = async () => {
        if (!newReport.pelapor || !newReport.isiLaporan) {
            alert("Please provide all required input");
            return;
        }

        try {
            const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/buatLaporan`, 'POST', newReport);
            if (!response.ok) {
                throw new Error("Failed to add report");
            }
            const data = await response.json();
            setReports((prevState) => [...prevState, data.data]);
            setNewReport({
                pelapor: "",
                isiLaporan: "",
            });
            setShowAddModal(false);
            window.location.reload(); // Add this line to refresh the page
        } catch (error) {
            console.error("Error adding report:", error);
        }
    };

    const handleEditReport = async (reportId, balasanLaporan) => {
        try {
            const response = await fetchWithToken(`${process.env.NEXT_PUBLIC_API_URL}/balasLaporan/${reportId}`, 'PUT', { balasanLaporan });
            if (!response.ok) {
                throw new Error("Failed to edit report");
            }
            const data = await response.json();
            setReports(reports.map((report) =>
                report.id === data.data.id ? data.data : report
            ));
        } catch (error) {
            console.error("Error editing report:", error);
        } finally {
            setShowEditModal(false); // This line closes the modal
            window.location.reload();
        }
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