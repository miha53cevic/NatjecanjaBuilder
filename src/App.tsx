import { BrowserRouter, Route, Routes } from "react-router-dom";

import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import MojaNatjecanjaPage from "./pages/MojaNatjecanja";
import NatjecanjePage from "./pages/Natjecanje";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='*' element={<NotFoundPage />} />
                <Route path="/"  element={<IndexPage />} />
                <Route path="/moja-natjecanja" element={<MojaNatjecanjaPage />} />
                <Route path="/natjecanje/:id" element={<NatjecanjePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;