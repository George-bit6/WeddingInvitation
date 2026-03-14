import "../styles/index.css";
import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import { VStack, Heading, SimpleGrid,GridItem, Stat, Table, Button} from "@chakra-ui/react";


export default function App() {
    
  




  return (<VStack gap={'48px'}>

    <Heading>Wedding Invitation Dashboard</Heading>

    <SimpleGrid columns={3} gap={"48px"} >
      <GridItem colSpan={3} display={'flex'} justifyContent={"center"}>
        <VStack>
          <Stat.Root >
          <Stat.Label >Number of Invitants</Stat.Label>
          <Stat.ValueText >200</Stat.ValueText>
        </Stat.Root>
        </VStack>
        
      </GridItem>
      <GridItem >
        <Stat.Root>
          <Stat.Label>Declined Invitations</Stat.Label>
          <Stat.ValueText>31</Stat.ValueText>
        </Stat.Root>
      </GridItem>
      <GridItem>
        <Stat.Root>
          <Stat.Label>Accepted Invitations</Stat.Label>
          <Stat.ValueText>76</Stat.ValueText>
        </Stat.Root>
      </GridItem>
      <GridItem>
        <Stat.Root>
          <Stat.Label>Pending Invitations</Stat.Label>
          <Stat.ValueText>93</Stat.ValueText>
        </Stat.Root>
      </GridItem>
    </SimpleGrid>

    <VStack>

    <Heading>Invitants Table</Heading>

    <Table.Root width="90vw" size={"sm"} variant={"outline"}>
    <Table.Header>
      <Table.Row>
        <Table.ColumnHeader>Index</Table.ColumnHeader>
        <Table.ColumnHeader>Full Name</Table.ColumnHeader>
        <Table.ColumnHeader>Guest Number</Table.ColumnHeader>
        <Table.ColumnHeader>Phone Number</Table.ColumnHeader>
        <Table.ColumnHeader>Status</Table.ColumnHeader>
        <Table.ColumnHeader>Invitation Link</Table.ColumnHeader>
        <Table.ColumnHeader>Delete</Table.ColumnHeader>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      <Table.Row>
        <Table.Cell>1</Table.Cell>
        <Table.Cell>George Bou Faysal</Table.Cell>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>03785888</Table.Cell>
        <Table.Cell>Accepted</Table.Cell>
        <Table.Cell>
          <Button></Button>
        </Table.Cell>
        
      </Table.Row>
       <Table.Row>
        <Table.Cell>2</Table.Cell>
        <Table.Cell>George Bou Faysal</Table.Cell>
        <Table.Cell>4</Table.Cell>
        <Table.Cell>03785888</Table.Cell>
        <Table.Cell>Accepted</Table.Cell>
        
      </Table.Row>
    </Table.Body>


    </Table.Root>

    </VStack>

    


  </VStack>

  )

}