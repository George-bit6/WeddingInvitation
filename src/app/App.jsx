import { Heading, VStack, HStack,Button ,Box, Marquee, Image, } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import FullForm from "./component/FullForm";
import "../styles/fonts.css";
import "../styles/video.css";
import backgroundImage from "../assets/weddingimage.jpg";
import bgPage2 from "../assets/weddingimage2.jpg";
import bgPage3 from "../assets/weddingimage3.jpg";
import weddingRingsVid from "../assets/upscaled-video.mp4";
import weddingRingsVidFallback from "../assets/weddingRings.mp4";
import stRitaIcon from "../assets/rita-icon-white.png";

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
  scrollSnapAlign: "start",
};

const locationStyle = {
  width: "300px",
  aspectRatio: "4/3",
  borderRadius: "4xl",
  boxShadow: "2px 2px 8px rgba(0,0,0,0.2)",
  border: "3px",
  borderStyle: "solid",
  borderColor: "white",
  marginTop: "64px",
};

export default function App() {
  return (
    <Box
      gap={0}
      width={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      height={"100vh"}
      scrollSnapType={"y mandatory"}
    >
      <VStack {...pageStyle}>
        <Box
          position={"relative"}
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          textAlign={"center"}
        >
          <Heading fontSize={"5xl"}>Youssef & Joelle</Heading>
          <Heading marginTop={'24px'} fontSize={"2xl"}>Wedding Invitation</Heading>
          <Heading
            position={"absolute"}
            fontSize={"9rem"}
            fontFamily={"Pacifico"}
            opacity={"0.3"}
            fontWeight={"lighter"}
            lineHeight={"shorter"}
            color={"white"}
            textAlign={"center"}
            left={"-30%"}
          >
            Wedding
            Invitation
          </Heading>
        </Box>

        <video autoPlay loop muted>
          
          <source src={weddingRingsVidFallback} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </VStack>

      <VStack {...pageStyle} justifyContent={"flex-start"}>
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

        <Box
          as={"iframe"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.6012829633237!2d35.586864276632745!3d33.84839172846525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f3d136f6bb369%3A0xceeb9900385080d!2sSt.%20Rita%20Church!5e0!3m2!1sen!2slb!4v1773630400095!5m2!1sen!2slb"
          {...locationStyle}
        ></Box>
        <Heading
          fontSize={"1.5rem"}
          fontWeight={"light"}
          fontFamily={"Pacifico"}
        >
          St. Rita Church Monteverde
        </Heading>
        <Heading
          fontFamily={"Pacifico"}
          fontWeight={"lighter"}
          fontSize={"1.4rem"}
        >
          5:00pm - 6:00pm
        </Heading>
        <Box
          height={"240px"}
          marginTop={"72px"}
          aspectRatio={1}
          bgSize={"cover"}
          bgPos={"center"}
          bgImage={`url(${stRitaIcon})`}
        ></Box>
      </VStack>

      <VStack {...pageStyle} justifyContent={"flex-start"}>
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

        <Box
          as={"iframe"}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3312.971918499113!2d35.56608351233555!3d33.86461457311651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151f3d51b90016f9%3A0xc8fe6eee28668b04!2sThe%20Grandhouse%20Venue!5e0!3m2!1sen!2slb!4v1773630921841!5m2!1sen!2slb"
          {...locationStyle}
        ></Box>
        <Heading
          fontSize={"1.5rem"}
          fontWeight={"light"}
          fontFamily={"Pacifico"}
        >
          Grandhouse Venue Mansourieh
        </Heading>
        <Heading
          fontFamily={"Pacifico"}
          fontWeight={"lighter"}
          fontSize={"1.4rem"}
        >
          8:00pm - 12:00pm
        </Heading>
      </VStack>

       <VStack {...pageStyle} justifyContent={"center"}>
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

        <Heading 
        fontFamily={"Pacifico"}
        fontWeight={'lighter'}
        fontSize={'4xl'}
        textAlign={'center'}
        margin={'24px'}
        >Answer the Invitation Request</Heading>

        <HStack>
          <Button variant={'surface'} colorPalette={'red'}>Decline Invitation</Button>
        <Button>Accept Invitation</Button>
        </HStack>
        
       
        
      </VStack>
    </Box>
  );
}
