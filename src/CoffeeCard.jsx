import React, { useState } from "react";

// Inline SVG Icon for Coffee Cup (Image Fallback)
const CoffeeCupIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: "48px", height: "48px" }}
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" x2="6" y1="2" y2="4" />
    <line x1="10" x2="10" y1="2" y2="4" />
    <line x1="14" x2="14" y1="2" y2="4" />
  </svg>
);

export const CoffeeCard = ({ coffee }) => {
  const [imageError, setImageError] = useState(false);
  const { id, title, name, description, ingredients, image } = coffee;
  const displayName = title || name || "Untitled Roast";

  // Handle case where ingredients from API is a string or null
  const ingredientsList = Array.isArray(ingredients)
    ? ingredients
    : typeof ingredients === "string" && ingredients.trim()
    ? [ingredients.trim()]
    : [];

  return (
    <article className="coffee-card" id={`coffee-${id}`}>
      <div className="card-image-wrapper">
        {/* Coffee Image with Error Fallback */}
        {!image || imageError ? (
          <div className="image-placeholder">
            <CoffeeCupIcon />
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Aromatic Blend
            </span>
          </div>
        ) : (
          <img
            src={image}
            alt={displayName}
            className="coffee-image"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
        <div className="image-overlay"></div>
      </div>

      <div className="card-info">
        <div className="card-header-row">
          <h3 className="coffee-name">{displayName}</h3>
          <span className="coffee-id">#{id}</span>
        </div>

        <p className="coffee-desc">{description || "A delicious freshly brewed hot coffee crafted to perfection."}</p>

        {ingredientsList.length > 0 && (
          <div className="ingredients-container">
            <h4 className="ingredients-title">Ingredients</h4>
            <div className="ingredients-list">
              {ingredientsList.map((ingredient, index) => (
                <span key={`${id}-ing-${index}`} className="ingredient-pill">
                  {ingredient}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};


