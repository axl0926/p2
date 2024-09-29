import Navbar from "@components/layout/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
function App() {
    return (
        <div className="flex ">
            <Navbar />
            <Routes>
                <Route path="/schedule" element={<div>schedule</div>} />
                <Route path="/task" element={<div>task</div>} />
                <Route path="/news" element={<div>neews</div>} />
            </Routes>
        </div>
    );
}

export default App;
