import { useEffect, useState } from "react";

const UserFolders = ({ userId }) => {
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getuserallfolders/${userId}/`);
                if (!response.ok) {
                    throw new Error("Failed to fetch folders");
                }
                const data = await response.json();
                setFolders(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFolders();
    }, [userId]);

    return (
        <div className="max-w-3xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4 text-center">User Folders</h2>

            {loading && <p className="text-gray-500">Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {folders.map((folder) => (
                    <div key={folder.id} className="bg-white p-4 shadow-md rounded-lg border">
                        <h3 className="text-lg font-semibold text-blue-600">{folder.folderName}</h3>
                        <p className="text-gray-600">Folder ID: {folder.id}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserFolders;
