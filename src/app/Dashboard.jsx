import "../styles/index.css";
import "../styles/fonts2.css";
import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import { HStack, VStack, Heading, SimpleGrid,GridItem, Table, IconButton, Button} from "@chakra-ui/react";
import { LuClipboardCopy, LuTrash } from "react-icons/lu";
import EditButton from "./component/EditButton";
import AddButton from "./component/AddButton";
import DeleteButton from "./component/DeleteButton";
import CopyButton from "./component/CopyButton";
export default function App() {

  const font2 = {
    fontFamily: 'inter'
  }


  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [errorData, setErrorData] = useState(false);
  const [pendingNumber, setPendingNumber] = useState(0);
  const [acceptedNumber, setAcceptedNumber] = useState(0);
  const [rejectedNumber, setRejectedNumber] = useState(0);

  const getInvitants = async () => {
    setLoading(true);
    setErrorData(false);
    try{

      const {data, error} = await supabase.rpc('get_invitants');
      if(error){
        setErrorData(true);

      }
      else{
        setTableData(data || []);
      }
    }
    catch(err){
      setErrorData(true);
    }
    finally{
      setLoading(false);
    }

  }



const handleAddFormSubmit = async (formData) => {
  // Use 'await' here so the button knows when to stop the loading spinner
  await addInvitant(
    formData.fullName, 
    formData.numberOfGuests, 
    formData.phoneNumber, 
    'Pending'
  );
};

const addInvitant = async (full_name, number_guests, phone_number) => {
  try {

    const cleanPhone = (phone_number && phone_number.toString().trim() !== "") 
      ? Number(phone_number.toString().replace(/\D/g, '')) 
      : null;
    // Clean the phone number: remove spaces/dashes and convert to Number
    // BigInt in PG can handle numbers up to 19 digits, so JS Number is fine for 8-digit phones
    const { error } = await supabase.rpc('addinvitant', {
      p_full_name: full_name,
      p_guest_number: parseInt(number_guests, 10),
      p_phone_number: cleanPhone // 👈 Now sending a numeric type
      
    });

    if (error) {
      console.error("Supabase Error Details:", error);
      throw error;
    }

    getInvitants(); // Refresh table
    
  } catch (err) {
    console.error("Catch Error:", err.message);
    throw err;
  }
};
  const handleEditFormSubmit = (formData) => {
    console.log("Edit data:", formData);
    // Add edit logic here when needed
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
    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('get_count', {
        p_status: status,
      });
      if (error) {
        setErrorData(true);
      } else {
        switch (status) {
          case 'Pending':
            setPendingNumber(data);
            break;
          case 'Accepted':
            setAcceptedNumber(data);
            break;
          case 'Rejected':
            setRejectedNumber(data);
            break;
          default:
            setErrorData(true);
        }
      }
    } catch (err) {
      setErrorData(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getInvitants();
  }, [])

  useEffect(() => {
    get_count('Pending');
    get_count('Accepted');
    get_count('Rejected');

  }, [tableData])



  return (<VStack gap={'48px'}>

    <Heading  textDecoration={'underline'} fontFamily={'Pacifico'} fontWeight={'lighter'} lineHeight={'moderate'} marginTop={'72px'} fontSize={'5xl'} textAlign={'center'}>Wedding Invitation Dashboard</Heading>

    <SimpleGrid columns={3} gap={"72px"} >
      <GridItem colSpan={3}>
        <VStack gap={'48px'}>

          <Heading {...font2}fontSize={'3xl'} textAlign={'center'}>Invitants</Heading>
          <Heading {...font2}fontSize={'5xl'}>{pendingNumber + acceptedNumber +rejectedNumber}</Heading>

        </VStack>

      </GridItem>
      <GridItem >
          <VStack>

          <Heading {...font2} fontSize={'xl'} textAlign={'center'}>Pending</Heading>
          <Heading>{pendingNumber}</Heading>

        </VStack>
      </GridItem>
      <GridItem>
          <VStack>

          <Heading {...font2} fontSize={'xl'} textAlign={'center'}>Accepted</Heading>
          <Heading >{acceptedNumber}</Heading>

        </VStack>
      </GridItem>
      <GridItem>
         <VStack>

          <Heading {...font2} fontSize={'xl'} textAlign={'center'}>Rejected</Heading>
          <Heading >{rejectedNumber}</Heading>

        </VStack>
      </GridItem>
    </SimpleGrid>

    <VStack>

    <Heading {...font2}>Invitants Table</Heading>
    <HStack>
      <Button {...font2} onClick={() => getInvitants()}>Refresh Table</Button>
      <AddButton onFormSubmit={handleAddFormSubmit} />
    </HStack>
    <Table.ScrollArea borderWidth={'1px'} maxW={'90vw'}>
    <Table.Root showColumnBorder size={"sm"} variant={"outline"}>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader {...font2}>Index</Table.ColumnHeader>
        <Table.ColumnHeader {...font2}>Full Name</Table.ColumnHeader>
        <Table.ColumnHeader {...font2}>Guest Number</Table.ColumnHeader>
        <Table.ColumnHeader {...font2}>Phone Number</Table.ColumnHeader>
        <Table.ColumnHeader {...font2}>Status</Table.ColumnHeader>
        <Table.ColumnHeader {...font2}></Table.ColumnHeader>
        <Table.ColumnHeader {...font2}></Table.ColumnHeader>
        <Table.ColumnHeader {...font2}></Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {tableData.map((node, i) => (

        <Table.Row key={node.id}>
        <Table.Cell {...font2}>{i + 1}</Table.Cell>
        <Table.Cell {...font2}>{node.full_name}</Table.Cell>
        <Table.Cell {...font2}>{node.guest_number}</Table.Cell>
        <Table.Cell {...font2}>{node.phone_number}</Table.Cell>
        <Table.Cell {...font2}>{node.status}</Table.Cell>
        <Table.Cell >
          <IconButton>
            <CopyButton id={node.id} fullname = {node.full_name}></CopyButton>
          </IconButton>
        </Table.Cell>
        <Table.Cell >
          <EditButton onFormSubmit={handleEditFormSubmit} />
        </Table.Cell>
        <Table.Cell>
          <DeleteButton onDelete={() => handleDelete(node.id)} />
        </Table.Cell>
      </Table.Row>

      ))


      }

    </Table.Body>


    </Table.Root>
</Table.ScrollArea>
    </VStack>




  </VStack>

  )
}