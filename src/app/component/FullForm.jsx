import {
  Heading,
  VStack,
  HStack,
  Box,
  Field,
  Input,
  NativeSelect,
  Fieldset,
  NumberInput,
  IconButton,
  Button
} from "@chakra-ui/react";
import { LuMinus, LuPlus } from "react-icons/lu";

const FormStyle = {
  width: "280px",
};

export default function FullForm() {
    
    return <Fieldset.Root
        display={"flex"}
        flexDirection={"column"}
        width={"full"}
        alignItems={"center"}
      >
        <VStack>
          <Fieldset.Legend color={"white"} fontSize={"4xl"} fontWeight={"bold"}>
            Details
          </Fieldset.Legend>
          <Fieldset.HelperText>
            Please fill the form to accept the Invitation
          </Fieldset.HelperText>
        </VStack>

        <Fieldset.Content
          display={"flex"}
          flexDirection={"column"}
          width={"full"}
          alignItems={"center"}
        >
          <Field.Root required {...FormStyle}>
            <Field.Label fontSize={"xl"}>
              Full Name
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="George Bou Faysal" />
          </Field.Root>

          <Field.Root required {...FormStyle}>
            <Field.Label fontSize={"xl"}>
              Phone Number
              <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="01/234/567" />
          </Field.Root>

          <NumberInput.Root display={'flex'} {...FormStyle} flexDirection={'column'} alignContent={'center'} defaultValue="3" unstyled spinOnPress={false}>
            
            <HStack gap="2">
              <Heading fontWeight={'light'}>Number of Guests:</Heading>
              <NumberInput.DecrementTrigger asChild>
                <IconButton variant="outline" size="sm">
                  <LuMinus />
                </IconButton>
              </NumberInput.DecrementTrigger>
              <NumberInput.ValueText
                textAlign="center"
                fontSize="lg"
                minW="3ch"
              />
              <NumberInput.IncrementTrigger asChild>
                <IconButton variant="outline" size="sm">
                  <LuPlus />
                </IconButton>
              </NumberInput.IncrementTrigger>
            </HStack>
          </NumberInput.Root>

          <Field.Root required {...FormStyle}>
            <Field.Label fontSize={"xl"}>
              Invitation:
              <Field.RequiredIndicator />
            </Field.Label>
            <NativeSelect.Root>
              <NativeSelect.Field>
                <option value="inv-accepted">Accepted</option>
                <option value="inv-rejected">Rejected</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" >
          Submit
        </Button>

      </Fieldset.Root>
}