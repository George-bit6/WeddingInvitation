import {
  Heading,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Icon,
  Link
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
import Radio from "./component/Radio";



const secondFont = {
  fontFamily: "inter",
};

export default function App() {
  const { id, fullName } = useParams();

  const [startClicked, setStartClicked] = useState(false);

  const videoRef = useRef(null);
  const audioRef = useRef(null);

const [selectedStatus, setSelectedStatus] = useState(null);

const updateStatus = async (newStatus) => {
  const { data, error } = await supabase
    .from('Invitants')
    .update({ status: newStatus })
    .eq('id', id)
    .select();

  if (error) {
    console.error('Failed to update status:', error.message);
    throw error;
  }

  return data;
};

  
const iconStyle = {

  boxSize: {base:"8",md: "16",sl:"20",lg:"28"}
}
          

  const handleStart = () => {
    setStartClicked(true);
    if (videoRef.current) {
      videoRef.current.playbackRate = 2;
      videoRef.current.play();
    }

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
  };

  const textStyle = {
    textAlign: "center",
    fontSize: {base:"1.7rem",md: "1.8rem",sl:"1.9rem",lg:"2rem"},
  };

  const headingStyle = {
    fontSize: {base:"3.2rem",md: "3.5rem",sl:"3.8rem",lg:"4rem"},
    textAlign: "center",
    fontWeight: "bold",
  };

  const [videoEnded, setVideoEnded] = useState(false);


  return (
    <Box
      gap={0}
      width={"100%"}
      overflowX={"hidden"}
      overflowY={"auto"}
      height={"100vh"}
      scrollSnapType={"y mandatory"}
    >
      

      <Page bgImage={backgroundImage}>
        <VStack gap={"4em"}>
          <Box
          ref={videoRef}
          position="absolute"
          height="full"
          width="full"
          as="video"
          controls={false}
          src={`${envVideo}`}
          objectFit="cover"
          muted
          top={'0'}
          filter={`brightness(0.9)`}
          zIndex="2"
          opacity={videoEnded ? 0 : 1}
  transition="opacity 0.5s ease-in-out"
  onEnded={() => setVideoEnded(true)}
        />
          <Heading {...headingStyle}>
            Youssef
          </Heading>
          <Heading {...headingStyle}>
            &
          </Heading>
          <Heading {...headingStyle}>
            Joelle
          </Heading>
        </VStack>

        <Text marginTop={"64px"} {...textStyle}>
          Are Getting Married
        </Text>


        
        

        {/* Persistent background music - lives outside pages so it never unmounts */}
        <audio
          ref={audioRef}
          src={bgMusic} // 👈 place the .mpeg file in /public folder
          loop
          style={{ display: "none" }}
        />
        {!startClicked && (
          <Button
            onClick={handleStart} // 👈 use handleStart instead of inline setter
            aspectRatio="1"
            variant="outline"
            height="8rem"
            color="white"
            fontSize="3rem"
            borderRadius="100%"
            position={'absolute'}
            top = {'50%'}
            left = {'50%'}
            transform={'translate(-50%, -50%)'}
            zIndex={'3'}
          >
            Start
          </Button>
        )}
      
      </Page>


      <Page bgImage={bgPage2}>
        <VStack height={"90vh"} padding={'24px'} justifyContent={'space-evenly'}>
          <Heading
          fontSize={"4rem"}
          fontWeight={"bold"}
          marginBottom={"2rem"}
          textAlign={"center"}
        >
          Wedding Ceremony
        </Heading>
        <VStack gap={"7"} marginBottom={"4rem"}>
          <Icon {...iconStyle} as={LuCalendar} />
           
          
          <Heading fontSize={"3rem"}>June 13,2026</Heading>
          <Heading fontWeight={"lighter"} fontSize={"3rem"}>
            6:30 pm
          </Heading>
        </VStack>

        <VStack gap={"7"}>
           <Icon {...iconStyle} as={LuMapPin} />
          
          <Heading fontSize={"3rem"}>Ste Rita Church,</Heading>
          <Heading fontSize={"3rem"}>Mar Roukoz</Heading>
          <Button
            variant={"outline"}
            color={"white"}
            size={"lg"}
            fontSize={"2rem"}
          >
            <Link color={"white"}
            size={"lg"}
            fontSize={"2rem"} href="https://maps.app.goo.gl/Kbr9RGPftxn3z3aZ7">
            Locate Map
            </Link>
            
          </Button>
        </VStack>
        </VStack>
        
      </Page>

      <Page bgImage={bgPage3}>
        <VStack height={"90vh"} justifyContent={"space-between"}>
          <VStack justifyContent={"flex-start"}>
            <VStack>
              <Text
               {...textStyle}
                fontWeight={"bold"}
                marginBottom={"1rem"}
              >
                With Joyous hearts
              </Text>
              <Text
                {...textStyle}
                fontWeight={"bold"}
                marginBottom={"1rem"}
              >
                Maksour and Aoun Families invite you
              </Text>
              <Text
                {...textStyle}
                fontWeight={"bold"}
                marginBottom={"5rem"}
              >
                to celebrate the Wedding of
              </Text>
            </VStack>
            <Heading fontSize={"4rem"} textAlign={"center"} fontWeight={"bold"}>
              Youssef & Joelle
            </Heading>
          </VStack>
          <Text
           {...textStyle}
            fontWeight={"bold"}
            marginBottom={"4rem"}
          >
            on June 13, 2026
          </Text>
        </VStack>
      </Page>
      <Page bgImage={bgPage4}>
        <VStack height={"90vh"} padding={'24px'} justifyContent={'space-evenly'}>

          <Text
          {...secondFont}
          {...textStyle}
          fontWeight={"bold"}
          marginBottom={"1rem"}
        >
          Welcome Drink and Dinner
        </Text>
        <VStack gap={"7"} marginBottom={"4rem"}>
           <Icon {...iconStyle} as={LuCalendar} />
         
          <Text {...secondFont}{...textStyle}>
            June 13,2026
          </Text>
          <Text {...secondFont} fontWeight={"lighter"} {...textStyle}>
            8:00 pm
          </Text>
        </VStack>

        <VStack gap={"7"}>
          <Icon {...iconStyle} as={LuMapPin} />
          
          <Text {...secondFont} {...textStyle}>
            The Grandhouse
          </Text>
          <Text {...secondFont} {...textStyle}>
            Mansourieh
          </Text>
          <Button
            {...secondFont}
            variant={"outline"}
            color={"white"}
            size={"lg"}
            fontSize={"1rem"}
          >
            <Link color={"white"}
            size={"lg"}
            fontSize={"2rem"} href="https://maps.app.goo.gl/78bLsTYfbie5Hrse9">
            Locate Map
            </Link>
            
          </Button>
        </VStack>
        
        </VStack>
      </Page>
      <Page bgImage={bgPage5}>
        <VStack height={"80vh"} justifyContent={"space-between"}>
          <Heading fontWeight={"lighter"} fontSize={"3.5rem"}>
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
              Acc Number --------
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
          <Heading fontSize={"4rem"} textAlign={"center"}>
            Be Our Guest
          </Heading>
          <VStack marginTop={"2rem"}>
            <Text {...textStyle}>
              Please Confirm by May 15
            </Text>
            <Text {...textStyle}>
              We can't wait to celebrate with you!
            </Text>
          </VStack>
          <Heading fontSize={'2.7rem'}>{fullName}</Heading>
          <Radio></Radio>
        </VStack>
      </Page>
    </Box>
  );
}
