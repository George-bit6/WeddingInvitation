import "../styles/index.css";
import { useState, useEffect } from "react";
import supabase from "./supabase-client";
import { Input, VStack, Heading, Button, Text, Center, Field, Box } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [authError, setAuthError] = useState(null);
    const navigate = useNavigate();

    // Reusable font constant to keep code clean
    const inter = "'Inter', sans-serif";

    useEffect(() => {
        const checkUser = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                navigate('/Dashboard');
            }
        };
        checkUser();
    }, [navigate]);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setAuthError(null);

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setAuthError("Invalid email or password. Please try again.");
            setLoading(false);
        } else if (data.user) {
            navigate('/Dashboard');
        }
    };

    return (
        <Center height="100vh" bg="black">
            <VStack 
                gap="8" 
                p={10} 
                borderRadius="3xl" 
                border="1px solid" 
                borderColor="gray.800" 
                bg="gray.950" 
                width="420px"
                boxShadow="0 20px 50px rgba(0,0,0,0.5)"
            >
                <VStack gap="2" textAlign="center">
                    <Heading 
                        fontSize="3xl" 
                        fontWeight="800" 
                        color="white" 
                        letterSpacing="-0.03em"
                        fontFamily={inter}
                    >
                        Welcome Back
                    </Heading>
                    <Text 
                        color="gray.500" 
                        fontSize="sm" 
                        fontWeight="500"
                        fontFamily={inter}
                    >
                        Enter your credentials to access the dashboard
                    </Text>
                </VStack>

                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <VStack gap="6">
                        {/* Email Field */}
                        <Field.Root>
                            <Field.Label 
                                color="gray.400" 
                                fontSize="xs" 
                                fontWeight="700" 
                                letterSpacing="0.05em"
                                fontFamily={inter}
                                mb="2"
                            >
                                EMAIL ADDRESS
                            </Field.Label>
                            <Input 
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                required
                                color="white"
                                bg="transparent"
                                h="52px"
                                borderRadius="xl"
                                borderColor="gray.800"
                                fontFamily={inter} // Added Inter here
                                _hover={{ borderColor: "gray.700" }}
                                _focus={{ borderColor: "cyan.500", boxShadow: "0 0 0 1px cyan.500" }}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Field.Root>

                        {/* Password Field */}
                        <Field.Root>
                            <Field.Label 
                                color="gray.400" 
                                fontSize="xs" 
                                fontWeight="700" 
                                letterSpacing="0.05em"
                                fontFamily={inter}
                                mb="2"
                            >
                                PASSWORD
                            </Field.Label>
                            <Input 
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                required
                                color="white"
                                bg="transparent"
                                h="52px"
                                borderRadius="xl"
                                borderColor="gray.800"
                                fontFamily={inter} // Added Inter here
                                _hover={{ borderColor: "gray.700" }}
                                _focus={{ borderColor: "cyan.500", boxShadow: "0 0 0 1px cyan.500" }}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Field.Root>

                        {authError && (
                            <Text 
                                color="red.400" 
                                fontSize="xs" 
                                fontWeight="600" 
                                textAlign="center"
                                fontFamily={inter} // Added Inter here
                            >
                                {authError}
                            </Text>
                        )}

                        <Button 
                            type="submit" 
                            width="100%"
                            h="52px"
                            mt="2"
                            isLoading={loading} 
                            bg="cyan.500"
                            color="black"
                            borderRadius="xl"
                            fontWeight="800"
                            fontSize="sm"
                            textTransform="uppercase"
                            letterSpacing="0.05em"
                            fontFamily={inter} // Added Inter here
                            _hover={{ bg: "cyan.400", transform: "translateY(-1px)" }}
                            _active={{ transform: "translateY(0)" }}
                            transition="all 0.2s"
                        >
                            Sign In
                        </Button>
                    </VStack>
                </form>
            </VStack>
        </Center>
    );
}