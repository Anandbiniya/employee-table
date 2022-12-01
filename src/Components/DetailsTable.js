import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
  Heading,
  Button,
  useDisclosure,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  ModalHeader,
} from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent } from "@chakra-ui/react";
import Form from "./Form";

export const DetailsTable = () => {
  let data = JSON.parse(localStorage.getItem("key")) || [];
  //To delete employee from the table
  const handleDelete = (id) => {
    console.log(data.splice(id, 1));
    window.localStorage.setItem("key", JSON.stringify(data));
    window.location.reload();
  };

  return (
    <Box m={10}>
      <Heading as="h4" fontSize="1.5rem" m={4}>
        Employee Table
      </Heading>

      {data?.length > 0 ? (
        //Table start
        <TableContainer>
          <Table variant="striped" colorScheme="orange">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Age</Th>
                <Th>Department</Th>
                <Th>Blood Group</Th>
                <Th>Contact</Th>
                <Th>Address</Th>
                <Th>Delete</Th>
                <Th>Edit</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data.map((d, index) => {
                console.log(index);
                return (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{d.name}</Td>
                    <Td>{d.Age}</Td>
                    <Td>{d.Deepartment}</Td>
                    <Td>{d.Blood}</Td>
                    <Td>{d.Contact}</Td>
                    <Td>{d.address}</Td>

                    <Td>
                      <Button
                        colorScheme="read"
                        variant="outline"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </Button>
                    </Td>

                    <Td colorscheme="blue" variant="outline">
                      <EditButton data={data} inx={index} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        //when No data is avilable
        <h2>No data to show</h2>
      )}
      <Box></Box>
    </Box>
  );
};
//To Edit data
const EditButton = ({ data, inx }) => {
  const [checkNew, setCheckNew] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleMulti = () => {
    onOpen();
    setCheckNew(true);
  };
  return (
    <>
      <Button onClick={handleMulti} bgColor={"transparent"}>
        Edit
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <EditForm
            onClose={onClose}
            data={data}
            inx={inx}
            setCheckNew={setCheckNew}
          />
        </ModalContent>
      </Modal>
    </>
  );
};

export function EditForm({ data, setCheckNew, inx, onClose }) {
  const [record, setRecord] = useState(
    JSON.parse(localStorage.getItem("key")) || []
  );
  const handleEdit = () => {
    let newData = { ...data.id };
    setRecord([...record, newData]);
    setCheckNew(false);
  };

  localStorage.setItem("key", JSON.stringify(record));

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"}>
        <Heading textAlign={"center"} fontWeight="normal">
          Edit Employee
        </Heading>
        <Form data={data} close={onClose} inx={inx} handleEdit={handleEdit} />
      </Stack>
    </Flex>
  );
}
