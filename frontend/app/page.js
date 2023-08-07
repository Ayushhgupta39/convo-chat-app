"use client";

import { Box, Button, Input, Text } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Home() {
  return (
    <main>
      <Box
        className="auth-page"
        display={"grid"}
        gridTemplateColumns={"60% 40%"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100vh"}
          backgroundColor={"gray.100"}
          gap={"10px"}
        >
          <Box
            fontWeight={"700"}
            display={"flex"}
            justifyContent={"space-between"}
            margin={"10"}
          >
            <Text>Convo</Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            textAlign={"center"}
            alignItems={"center"}
          >
            <Box marginY={"5"}>
              <Text fontWeight={"700"} fontSize={"2xl"}>
                Welcome to Convo
              </Text>
              <Text fontWeight={"600"} fontSize={"sm"}>
                Enter your account details.
              </Text>
            </Box>
            <Box gap={"10px"} display={"flex"} flexDirection={"column"}>
              <Button
                width={"md"}
                leftIcon={<FaGithub />}
                backgroundColor={"white"}
              >
                Login with GitHub
              </Button>
              <Button
                width={"md"}
                leftIcon={<FcGoogle />}
                backgroundColor={"white"}
              >
                Login with Google
              </Button>
            </Box>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"center"}
            gap={"20px"}
            alignItems={"center"}
          >
            <hr className="divider-line"></hr>
            <Text fontSize={"xs"} fontWeight={"bold"}>
              OR
            </Text>
            <hr className="divider-line"></hr>
          </Box>

          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={"10px"}
          >
            <Input
              translateX={"50px"}
              backgroundColor={"white"}
              placeholder="Enter your email"
              width={"md"}
              variant={"unstyled"}
              padding={"2"}
            />
            <Input
              type="password"
              backgroundColor={"white"}
              placeholder="Password"
              width={"md"}
              variant={"unstyled"}
              padding={"2"}
            />
            <Button
              _hover={{ backgroundColor: "blackAlpha.700" }}
              backgroundColor={"black"}
              textColor={"white"}
              width={"md"}
            >
              Sign in
            </Button>
            <Box display={"flex"} gap={"2px"}>
              <Text>New to Convo?</Text>
              <Text fontWeight={"bold"} as={"u"}>Create an account</Text>
            </Box>
          </Box>
        </Box>
        <Box
          minH={"100vh"}
          backgroundImage={"url(/assets/images/login-image.jpg)"}
          backgroundSize={"cover"}
          boxShadow={"dark-lg"}
          backgroundRepeat={"no-repeat"}
        ></Box>
      </Box>
    </main>
  );
}
