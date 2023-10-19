import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import IndexPage from "./pages/Index";
import NotFoundPage from "./pages/NotFound";
import MojaNatjecanjaPage from "./pages/MojaNatjecanja";
import NatjecanjePage from "./pages/Natjecanje";
import RequireAuth from "./components/RequireAuth";

function App() {

    return (
        <Auth0Provider
            domain="dev-ahx3qspzvlm3wqgs.eu.auth0.com"
            clientId="ISz3ErELJnA5dpHou1NlI4JN3yyGtbjF"
            authorizationParams={{
                redirect_uri: window.location.origin,
            }}
            cacheLocation={'localstorage'}
        >
            <BrowserRouter>
                <Routes>
                    <Route path='*' element={<NotFoundPage />} />
                    <Route path="/" element={<IndexPage />} />
                    <Route path="/moja-natjecanja" element={<RequireAuth><MojaNatjecanjaPage /></RequireAuth>} />
                    <Route path="/natjecanje/:id" element={<NatjecanjePage />} />
                </Routes>
            </BrowserRouter>
        </Auth0Provider>
    );
}

export default App;