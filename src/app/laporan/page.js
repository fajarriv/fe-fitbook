import Navbar from "@/components/elements/Navbar.js";
import Reports from "@/components/laporan/DisplayUserReports.js";
import React from "react";

const index = () => {
    return (
        <>
            <div className="font-sans">
                <Navbar />
                <Reports />
            </div>
        </>
    );
};

export default index;