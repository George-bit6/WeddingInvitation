

import { Button, Fieldset, HStack, RadioGroup } from "@chakra-ui/react"
import { Controller, useForm } from "react-hook-form"

const items = [
  { value: "Accepted", label: "Accept" },
  { value: "Rejected", label: "Rejected" },
]

export default function Radio() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      value: "",
    },
  })

  const onSubmit = handleSubmit((data) => console.log(data))

  return (
    <form onSubmit={onSubmit}>
      <Fieldset.Root invalid={!!errors.value}>
        <Fieldset.Legend textAlign={'center'} color={'white'}>Please Select </Fieldset.Legend>
        <Controller
          name="value"
          control={control}
          rules={{ required: "Value is required" }}
          render={({ field }) => (
            <RadioGroup.Root
              name={field.name}
              value={field.value}
              onValueChange={({ value }) => {
                field.onChange(value)
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

        <Button size="sm" type="submit" alignSelf="flex-start">
          Submit
        </Button>
      </Fieldset.Root>
    </form>
  )
}