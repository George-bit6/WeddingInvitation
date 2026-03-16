import { IconButton, CloseButton, Dialog, Portal, Field, Input, Button, Stack, Text } from "@chakra-ui/react";
import { LuClipboardPen } from "react-icons/lu";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function EditButton({ onFormSubmit }) {
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      fullName: "",
      numberOfGuests: "",
      phoneNumber: "",
    },
  });

  const [submittedData, setSubmittedData] = useState(null);

  const onSubmit = (data) => {
    setSubmittedData(data);
    onFormSubmit?.(data);
    console.log("Form Data:", data);
  };

  return (
    <Dialog.Root placement="center" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <IconButton>
          <LuClipboardPen />
        </IconButton>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Invitant</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="8" maxW="sm" css={{ "--field-label-width": "96px" }}>
                  <Field.Root orientation="horizontal">
                    <Field.Label>Full Name</Field.Label>
                    <Input
                      placeholder="John Doe"
                      flex="1"
                      {...register("fullName")}
                    />
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Field.Label>Number of Guests</Field.Label>
                    <Input
                      placeholder="1"
                      flex="1"
                      type="number"
                      {...register("numberOfGuests")}
                    />
                  </Field.Root>

                  <Field.Root orientation="horizontal">
                    <Field.Label>Phone Number</Field.Label>
                    <Input
                      placeholder="xx/xxx/xxx"
                      flex="1"
                      {...register("phoneNumber")}
                    />
                  </Field.Root>

                  <Button width type="submit">
                    Submit
                  </Button>

            
                </Stack>
              </form>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
