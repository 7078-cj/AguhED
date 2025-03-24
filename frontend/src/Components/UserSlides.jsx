import { useEffect, useState } from "react";

const UserSlides = ({ folderID, onSlidesCheck, currPage }) => {
    const [slides, setSlides] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
    }, [folderID, onSlidesCheck]); // ✅ Add `onSlidesCheck` in dependencies

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">Slides</h2>

            {loading && <p className="text-gray-500 text-center">Loading...</p>}
            {error && <p className="text-red-500 text-center">{error}</p>}

            {slides.length > 0 ? (
                <div className="bg-white p-4 shadow-md rounded-lg border text-center">
                    <img 
                        src={`http://127.0.0.1:8000${slides[currentIndex].slides}`} 
                        alt="Slide" 
                        className="w-full h-60 object-cover rounded"
                    />
                    <p className="text-gray-600 mt-2">Slide {currentIndex + 1} of {slides.length}</p>

                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={handlePrev} 
                            disabled={slides.length <= 1}
                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded disabled:opacity-50"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={handleNext} 
                            disabled={slides.length <= 1}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            ) : (
                !loading && <p className="text-gray-500 text-center">No slides available.</p>
            )}
        </div>
    );
};

export default UserSlides;
