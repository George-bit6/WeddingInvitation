import { Clipboard, IconButton } from "@chakra-ui/react"


export default function CopyButton(props){
  return (
    <Clipboard.Root value={`http://localhost:5173/${props.id}/${props.fullname}`}>
      <Clipboard.Trigger asChild>
        <IconButton variant="surface" size="xs">
          <Clipboard.Indicator />
        </IconButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}
