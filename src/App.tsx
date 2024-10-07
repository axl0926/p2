import Navbar from "@components/layout/navbar/Navbar";
import Schedule from "@/pages/Schedule";
import Todolist from "@/pages/Todolist";
import News from "@/pages/News";
import { Route, Routes } from "react-router-dom";
import Toast from "@components/common/Toast";
import { useUIStateStore } from "./context/useUIStateStore";
function App() {
  const isToastOpen = useUIStateStore((state) => state.isToastOpen);
  return (
    <div className="flex">
      <Navbar />
      <Routes>
        <Route path="/" element={<Schedule />} />
        <Route path="/task" element={<Todolist />} />
        <Route path="/news" element={<News />} />
      </Routes>
      {isToastOpen && <Toast />}
    </div>
  );
}

export default App;
