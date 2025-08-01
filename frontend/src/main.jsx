import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./contexts/AppContext.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <BrowserRouter basename="/">
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </BrowserRouter>
    </StrictMode>
);
