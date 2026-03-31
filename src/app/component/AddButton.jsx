import { CloseButton, Dialog, Portal, Field, Input, Button, Stack, Box } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddButton({ onFormSubmit }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      fullName: "",
      numberOfGuests: "",
      phoneNumber: "",
    },
  });

  const font2 = { fontFamily: 'Inter, sans-serif' };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. We MUST await the database call from the parent
      await onFormSubmit?.(data);
      
      // 2. Only reset and close if the call was successful
      reset();
      setOpen(false); 
    } catch (error) {
      console.error("Failed to add:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root 
      open={open} 
      onOpenChange={(e) => setOpen(e.open)} 
      placement="center" 
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button {...font2} variant="outline">Add Invitant</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bg="gray.900" border="1px solid" borderColor="gray.800">
            <Dialog.Header>
              <Dialog.Title {...font2} color="white">Add Invitant</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" color="white" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body pb="6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack gap="5">
                  <Field.Root>
                    <Field.Label {...font2} color="gray.400">Full Name</Field.Label>
                    <Input {...font2}
                      color="white"
                      placeholder="John Doe"
                      {...register("fullName", { required: true })}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label {...font2} color="gray.400">Number of Guests</Field.Label>
                    <Input {...font2}
                      color="white"
                      type="number"
                      {...register("numberOfGuests", { required: true })}
                    />
                  </Field.Root>

                  <Field.Root>
                    <Field.Label {...font2} color="gray.400">Phone Number (Optional)</Field.Label>
                    <Input {...font2}
                      color="white"
                      placeholder="70 123 456"
                      {...register("phoneNumber")}
                    />
                  </Field.Root>

                  <Button 
                    type="submit" 
                    loading={loading} 
                    bg="cyan.500" 
                    color="black"
                    {...font2}
                  >
                    Save Invitant
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