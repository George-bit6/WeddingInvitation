import {
  Heading,
  VStack,
  HStack,
  Button,
  Box,
  Text,
  Marquee,
  Image,
} from "@chakra-ui/react";

import { LuCalendar, LuMapPin } from "react-icons/lu";

import Page from "./component/Page";
import "../styles/fonts.css";
import "../styles/video.css";
import backgroundImage from "../assets/DSC01279.jpg";
import bgPage2 from "../assets/DSC01319.jpg";
import bgPage3 from "../assets/DSC01224.jpg";
import bgPage4 from "../assets/DSC01396.jpg";
import bgPage5 from "../assets/DSC01445.jpg";
import bgPage6 from "../assets/DSC01429.jpg";
import { useParams } from "react-router-dom";

let User = {
  fullName: "George Bou Faysal",
  phoneNumber: 0o1234567,
  accepted_invitation: false,
  number_of_guests: 2,
};

const secondFont = {
  fontFamily: "inter",
};

export default function App() {
  const { id, fullName } = useParams();

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
        <Heading
          className="imperial-script-regular"
          textWrap={"balance"}
          lineHeight={"7rem"}
          width={"18rem"}
          fontSize={"5rem"}
        >
          Youssef & Joelle
        </Heading>
        <Heading marginTop={"24px"} fontSize={"2rem"} fontWeight={"normal"}>
          Are Getting Married
        </Heading>
      </Page>

      <Page bgImage={bgPage2} gap={"7"}>
        <Heading
          fontSize={"4rem"}
          fontWeight={"bold"}
          marginBottom={"5rem"}
          textAlign={"center"}
        >
          Wedding Ceremony
        </Heading>
        <VStack gap={"7"} marginBottom={"4rem"}>
          <LuCalendar size={"81px"} />
          <Heading fontSize={"3rem"}>June 13,2026</Heading>
          <Heading fontWeight={"lighter"} fontSize={"3rem"}>
            6:30 pm
          </Heading>
        </VStack>

        <VStack gap={"7"}>
          <LuMapPin size={"81px"} />
          <Heading fontSize={"3rem"}>Ste Rita Church,</Heading>
          <Heading fontSize={"3rem"}>Mar Roukoz</Heading>
          <Button
            variant={"outline"}
            color={"white"}
            size={"2xl"}
            fontSize={"3rem"}
          >
            Locate Map
          </Button>
        </VStack>
      </Page>

      <Page bgImage={bgPage3}>
        <VStack height={"90vh"} justifyContent={"space-between"}>
          <VStack justifyContent={"flex-start"}>
            <VStack>
              <Heading
                fontSize={"2rem"}
                textAlign={"center"}
                fontWeight={"bold"}
                marginBottom={"1rem"}
              >
                With Joyous hearts
              </Heading>
              <Heading
                fontSize={"2rem"}
                textAlign={"center"}
                fontWeight={"bold"}
                marginBottom={"1rem"}
              >
                Maksour and Aoun Families invite you
              </Heading>
              <Heading
                fontSize={"2rem"}
                textAlign={"center"}
                fontWeight={"bold"}
                marginBottom={"5rem"}
              >
                to celebrate the Wedding of
              </Heading>
            </VStack>
            <Heading fontSize={"4rem"} textAlign={"center"} fontWeight={"bold"}>
              Youssef & Joelle
            </Heading>
          </VStack>
          <Heading
            fontSize={"2rem"}
            textAlign={"center"}
            fontWeight={"bold"}
            marginBottom={"4rem"}
          >
            on June 13, 2026
          </Heading>
        </VStack>
      </Page>
      <Page bgImage={bgPage4}>
        <Heading
          {...secondFont}
          textAlign={"center"}
          fontSize={"2rem"}
          fontWeight={"bold"}
          marginBottom={"5rem"}
        >
          Welcome Drink and Dinner
        </Heading>
        <VStack gap={"7"} marginBottom={"4rem"}>
          <LuCalendar size={"81px"} />
          <Heading {...secondFont} fontSize={"2rem"}>
            June 13,2026
          </Heading>
          <Heading {...secondFont} fontWeight={"lighter"} fontSize={"2rem"}>
            8:00 pm
          </Heading>
        </VStack>

        <VStack gap={"7"}>
          <LuMapPin size={"81px"} />
          <Heading {...secondFont} fontSize={"2rem"}>
            The Grandhouse
          </Heading>
          <Heading {...secondFont} fontSize={"2rem"}>
            Mansourieh
          </Heading>
          <Button
            {...secondFont}
            variant={"outline"}
            color={"white"}
            size={"2xl"}
            fontSize={"3rem"}
          >
            Locate Map
          </Button>
        </VStack>
      </Page>
      <Page bgImage={bgPage5}>
        <VStack height={"80vh"} justifyContent={"space-between"}>
          <Heading fontWeight={"lighter"} fontSize={"3.5rem"}>
            Gift Registry
          </Heading>
          <VStack margin={"8px"}>
            <Text fontWeight={"lighter"} fontSize={"2rem"} textAlign={"center"}>
              Having you celebrate with us is the only git we truly need
            </Text>
            <Text fontWeight={"lighter"} fontSize={"2rem"} textAlign={"center"}>
              For those who desire a wedding list is available at Whish Money
            </Text>
            <Text fontWeight={"lighter"} fontSize={"2rem"} textAlign={"center"}>
              Acc Number --------
            </Text>
          </VStack>
        </VStack>
      </Page>

      <Page bgImage={bgPage6}>                            
        <VStack height={'90vh'} marginTop={'1rem'} justifyContent={'flex-start'}>
          <Heading fontSize={'4rem'} textAlign={'center'}>Be Our Guest</Heading>
        <VStack marginTop={'2rem'}>
          <Text fontSize={'2.4rem'} textAlign={'center'}>Please Confirm by May 15</Text>
          <Text fontSize={'2.4rem'} textAlign={'center'}>we can't wait to celebrate with you!</Text>
        </VStack>
        </VStack>
        
      </Page>
    </Box>
  );
}
