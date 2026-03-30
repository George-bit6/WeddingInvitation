import "../styles/index.css";
import "../styles/fonts2.css";
import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import { HStack, VStack, Heading, SimpleGrid, GridItem, Table, IconButton, Button, Text } from "@chakra-ui/react";
import EditButton from "./component/EditButton";
import AddButton from "./component/AddButton";
import DeleteButton from "./component/DeleteButton";
import CopyButton from "./component/CopyButton";

export default function Dashboard() {
  // Reusable font style for Inter
  const inter = {
    fontFamily: "'Inter', sans-serif"
  };

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [errorData, setErrorData] = useState(false);
  const [pendingNumber, setPendingNumber] = useState(0);
  const [acceptedNumber, setAcceptedNumber] = useState(0);
  const [rejectedNumber, setRejectedNumber] = useState(0);

  const getInvitants = async () => {
    setLoading(true);
    setErrorData(false);
    try {
      const { data, error } = await supabase.rpc('get_invitants');
      if (error) {
        setErrorData(true);
      } else {
        setTableData(data || []);
      }
    } catch (err) {
      setErrorData(true);
    } finally {
      setLoading(false);
    }
  };

  const addInvitant = async (full_name, number_guests, phone_number, status) => {
    setErrorData(false);
    try {
      const { error } = await supabase.rpc('add_invitant', {
        p_full_name: full_name,
        p_guest_number: number_guests,
        p_phone_number: phone_number,
        p_status: status,
      });
      if (error) {
        setErrorData(true);
      } else {
        getInvitants();
      }
    } catch (err) {
      setErrorData(true);
    }
  };

  const handleAddFormSubmit = (formData) => {
    addInvitant(formData.fullName, formData.numberOfGuests, formData.phoneNumber, 'Pending');
  };

  const handleEditFormSubmit = (formData) => {
    console.log("Edit data:", formData);
  };

  const handleDelete = async (id) => {
    setErrorData(false);
    try {
      const { error } = await supabase.rpc('delete_invitant', {
        p_id: id,
      });
      if (error) {
        setErrorData(true);
      } else {
        getInvitants();
      }
    } catch (err) {
      setErrorData(true);
    }
  };

  const get_count = async (status) => {
    try {
      const { data, error } = await supabase.rpc('get_count', {
        p_status: status,
      });
      if (!error) {
        switch (status) {
          case 'Pending': setPendingNumber(data); break;
          case 'Accepted': setAcceptedNumber(data); break;
          case 'Rejected': setRejectedNumber(data); break;
        }
      }
    } catch (err) {
      setErrorData(true);
    }
  };

  useEffect(() => {
    getInvitants();
  }, []);

  useEffect(() => {
    get_count('Pending');
    get_count('Accepted');
    get_count('Rejected');
  }, [tableData]);

  return (
    <VStack gap={'48px'}>
      {/* Keeping Pacifico for the main header only */}
      <Heading textDecoration={'underline'} fontFamily={'Pacifico'} fontWeight={'lighter'} lineHeight={'moderate'} marginTop={'72px'} fontSize={'5xl'} textAlign={'center'}>
        Wedding Invitation Dashboard
      </Heading>

      <SimpleGrid columns={3} gap={"72px"}>
        <GridItem colSpan={3}>
          <VStack gap={'48px'}>
            <Heading {...inter} fontSize={'3xl'} textAlign={'center'}>Invitants</Heading>
            <Heading {...inter} fontSize={'5xl'}>{pendingNumber + acceptedNumber + rejectedNumber}</Heading>
          </VStack>
        </GridItem>
        
        <GridItem>
          <VStack>
            <Heading {...inter} fontSize={'xl'} textAlign={'center'}>Pending</Heading>
            <Heading {...inter}>{pendingNumber}</Heading>
          </VStack>
        </GridItem>
        
        <GridItem>
          <VStack>
            <Heading {...inter} fontSize={'xl'} textAlign={'center'}>Accepted</Heading>
            <Heading {...inter}>{acceptedNumber}</Heading>
          </VStack>
        </GridItem>
        
        <GridItem>
          <VStack>
            <Heading {...inter} fontSize={'xl'} textAlign={'center'}>Rejected</Heading>
            <Heading {...inter}>{rejectedNumber}</Heading>
          </VStack>
        </GridItem>
      </SimpleGrid>

      <VStack>
        <Heading {...inter}>Invitants Table</Heading>
        <HStack>
          <Button {...inter} onClick={() => getInvitants()}>Refresh Table</Button>
          <AddButton onFormSubmit={handleAddFormSubmit} />
        </HStack>

        <Table.ScrollArea borderWidth={'1px'} maxW={'90vw'}>
          <Table.Root showColumnBorder size={"sm"} variant={"outline"}>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader {...inter}>Index</Table.ColumnHeader>
                <Table.ColumnHeader {...inter}>Full Name</Table.ColumnHeader>
                <Table.ColumnHeader {...inter}>Max Guests</Table.ColumnHeader>
                <Table.ColumnHeader {...inter} color="cyan.400">Guests Coming</Table.ColumnHeader>
                <Table.ColumnHeader {...inter}>Phone Number</Table.ColumnHeader>
                <Table.ColumnHeader {...inter}>Status</Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
                <Table.ColumnHeader></Table.ColumnHeader>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {tableData.map((node, i) => (
                <Table.Row key={node.id}>
                  <Table.Cell {...inter}>{i + 1}</Table.Cell>
                  <Table.Cell {...inter}>{node.full_name}</Table.Cell>
                  <Table.Cell {...inter}>{node.guest_number}</Table.Cell>
                  <Table.Cell {...inter} fontWeight="bold" color="cyan.300">
                    {node.guests_coming ?? 0}
                  </Table.Cell>
                  <Table.Cell {...inter}>{node.phone_number}</Table.Cell>
                  <Table.Cell {...inter}>{node.status}</Table.Cell>
                  <Table.Cell>
                    <CopyButton id={node.id} fullname={node.full_name}></CopyButton>
                  </Table.Cell>
                  <Table.Cell>
                    <EditButton onFormSubmit={handleEditFormSubmit} />
                  </Table.Cell>
                  <Table.Cell>
                    <DeleteButton onDelete={() => handleDelete(node.id)} />
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Table.ScrollArea>
      </VStack>
    </VStack>
  );
}