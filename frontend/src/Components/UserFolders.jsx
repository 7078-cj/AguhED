import { useContext, useEffect, useState } from "react";

import AuthContext from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar2 from "../Components/NavBar2";
import "@mantine/core/styles.css";
import styles from "../css/Home/Home.module.css";
import loaderStyles from "../css/loader.module.css";

import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
  Card,
  Text,
  Group,
  SimpleGrid,
  Button,
  Loader
} from "@mantine/core";
import {
  FaFilePdf,
  FaFileWord,
  FaFilePowerpoint,
  FaFileAlt,
  FaEye,
} from "react-icons/fa";

const UserFolders = () => {
    const nav = useNavigate()
    let { user } = useContext(AuthContext);
    const [folders, setFolders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFolders = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/getuserallfolders/${user.user_id}/`);
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
    }, []);

    return (
        <div className="max-w-3xl mx-auto p-6">
      <Text align="center" size="xl" weight={700} mb="md">
        User Folders
      </Text>

      {loading && (
        <Group position="center" my="md">
          <Loader size="lg" color="blue" />
          <Text size="sm" color="gray">
            Loading...
          </Text>
        </Group>
      )}
      {error && (
        <Text align="center" color="red" size="sm">
          {error}
        </Text>
      )}

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
        {folders.map((folder) => (
          <Card
          key={folder.id}
          shadow="lg"
          padding="xl"
          radius="lg"
          className={styles.card}
        >
          <Card.Section p="xl" className={styles.cardHeader}>
            <Text
                weight={600}
                size="lg"
                mt="md"
                mb="xs"
                className={styles.fileName}
            >
                {folder.folderName}
            </Text>
          </Card.Section>

          

         

          <Button
            variant="outline"
            fullWidth
            mt="md"
            radius="md"
            leftIcon={<FaEye size={16} />}
            onClick={() =>nav(`/present/${folder.id}`)}
            className={styles.openButton}
          >
            Open Presentation
          </Button>
        </Card>
        ))}
      </SimpleGrid>
    </div>
    );
};

export default UserFolders;
