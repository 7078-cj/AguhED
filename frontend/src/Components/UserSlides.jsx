import { useEffect, useState } from "react";

const UserSlides = ({onSlidesCheck, currPage , folderID}) => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(currPage);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        setCurrentIndex(currPage);
    }, [currPage])

    useEffect(() => {
        const fetchSlides = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getuserfolder/${folderID}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch slides");
                }
                const data = await response.json();
                
                setSlides(data);
                onSlidesCheck(data.length > 0);  // ✅ Notify Home.js whether slides exist
            } catch (error) {
                setError(error.message);
                onSlidesCheck(false); // ✅ If error, tell Home.js there are no slides
            } finally {
                setLoading(false);
            }
        };

        fetchSlides();
    }, []); // ✅ Add `onSlidesCheck` in dependencies

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
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
  {slides.length > 0 ? (
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
      <img
        src={`http://127.0.0.1:8000${slides[currentIndex].slides}`}
        alt={`Slide ${currentIndex + 1}`}
        style={{
            width: "100%",
            maxHeight: "90vh", // Prevents cut-off
            objectFit: "contain",
            
        }}
        />

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        disabled={slides.length <= 1}
        style={{
          position: "absolute",
          left: "20px",
          bottom: "20px",
          backgroundColor: "#ccc",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "18px",
        }}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        disabled={slides.length <= 1}
        style={{
          position: "absolute",
          right: "20px",
          bottom: "20px",
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "12px 20px",
          borderRadius: "8px",
          fontSize: "18px",
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
