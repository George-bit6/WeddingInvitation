import {
  Heading,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Icon,
  Link,
} from "@chakra-ui/react";

import { Link as ReactRouterLink } from "react-router-dom";
import { LuCalendar, LuMap, LuMapPin } from "react-icons/lu";

import Page from "./component/Page";
import "../styles/fonts.css";
import "../styles/video.css";
import backgroundImage from "../assets/DSC01279.jpg";
import bgPage2 from "../assets/DSC01319.jpg";
import bgPage3 from "../assets/DSC01224.jpg";
import bgPage4 from "../assets/DSC01396.jpg";
import bgPage5 from "../assets/DSC01445.jpg";
import bgPage6 from "../assets/DSC01429.jpg";
import envVideo from "../assets/openingEnvelope.mp4";
import bgMusic from "../assets/YoureMyEverything.mp3";
import supabase from "./supabase-client";
import { useParams } from "react-router-dom";
import { useState, useRef } from "react";
import CustomRadio from "./component/Radio";



export default function App() {
  const { id, fullName } = useParams();

  const [startClicked, setStartClicked] = useState(false);

  const audioRef = useRef(null);

  const iconStyle = {
    boxSize: { base: "16", md: "20", sl: "20", lg: "28" },
  };

  const handleStart = () => {
    setStartClicked(true);

    if (audioRef.current) {
      audioRef.current.load(); // 👈 call load() first when using <source> tags
      audioRef.current.play();
    }
  };

  const pageStyle = {
    height: "100vh",
    width: "100vw",

    color: "white",
    justifyContent: "center",
    alignItems: "center",
    scrollSnapAlign: "start",
    fontFamily: "ImperialScript"
  };

  const textStyle = {
    textAlign: "center",
    fontFamily: "ImperialScript",
    fontSize: { base: "1.7rem", md: "1.8rem", sl: "1.9rem", lg: "2rem" },
  };

  const headingStyle = {
    fontSize: { base: "3.2rem", md: "3.5rem", sl: "3.8rem", lg: "4rem" },
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "ImperialScript"
  };

  return (
    <Box
      gap={0}
      width={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      height={"100vh"}
      scrollSnapType={"y mandatory"}
      fontFamily={'ImperialScript'}
    >
     <Page bgImage={backgroundImage}>
        {/* Updated VStack with conditional opacity and transition */}
        <VStack 
          gap={"4em"} 
          opacity={startClicked ? 1 : 0} 
          transition="opacity 1.5s ease-in-out"
        >
          <Heading {...headingStyle}>Youssef</Heading>
          <Heading {...headingStyle}>&</Heading>
          <Heading {...headingStyle}>Joelle</Heading>
        </VStack>

        <Text 
          opacity={startClicked ? 1 : 0} 
          transition="opacity 1.5s ease-in-out" 
          transitionDelay="0.5s" // Optional: makes the "Are Getting Married" appear slightly after the names
          marginTop={"64px"} 
          {...textStyle}
        >
          Are Getting Married
        </Text>

        <audio
          ref={audioRef}
          src={bgMusic}
          loop
          style={{ display: "none" }}
        />
        
        {!startClicked && (
          <Button
            onClick={handleStart}
            aspectRatio="1"
            variant="outline"
            height="8rem"
            color="white"
            fontSize="3rem"
            borderRadius="100%"
            position={"absolute"}
            top={"50%"}
            left={"50%"}
            transform={"translate(-50%, -50%)"}
            zIndex={"3"}
            fontFamily={'ImperialScript'}
            _hover={{ bg: "whiteAlpha.200" }} // Nice touch for interaction
          >
            Start
          </Button>
        )}
      </Page>

      <Page bgImage={bgPage4}>
        <VStack
          height={"90vh"}
          padding={"24px"}
          justifyContent={"space-evenly"}
        >
          <Heading fontSize={"4rem"}
            fontWeight={"bold"}
            marginBottom={"2rem"}
            textAlign={"center"}
            fontFamily={'ImperialScript'}
            lineHeight={'4rem'}>
            Welcome Drink and Dinner
          </Heading>
          <VStack gap={"7"} marginBottom={"4rem"}>
            <Icon {...iconStyle} as={LuCalendar} />

            <Heading {...headingStyle}>June 13,2026</Heading>
            <Heading fontWeight={"lighter"} {...textStyle} fontSize={'3rem'} >
              8:00 pm
            </Heading>
          </VStack>

          <VStack gap={"7"}>
            <Icon {...iconStyle} as={LuMapPin} />

            <Heading fontSize={"3rem"} fontFamily={'ImperialScript'}>The Grandhouse</Heading>
            <Heading fontSize={"3rem"} fontFamily={'ImperialScript'}>Mansourieh</Heading>
            <Button
              variant={"outline"}
              color={"white"}
              size={"lg"}
              fontSize={"1rem"}
            >
              <Link
                color={"white"}
                fontFamily={'ImperialScript'}
                size={"lg"}
                fontSize={"2rem"}
                href="https://maps.app.goo.gl/78bLsTYfbie5Hrse9"
              >
                Locate Map
              </Link>
            </Button>
          </VStack>
        </VStack>
      </Page>
      <Page bgImage={bgPage5}>
        <VStack height={"80vh"} justifyContent={"space-between"}>
          <Heading fontFamily={'ImperialScript'} fontWeight={"lighter"} fontSize={"3.5rem"}>
            Gift Registry
          </Heading>
          <VStack margin={"8px"}>
            <Text fontWeight={"lighter"} {...textStyle}>
              Having you celebrate with us is the only git we truly need
            </Text>
            <Text fontWeight={"lighter"} {...textStyle}>
              For those who desire a wedding list is available at Whish Money
            </Text>
            <Text fontWeight={"lighter"} {...textStyle}>
              Acc Number 20750348-03
            </Text>
          </VStack>
        </VStack>
      </Page>

      <Page bgImage={bgPage6}>
        <VStack
          height={"90vh"}
          marginTop={"1rem"}
          justifyContent={"flex-start"}
        >
          <Heading fontFamily={'ImperialScript'} fontSize={"4rem"} textAlign={"center"}>
            Be Our Guest
          </Heading>
          <VStack marginTop={"2rem"}>
            <Text {...textStyle}>Please Confirm by May 15</Text>
            <Text {...textStyle}>We can't wait to celebrate with you!</Text>
          </VStack>
          <Heading fontFamily={'ImperialScript'} fontSize={"2.7rem"}>{fullName}</Heading>
         
          <CustomRadio id={id}></CustomRadio>
        </VStack>
      </Page>
    </Box>
  );
}
