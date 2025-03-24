import { useState } from "react";

const CreateUserFolder = ({ userId }) => {
    const [folderName, setFolderName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`http://localhost:8000/api/createuserfolder/${userId}/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ folderName }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: "success", text: "Folder created successfully!" });
                setFolderName("");
            } else {
                setMessage({ type: "error", text: data.error || "Something went wrong!" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Network error. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create User Folder</h2>
            {message && (
                <p className={`p-2 text-sm rounded ${message.type === "success" ? "bg-green-200 text-green-700" : "bg-red-200 text-red-700"}`}>
                    {message.text}
                </p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={folderName}
                    onChange={(e) => setFolderName(e.target.value)}
                    placeholder="Enter folder name"
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                >
                    {loading ? "Creating..." : "Create Folder"}
                </button>
            </form>
        </div>
    );
};

export default CreateUserFolder;
