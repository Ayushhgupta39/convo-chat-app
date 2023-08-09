"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

export default function Home() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("login");

  const [credentials, setCredentials] = useState({});

  const handleShow = () => {
    setShow(!show);
  };

  const handleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  console.log(credentials);
  return (
    <main>
      <Box
        className="auth-page"
        display={["flex", "flex", "flex", "grid"]}
        justifyContent={"center"}
        gridTemplateColumns={"60% 40%"}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          height={"100vh"}
          backgroundColor={"gray.100"}
          gap={"10px"}
          width={[null, "full", null, null]}
        >
          {variant === "login" ? (
            <Box
              fontWeight={"700"}
              display={"flex"}
              justifyContent={"space-between"}
              margin={"5"}
            >
              <Text>Convo</Text>
            </Box>
          ) : null}
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
                {variant === "login"
                  ? "Enter your account details."
                  : "Create a new account."}
              </Text>
            </Box>
            <Box
              gap={"10px"}
              display={"flex"}
              flexDirection={"column"}
              justifyContent={["center", "center", null, null]}
              alignItems={["center", "center", null, null]}
            >
              {variant === "login" ? (
                <Button
                  width={["xs", "xs", "md", "md"]}
                  colorScheme={"facebook"}
                  onClick={() => {
                    setCredentials({
                      email: "guestUser@email.com",
                      password: "999999",
                    });
                  }}
                >
                  Get Guest User Credentials
                </Button>
              ) : null}
              <Button
                width={["xs", "xs", "md", "md"]}
                leftIcon={<FaGithub />}
                backgroundColor={"white"}
              >
                Login with GitHub
              </Button>
              <Button
                width={["xs", "xs", "md", "md"]}
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
            {variant === "register" ? (
              <Input
                backgroundColor={"white"}
                placeholder="Full Name"
                width={["xs", "xs", "md", "md"]}
                variant={"unstyled"}
                padding={"2"}
                name="name"
                id="name"
                isRequired
                value={credentials.name || ""}
                onChange={(e) => handleChange(e)}
              />
            ) : null}
            <Input
              backgroundColor={"white"}
              placeholder="Enter your email"
              width={["xs", "xs", "md", "md"]}
              variant={"unstyled"}
              padding={"2"}
              name="email"
              id="email"
              isRequired
              value={credentials.email || ""}
              onChange={(e) => handleChange(e)}
            />
            <InputGroup width={["xs", "xs", "md", "md"]}>
              <Input
                type={show ? "text" : "password"}
                backgroundColor={"white"}
                placeholder="Password"
                width={["xs", "xs", "md", "md"]}
                variant={"unstyled"}
                padding={"2"}
                isRequired
                name="password"
                id="password"
                value={credentials.password || ""}
                onChange={(e) => handleChange(e)}
              />
              <InputRightElement
                onClick={handleShow}
                _hover={{ cursor: "pointer" }}
              >
                {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </InputRightElement>
            </InputGroup>
            {variant === "register" ? (
              <Box display={"flex"} flexDirection={"column"}>
                <label style={{ padding: "0px 8px" }} htmlFor="picture">
                  Upload your picture
                </label>
                <Input
                  backgroundColor={"white"}
                  type="file"
                  accept="image/*"
                  width={["xs", "xs", "md", "md"]}
                  variant={"unstyled"}
                  padding={"2"}
                  name="picture"
                  id="picture"
                  onChange={(e) => handleChange(e)}
                />
              </Box>
            ) : null}
            <Button
              _hover={{ backgroundColor: "blackAlpha.700" }}
              backgroundColor={"black"}
              textColor={"white"}
              width={["xs", "xs", "md", "md"]}
            >
              {variant === "login" ? "Login" : "Register"}
            </Button>
            {variant === "login" ? (
              <Box display={"flex"} gap={"2px"}>
                <Text>New to Convo?</Text>
                <Text
                  _hover={{ cursor: "pointer" }}
                  onClick={handleVariant}
                  fontWeight={"bold"}
                  as={"u"}
                >
                  Create an account
                </Text>
              </Box>
            ) : (
              <Box display={"flex"} gap={"2px"}>
                <Text>Already have an account?</Text>
                <Text
                  _hover={{ cursor: "pointer" }}
                  onClick={handleVariant}
                  fontWeight={"bold"}
                  as={"u"}
                >
                  Login
                </Text>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          minH={"100vh"}
          backgroundImage={"url(/assets/images/login-image.jpg)"}
          backgroundSize={"cover"}
          boxShadow={"dark-lg"}
          backgroundRepeat={"no-repeat"}
          display={["none", "none", "flex"]}
        ></Box>
      </Box>
    </main>
  );
}
