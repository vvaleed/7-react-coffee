import React from "react";
import { useState, useEffect, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { CoffeeCard } from "./CoffeeCard";
import "./index.css";

const WarningIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="status-icon error"
    style={{ width: "48px", height: "48px" }}
  >
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" x2="12" y1="9" y2="13" />
    <line x1="12" x2="12.01" y1="17" y2="17" />
  </svg>
);

const SparklesIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "14px", height: "14px" }}
  >
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
  </svg>
);

const App = () => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Coffee Data
  const fetchCoffees = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://api.sampleapis.com/coffee/hot");
      if (!response.ok) {
        throw new Error(`Failed to load coffee list (status: ${response.status})`);
      }
      const data = await response.json();
      if (Array.isArray(data)) {
        setCoffees(data);
      } else {
        throw new Error("Received invalid coffee data from the server.");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred while loading data.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Run fetch on mount
  useEffect(() => {
    fetchCoffees();
  }, [fetchCoffees]);

  return (
    <div className="app-container">
      <div className="content-wrapper">

        {/* Header */}
        <header className="app-header">
          <div className="brand-badge">
            <SparklesIcon />
            <span>Waleed's Coffee Shop</span>
          </div>
          <h1 className="app-title">The Coffee House</h1>
        </header>

        {/* Results Metadata Row */}
        {!error && coffees.length > 0 && !loading && (
          <section className="results-info" aria-label="Results metadata">
            <div>
              <span>Displaying {coffees.length} artisanal selections</span>
            </div>
          </section>
        )}

        {/* Main Display Area */}
        <main>
          {loading ? (
            <div className="status-container">
              <h2 className="status-title">Loading Coffee Menu...</h2>
              <p className="status-desc">Freshly brewing your selections.</p>
            </div>
          ) : error ? (
            /* Error Screen */
            <div className="status-container">
              <WarningIcon />
              <h2 className="status-title">Unable to Load Menu</h2>
              <p className="status-desc">{error}</p>
              <button
                type="button"
                className="status-action-btn"
                onClick={fetchCoffees}
              >
                Try Again
              </button>
            </div>
          ) : (
            /* Display actual coffee list */
            <div className="coffee-grid">
              {coffees.map((coffee) => (
                <CoffeeCard
                  key={`coffee-item-${coffee.id}`}
                  coffee={coffee}
                />
              ))}
            </div>
          )}
        </main>



      </div>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(React.createElement(App));