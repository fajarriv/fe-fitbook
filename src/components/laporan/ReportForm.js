import React from "react";

const ReportForm = ({ handleAddReport, setShowModal, newReport, handleReportChange }) => {
    return (
        <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                    <div className="bg-white text-black p-4 rounded text-center">
                        <h2 className="text-center font-bold text-3xl mb-2">
                            Add New Report
                        </h2>
                        <hr className="border-t-2 border-gray-500" />
                        <div className="mb-2 mt-4">
                            <label className="font-bold mr-2" htmlFor="title">
                                Title:
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newReport.title}
                                onChange={handleReportChange}
                                className="bg-white border border-black rounded px-2"
                                placeholder="Report Title"
                                autoComplete="off"
                            />
                        </div>
                        <div className="mb-2">
                            <label className="font-bold mr-2" htmlFor="description">
                                Description:
                            </label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                value={newReport.description}
                                onChange={handleReportChange}
                                className="bg-white border border-black rounded px-2"
                                placeholder="Report Description"
                                autoComplete="off"
                            />
                        </div>
                        <div className="flex justify-center mt-8">
                            <button
                                className="bg-blue-700 text-white p-2 font-bold mr-4 rounded-lg"
                                onClick={handleAddReport}
                            >
                                Add Report
                            </button>
                            <button
                                className="bg-red-700 text-white p-2 font-bold rounded-lg"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportForm;