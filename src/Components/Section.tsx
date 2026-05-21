import { ReactNode } from "react";
import { useDogs } from "../providers/DogsProvider";

export const Section = ({
  label,
  children,
}: {
  // No more props than these two allowed
  label: string;
  children: ReactNode;
}) => {
  const { dogs, activeTab, setActiveTab } = useDogs();
  const favoritedCount = dogs.filter((d) => d.isFavorite).length;
  const unfavoritedCount = dogs.filter((d) => !d.isFavorite).length;
  
  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">{label}</div>
        <div className="selectors">
          {/* This should display the favorited count */}
          <div
            className={`selector ${activeTab === "favorited" ? "active" : ""}`}
            onClick={() => {
              setActiveTab((prev) => (prev === "favorited" ? null : "favorited"));
            }}
          >
            favorited ( {favoritedCount} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${activeTab === "unfavorited" ? "active" : ""}`}
            onClick={() => {
              setActiveTab((prev) => (prev === "unfavorited" ? null : "unfavorited"));
            }}
          >
            unfavorited ( {unfavoritedCount} )
          </div>
          <div
            className={`selector ${activeTab === "create" ? "active" : ""}`}
            onClick={() => {
              setActiveTab((prev) => (prev === "create" ? null : "create"));
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">{children}</div>
    </section>
  );
};
