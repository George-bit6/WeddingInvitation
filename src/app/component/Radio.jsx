import { useState } from "react";
import supabase from "../supabase-client";
import { Button, Fieldset, HStack, RadioGroup } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

const items = [
  { value: "Accepted", label: "Accept" },
  { value: "Rejected", label: "Reject" },
];

export default function Radio(props) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: "",
    },
  });

  const [selectedStatus, setSelectedStatus] = useState(null);

  const updateStatus = async (newStatus) => {
    const { data, error } = await supabase
      .from("Invitants")
      .update({ status: newStatus })
      .eq("id", props.id)
      .select();

    if (error) {
      console.error("Failed to update status:", error.message);
      throw error;
    }

    return data;
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateStatus(data.value);
      setSelectedStatus(data.value);
      console.log("Status updated to:", data.value);
    } catch (err) {
      console.error("Error updating status:", err);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        invalid={!!errors.value}
      >
        <Fieldset.Legend
          fontSize={"1.3rem"}
          textAlign={"center"}
          color={"white"}
        >
          Please Select{" "}
        </Fieldset.Legend>
        <Controller
          name="value"
          control={control}
          rules={{ required: "Value is required" }}
          render={({ field }) => (
            <RadioGroup.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value);
              }}
            >
              <HStack gap="6">
                {items.map((item) => (
                  <RadioGroup.Item key={item.value} value={item.value}>
                    <RadioGroup.ItemHiddenInput onBlur={field.onBlur} />
                    <RadioGroup.ItemIndicator />
                    <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
                  </RadioGroup.Item>
                ))}
              </HStack>
            </RadioGroup.Root>
          )}
        />

        {errors.value && (
          <Fieldset.ErrorText>{errors.value?.message}</Fieldset.ErrorText>
        )}

        <Button onSubmit={() => onSubmit} fontSize={"1rem"} alignSelf={"center"} size="sm" type="submit">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  );
}
