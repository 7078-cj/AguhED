import { useContext, useState } from "react";
import { Card, Text, TextInput, Button, Alert } from "@mantine/core";
import AuthContext from "../Context/AuthContext";

const CreateUserFolder = () => {
    let { user } = useContext(AuthContext);
    const [folderName, setFolderName] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch(`http://localhost:8000/api/createuserfolder/${user.user_id}/`, {
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
        <Card shadow="lg" radius="lg" padding="xl" withBorder>
      <Text size="lg" weight={600} mb="md">
        Create User Folder
      </Text>
      {message && (
        <Alert color={message.type === "success" ? "green" : "red"} mb="md">
          {message.text}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextInput
          placeholder="Enter folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          required
          mb="md"
        />
        <Button type="submit" fullWidth loading={loading} color="blue">
          {loading ? "Creating..." : "Create Folder"}
        </Button>
      </form>
    </Card>
    );
};

export default CreateUserFolder;
