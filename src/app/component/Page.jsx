import { VStack, Heading, Box } from "@chakra-ui/react"

const pageStyle = {
  height: "100vh",
  width: "100vw",
  position: "relative",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  scrollSnapAlign: "start",
};


export default function Page(props){


   return <VStack  {...pageStyle}>
      <Box
          position={"absolute"}
          height={"full"}
          width={"full"}
          bgImage={`url(${props.bgImage})`}
          
          bgSize={"cover"}
          bgPos={"center"}
          filter={`brightness(${0.7})`}
          zIndex={"hide"}
        >
        <Box
          position={"absolute"}
          height={"full"}
          width={"full"}
          
          backgroundColor={`rgba(255, 255, 255, ${0.65})`}
          bgSize={"cover"}
          bgPos={"center"}
          filter={`brightness(${0.7})`}
          zIndex={"hide"}
        ></Box>

        </Box>
        <main>{props.children}</main>
      </VStack>
}
