import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PredictiveAI from "./pages/PredictiveAI";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/presale" element={<HomePage />} />
        <Route path="/predictive-ai" element={<PredictiveAI />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
