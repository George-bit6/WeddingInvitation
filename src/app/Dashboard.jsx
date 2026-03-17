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

 

  const addInvitant = async (full_name, number_guests, phone_number, status) => {

    setErrorData(false);
    try{

      const {data, error} = await supabase.rpc('add_invitant', {

        p_full_name: full_name,
        p_guest_number: number_guests,
        p_phone_number: phone_number,
        p_status: status,
        
      });
      if(error){
        setErrorData(true);
        
      }
      else{
        getInvitants();
      }
    }
    catch(err){
      setErrorData(true);
    }
    

  }

  const handleAddFormSubmit = (formData) => {
    addInvitant(formData.fullName, formData.numberOfGuests, formData.phoneNumber, 'Pending');
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

    <Heading textDecoration={'underline'} fontFamily={'Pacifico'} fontWeight={'lighter'} lineHeight={'moderate'} marginTop={'72px'} fontSize={'5xl'} textAlign={'center'}>Wedding Invitation Dashboard</Heading>

    <SimpleGrid columns={3} gap={"72px"} >
      <GridItem colSpan={3}>
        <VStack gap={'48px'}>
          
          <Heading fontSize={'3xl'} textAlign={'center'}>Invitants</Heading>
          <Heading fontSize={'5xl'}>{pendingNumber + acceptedNumber +rejectedNumber}</Heading>
        
        </VStack>
        
      </GridItem>
      <GridItem >
          <VStack>
          
          <Heading fontSize={'xl'} textAlign={'center'}>Pending</Heading>
          <Heading>{pendingNumber}</Heading>
        
        </VStack>
      </GridItem>
      <GridItem>
          <VStack>
          
          <Heading fontSize={'xl'} textAlign={'center'}>Accepted</Heading>
          <Heading >{acceptedNumber}</Heading>
        
        </VStack>
      </GridItem>
      <GridItem>
         <VStack>
          
          <Heading fontSize={'xl'} textAlign={'center'}>Rejected</Heading>
          <Heading >{rejectedNumber}</Heading>
        
        </VStack>
      </GridItem>
    </SimpleGrid>

    <VStack>

    <Heading>Invitants Table</Heading>
    <HStack>
      <Button onClick={() => getInvitants()}>Refresh Table</Button>
      <AddButton onFormSubmit={handleAddFormSubmit} />
    </HStack>
    <Table.ScrollArea borderWidth={'1px'} maxW={'90vw'}>
    <Table.Root showColumnBorder size={"sm"} variant={"outline"}>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Index</Table.ColumnHeader>
        <Table.ColumnHeader>Full Name</Table.ColumnHeader>
        <Table.ColumnHeader>Guest Number</Table.ColumnHeader>
        <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
        <Table.ColumnHeader>Status</Table.ColumnHeader>
        <Table.ColumnHeader></Table.ColumnHeader>
        <Table.ColumnHeader></Table.ColumnHeader>
        <Table.ColumnHeader></Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {tableData.map((node, i) => (

        <Table.Row key={node.id}>
        <Table.Cell>{i + 1}</Table.Cell>
        <Table.Cell>{node.full_name}</Table.Cell>
        <Table.Cell>{node.guest_number}</Table.Cell>
        <Table.Cell>{node.phone_number}</Table.Cell>
        <Table.Cell>{node.status}</Table.Cell>
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