import { useRef } from "react";
import { IconDownload, IconX } from "@tabler/icons-react";
import Upload from "../assets/folder.png";
import { alpha, Button, Group, Text, useMantineTheme } from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import classes from "../css/DropzoneButton.module.css";

function Dropdown() {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  return (
    <div className={classes.container}>
      <div className={classes.card}>
        <Dropzone
          openRef={openRef}
          onDrop={() => {}}
          className={classes.dropzone}
          radius="md"
          accept={[MIME_TYPES.pdf]}
          maxSize={20 * 1024 ** 2}
        >
          <div style={{ pointerEvents: "none" }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  size={50}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} color={theme.colors.red[6]} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <img src={Upload} size={30} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>Drop files here</Dropzone.Accept>
              <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
              <Dropzone.Idle> Browse file on your computer. </Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              We can accept only <i>.pdf</i> files that are less than 30mb in
              size.
            </Text>
          </div>
        </Dropzone>
        <Button
          className={classes.control}
          size="md"
          radius="xl"
          bg={alpha("#2F27CE", 1)}
          onClick={() => openRef.current?.()}
        >
          Choose a File
        </Button>
      </div>
    </div>
  );
}

export default Dropdown;
