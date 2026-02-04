import { Heading, VStack, Box, Marquee, Image, HStack } from "@chakra-ui/react";
import FullForm from "./component/FullForm";
import "../styles/fonts.css";
import backgroundImage from "../assets/weddingimage.jpg";
import bgPage2 from "../assets/weddingimage2.jpg";
import bgPage3 from "../assets/weddingimage3.jpg";

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

const imagesColumn1 = [
  "https://picsum.photos/seed/img1/280/200",
  "https://picsum.photos/seed/img2/280/200",
  "https://picsum.photos/seed/img3/280/200",
  "https://picsum.photos/seed/img4/280/200",
];

const imagesColumn2 = [
  "https://picsum.photos/seed/img5/280/200",
  "https://picsum.photos/seed/img6/280/200",
  "https://picsum.photos/seed/img7/280/200",
  "https://picsum.photos/seed/img8/280/200",
];

const imagesColumn3 = [
  "https://picsum.photos/seed/img9/280/200",
  "https://picsum.photos/seed/img10/280/200",
  "https://picsum.photos/seed/img11/280/200",
  "https://picsum.photos/seed/img12/280/200",
];

const MarqueeItems = (props) => {
  return (
    <>
      {props.images.map((src, i) => (
        <Marquee.Item key={i} py="2">
          <Image
            src={src}
            alt={`Gallery image ${i + 1}`}
            width="full"
            height="200px"
            objectFit="cover"
            rounded={'xl'}
            shadow="md"
          />
        </Marquee.Item>
      ))}
    </>
  )
}

export default function App() {
  return (
    <Box gap={0} width={'100%'} overflowY={'auto'} height={'100vh'} scrollSnapType={'y mandatory'}>

      <VStack {...pageStyle}>
        
        <Heading fontSize={"5xl"}>Jason & Jasona</Heading>
        <Heading fontSize={"2xl"}>Wedding Invitation</Heading>

        <Box 
        bgImage={`url(${bgPage2})`}
        bgSize={"cover"}
        bgPos={"center"}
        height="full"
        overflow="hidden" 
        perspective="1000px" 
        position={'absolute'} 
        zIndex={"hide"} 
        filter={"brightness(0.6)"}>
          <HStack
            
            height="700px"
            transform="rotateX(20deg)"
            transformOrigin="center top"
          >
            <Marquee.Root side="top" flex="1" autoFill>
             
              <Marquee.Viewport>
                <Marquee.Content>
                  <MarqueeItems images={imagesColumn1} />
                </Marquee.Content>
              </Marquee.Viewport>
            </Marquee.Root>

            <Marquee.Root side="bottom" flex="1" autoFill>
              <Marquee.Viewport>
                <Marquee.Content>
                  <MarqueeItems images={imagesColumn2} />
                </Marquee.Content>
              </Marquee.Viewport>
            </Marquee.Root>

            <Marquee.Root side="top" flex="1" autoFill>
              <Marquee.Viewport>
                <Marquee.Content>
                  <MarqueeItems images={imagesColumn3} />
                </Marquee.Content>
              </Marquee.Viewport>
    
            </Marquee.Root>
          </HStack>
        </Box>
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
