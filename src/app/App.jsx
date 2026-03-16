import { Heading, VStack, Box, Marquee, Image, HStack } from "@chakra-ui/react";
import FullForm from "./component/FullForm";
import "../styles/fonts.css";
import "../styles/video.css"
import backgroundImage from "../assets/weddingimage.jpg";
import bgPage2 from "../assets/weddingimage2.jpg";
import bgPage3 from "../assets/weddingimage3.jpg";
import weddingRingsVid from "../assets/weddingRings.mp4";


let User = {
  fullName: "George Bou Faysal",
  phoneNumber: 0o1234567,
  accepted_invitation: false,
  number_of_guests: 2,
};
const pageStyle = {
  height: "100%",
  width: "100vw",
  position: "relative",
  color: "white",
  justifyContent: "center",
  alignItems: "center",
  scrollSnapAlign:'start',
};

export default function App() {
  return (
    <Box gap={0} width={'100%'} overflowX={'hidden'} overflowY={'auto'} height={'100vh'} scrollSnapType={'y mandatory'}>

      <VStack {...pageStyle}>

    <Box 
    position={'relative'} 
    display={'flex'} 
    justifyContent={'center'} 
    flexDirection={'column'} 
    textAlign={'center'}
    
    >
        <Heading fontSize={"5xl"}>Jason & Jasona</Heading>
        <Heading fontSize={"2xl"}>Wedding Invitation</Heading>
        <Heading 
        
        position={'absolute'} 
        fontSize={"9rem"}
        fontFamily={'Pacifico'}
        opacity={'0.4'}
        fontWeight={'lighter'}
        lineHeight={'short'}
        color={'white'}
        textAlign={'center'}
        left={'-30%'}

        >
          Wedding
          </Heading>
    </Box>
                
        <video src={weddingRingsVid} autoPlay  muted/>
      </VStack>



      <VStack {...pageStyle} >
        <Box
          position={"absolute"}
          height={"full"}
          width={"full"}
          bgImage={`url(${backgroundImage})`}
          bgSize={"cover"}
          bgPos={"center"}
          filter={"brightness(0.8)"}
          zIndex={"hide"}
        ></Box>

      </VStack>




      <VStack {...pageStyle}>
        <Box
          position={"absolute"}
          height={"full"}
          width={"full"}
          bgImage={`url(${bgPage3})`}
          bgSize={"cover"}
          bgPos={"center"}
          filter={"brightness(0.8)"}
          zIndex={"hide"}
        ></Box>
        <FullForm></FullForm>
      </VStack>
    </Box>
  );
}