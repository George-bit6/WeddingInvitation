import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Field,
  Fieldset,
  HStack,
  NumberInput,
  RadioGroup,
  Text,
  VStack,
  Spinner,
  Heading
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import supabase from "../supabase-client";

const statusOptions = [
  { value: "Accepted", label: "Accept" },
  { value: "Rejected", label: "Reject" },
];

export default function RsvpForm({ id }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true); // Initial fetch state
  const [maxGuests, setMaxGuests] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      status: "",
      guestCount: "1",
    },
  });

  const currentStatus = watch("status");

  // --- Fetch the guest limit on mount ---
  useEffect(() => {
    const fetchGuestLimit = async () => {
      try {
        const { data, error } = await supabase
          .from("Invitants")
          .select("guest_number")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setMaxGuests(data.guest_number || 1);
        }
      } catch (err) {
        console.error("Error fetching limit:", err.message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchGuestLimit();
  }, [id]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setErrorMsg(null);

    try {
      // 1. Update status
      const statusRequest = supabase
        .from("Invitants")
        .update({ status: formData.status })
        .eq("id", id);

      // 2. Upsert guest count (only if accepted)
      let guestRequest = null;
      if (formData.status === "Accepted") {
        guestRequest = supabase
          .from("InvitantInput")
          .upsert({ 
            id: id, 
            nb_guests_chosen: parseInt(formData.guestCount) 
          });
      }

      const results = await Promise.all([statusRequest, guestRequest].filter(Boolean));
      const errorsFound = results.filter(res => res.error);
      if (errorsFound.length > 0) throw errorsFound[0].error;

      setIsSuccess(true);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner color="white" />
      </Box>
    );
  }

  if (isSuccess) {
    return (
      <Box p={10} textAlign="center">
        <Text color="white" fontWeight="bold" fontFamily={'ImperialScript'} fontSize="xl">Confirmed!</Text>
        <Button fontFamily={'ImperialScript'}  mt={6} variant="ghost" color="white" size="sm" onClick={() => setIsSuccess(false)}>
          Change Response
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="400px" mx="auto" mt={8} p={8} borderRadius="3xl" >
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={8} align="stretch">
          
          <Fieldset.Root invalid={!!errors.status}>
            <Fieldset.Legend fontFamily={'ImperialScript'}fontSize="1.3rem" textAlign="center" color="white" mb={4}>
              Please Select
            </Fieldset.Legend>

            <Controller
              name="status"
              control={control}
              rules={{ required: "Selection required" }}
              render={({ field }) => (
                <RadioGroup.Root
                  name={field.name}
                  value={field.value}
                  onValueChange={({ value }) => field.onChange(value)}
                >
                  <HStack gap="8" justify="center">
                    {statusOptions.map((item) => (
                      <RadioGroup.Item key={item.value} value={item.value} cursor="pointer">
                        <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                        <RadioGroup.ItemIndicator borderColor="gray.600" />
                        <RadioGroup.ItemText color="white">{item.label}</RadioGroup.ItemText>
                      </RadioGroup.Item>
                    ))}
                  </HStack>
                </RadioGroup.Root>
              )}
            />
          </Fieldset.Root>

          {/* Clean Input with Dynamic Max Limit */}
          {currentStatus === "Accepted" && (
            <Field.Root>
              <Heading fontFamily={'ImperialScript'}>Number of Guests</Heading>
              <Field.Label fontFamily={'ImperialScript'} color="gray.500" fontSize="xs" textTransform="uppercase" letterSpacing="widest">
                Number of Guests (Max {maxGuests})
              </Field.Label>
              <Controller
                name="guestCount"
                control={control}
                render={({ field }) => (
                  <NumberInput.Root
                    value={field.value}
                    onValueChange={(details) => field.onChange(details.value)}
                    min={1}
                    max={maxGuests} // Set to the dynamic value from Invitants table
                  >
                    <NumberInput.Input
                    fontFamily={'ImperialScript'}
                      color="white"
                      bg="transparent"
                      fontSize="4xl"
                      fontWeight="light"
                      h="70px"
                      px="0"
                      border="none"
                      borderBottom="1px solid"
                      borderColor="gray.800"
                      _focus={{ borderColor: "cyan.400", borderBottomWidth: "2px" }}
                    />
                  </NumberInput.Root>
                )}
              />
            </Field.Root>
          )}

          {errorMsg && <Text color="red.400" fontSize="xs" textAlign="center">{errorMsg}</Text>}

          <Button
            type="submit"
            loading={isLoading}
            fontFamily={'ImperialScript'}
            color="white"
            borderRadius="full"
            fontWeight="bold"
            size="lg"
            variant={'outline'}
            _hover={{ bg: "cyan.400" }}
          >
            Confirm
          </Button>
        </VStack>
      </form>
    </Box>
  );
}