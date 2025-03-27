import { useEffect, useState } from "react";

const UserSlides = ({ onSlidesCheck, currPage, folderID, onPageChange }) => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(currPage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setCurrentIndex(currPage);
  }, [currPage]);

  // Correcting the reset logic when `currentIndex` exceeds slide length
  useEffect(() => {
    if (slides.length > 0 && currentIndex >= slides.length) {
      setCurrentIndex(0);
      if (onPageChange) onPageChange(0);
    }
  }, [currentIndex, slides.length, onPageChange]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/getuserfolder/${folderID}/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch slides");
        }
        const data = await response.json();

        setSlides(data);
        onSlidesCheck(data.length > 0);
      } catch (error) {
        setError(error.message);
        onSlidesCheck(false);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex >= slides.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: 0,
        left: 0,
        backgroundColor: "#000",
      }}
    >
      {loading ? (
        <p className="text-gray-500 text-center">Loading slides...</p>
      ) : slides.length > 0 ? (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflowY: "auto",
          }}
        >
          {/* Slide Image */}
          {slides.length > 0 && slides[currentIndex] && (
            <img
              src={`http://127.0.0.1:8000${slides[currentIndex].slides}`}
              alt={`Slide ${currentIndex + 1}`}
              style={{
                width: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
              }}
            />
          )}

          {/* Slide Counter */}
          <p
            style={{
              position: "absolute",
              top: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              color: "#fff",
              fontSize: "18px",
              fontWeight: "bold",
              backgroundColor: "rgba(0,0,0,0.6)",
              padding: "8px 16px",
              borderRadius: "8px",
            }}
          >
            Slide {currentIndex + 1} of {slides.length}
          </p>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            style={{
              position: "absolute",
              left: "20px",
              bottom: "20px",
              backgroundColor: currentIndex === 0 ? "#aaa" : "#ccc",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: currentIndex === 0 ? "not-allowed" : "pointer",
            }}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "20px",
              bottom: "20px",
              backgroundColor: currentIndex >= slides.length - 1 ? "#aaa" : "#007bff",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              fontSize: "18px",
              cursor: currentIndex >= slides.length - 1 ? "not-allowed" : "pointer",
            }}
          >
            Next
          </button>
        </div>
      ) : (
        !loading && <p className="text-gray-500 text-center">No slides available.</p>
      )}
    </div>
  );
};

export default UserSlides;
