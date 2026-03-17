import { Flex, Text, VStack, Button, Heading } from "@chakra-ui/react";

export default function ErrorPage() {
  return (
    <Flex
      height="100vh"
      width="100vw"
      align="center"
      justify="center"
      bg="gray.950"
      direction="column"
      gap={6}
      px={4}
    >
      <Text fontSize="8rem" fontWeight="700" color="red.500" lineHeight="1">
        404
      </Text>

      <VStack gap={2} textAlign="center">
        <Heading size="xl" color="white">
          Page not found
        </Heading>
        <Text color="gray.400" maxW="sm">
          The page you're looking for doesn't exist or has been moved.
        </Text>
      </VStack>

      <Button
        colorScheme="red"
        variant="outline"
        onClick={() => window.history.back()}
      >
        Go back
      </Button>
    </Flex>
  );
}