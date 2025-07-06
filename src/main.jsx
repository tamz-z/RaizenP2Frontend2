import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";

// Startpunt van de React applicatie
// Render de App component in het HTML element met id 'root'
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Exporteer App als default export (optioneel, kan gebruikt worden in tests)
export default App;
