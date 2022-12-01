import React, { useState } from "react";
import { DetailsTable } from "./DetailsTable";
import Form from "./Form";
// Imported chakra Ui Features
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Button,
  AlertDialogCloseButton,
} from "@chakra-ui/react";
function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();
  const [Data, setData] = useState({
    name: "",
    Age: "",
    Deepartment: "",
    Blood: "",
    Contact: "",
    address: "",
  });

  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem("key")) || []
  );

  localStorage.setItem("key", JSON.stringify(record));

  return (
    <div>
      <>
        <div>
          {/* To add new employee open form modal */}
          <Button onClick={onOpen}>Add New Employee</Button>
          <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
          >
            <AlertDialogOverlay />

            <AlertDialogContent>
              <AlertDialogHeader textAlign={"center"}>
                Add new Employee
              </AlertDialogHeader>
              <AlertDialogCloseButton />
              <AlertDialogBody>
                <Form close={onClose} />
              </AlertDialogBody>
            </AlertDialogContent>
          </AlertDialog>

          <div>
            <DetailsTable />
          </div>
        </div>
      </>
    </div>
  );
}

export default Home;
