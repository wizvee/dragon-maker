import { Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "./routes/ProtectedLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import StatPage from "./pages/StatPage";
import ProjectPage from "./pages/ProjectPage";
import ActionPage from "./pages/ActionPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/stat/:statName" element={<StatPage />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/action/:id" element={<ActionPage />} />
      </Route>
    </Routes>
  );
}

export default App;
