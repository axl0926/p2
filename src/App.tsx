import Navbar from "@components/layout/navbar/Navbar";
import Schedule from "@/pages/Schedule";
import { Route, Routes } from "react-router-dom";
function App() {
    return (
        <div className="flex ">
            <Navbar />
            <Routes>
                <Route path="/schedule" element={<Schedule />} />
                <Route path="/task" element={<div>task</div>} />
                <Route path="/news" element={<div>neews</div>} />
            </Routes>
        </div>
    );
}

export default App;
