"use client";

import {
  Box,
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [show, setShow] = useState(false);
  const [variant, setVariant] = useState("login");
  const [credentials, setCredentials] = useState({});

  const [loading, setLoading] = useState({
    signInButton: false,
  });

  const toast = useToast();
  const router = useRouter();

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

  const postImage = (image) => {
    try {
      setLoading({ signInButton: true });
      if (image === undefined) {
        console.log("Undefined Image");
        return;
      }

      if (
        image.type === "image/jpeg" ||
        image.type === "image/png" ||
        image.type === "jpg"
      ) {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "Convo-chat-app");
        data.append("cloud_name", "ayush3902");
        fetch("https://api.cloudinary.com/v1_1/ayush3902/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setCredentials((prevCredentials) => ({
              ...prevCredentials,
              picture: data.url.toString(),
            }));
            setLoading({ signInButton: false });
          });
      } else {
        console.log("Please select an image");
      }
    } catch (err) {
      console.log(err);
      setLoading({ signInButton: false });
    }
  };

  const loginUser = async () => {
    setLoading({ signInButton: true });
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Email or password missing",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ signInButton: false });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { email, password } = credentials;
      const { data } = await axios.post(
        "http://localhost:8080/login",
        {
          email,
          password,
        },
        config
      );

      toast({
        title: "Login successful",
        description: "Welcome Back!",
        status: "success",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading({ signInButton: false });
      router.push("/chats");
    } catch (err) {
      console.log(err);
      toast({
        title: "Incorrect email or password",
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
      setLoading({ signInButton: false });
    }
  };

  const registerUser = async () => {
    setLoading({ signInButton: true });
    if (!credentials.name || !credentials.email || !credentials.password) {
      toast({
        title: "Please enter all fields.",
        status: "error",
        duration: 4000,
        isClosable: true,
        position: "bottom",
      });
      setLoading({ signInButton: false });
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { name, email, password, picture } = credentials;

      const { data } = await axios.post(
        "http://localhost:8080/register",
        { name, email, password, picture },
        config
      );
      toast({
        title: "Account created.",
        description: "Welcome to Convo.",
        status: "success",
        duration: 3000,
        position: "bottom",
        isClosable: true,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading({ signInButton: false });
      router.push("/chats");
    } catch (error) {
      console.log("Error", error);
      toast({
        title: "An Error occured.",
        description: "Check the browser console for more details.",
        status: "error",
        duration: 4000,
        position: "bottom",
        isClosable: true,
      });
    }
  };

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
                  onChange={(e) => postImage(e.target.files[0])}
                />
              </Box>
            ) : null}
            <Button
              _hover={{ backgroundColor: "blackAlpha.700" }}
              backgroundColor={"black"}
              textColor={"white"}
              width={["xs", "xs", "md", "md"]}
              isLoading={loading.signInButton}
              onClick={variant === "login" ? loginUser : registerUser}
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
