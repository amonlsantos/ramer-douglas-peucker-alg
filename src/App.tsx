import { useState, useEffect } from "react";
import "./App.css";
import FilterComponent from "./components/Filter.tsx";
import MapComponent from "./components/Map.tsx";
import { MapProvider } from "./providers/MapProvider.tsx";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Aplica a classe no body
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <MapProvider>
      <div className="container">
        <div className="row">
          <div className="col-12 text-center d-flex justify-content-between">
            <h1>Ramer Douglas Peucker Algorithm</h1>
            <a
              className="dark-toggle"
              onClick={() => setIsDarkMode(!isDarkMode)}
              title="Switch dark/light mode"
            >
              {isDarkMode ? "☀️" : "🌙"}
            </a>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-12-lg sm:col-12">
            <div className="map-wrapper">
              <div className="filter-panel card">
                <FilterComponent />
              </div>

              <MapComponent />
            </div>
          </div>
        </div>
      </div>
    </MapProvider>
  );
}

export default App;
