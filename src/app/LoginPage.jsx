import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase-client";
import { Input, VStack, Heading, Button, Text, Container, Center, Spinner } from "@chakra-ui/react";


export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [claims, setClaims] = useState(null);

    // Check URL params on initial render
    const params = new URLSearchParams(window.location.search);
    const hasTokenHash = params.get("token_hash");

    const [verifying, setVerifying] = useState(!!hasTokenHash);
    const [authError, setAuthError] = useState(null);
    const [authSuccess, setAuthSuccess] = useState(false);



    useEffect(() => {
        // Check if we have token_hash in URL (magic link callback)
        const params = new URLSearchParams(window.location.search);
        const token_hash = params.get("token_hash");
        const type = params.get("type");

        if (token_hash) {
            // Verify the OTP token
            supabase.auth.verifyOtp({
                token_hash,
                type: type || "email",
            }).then(({ error }) => {
                if (error) {
                    setAuthError(error.message);
                } else {
                    setAuthSuccess(true);
                    // Clear URL params
                    window.history.replaceState({}, document.title, "/");
                }
                setVerifying(false);
            });
        }

        // Check for existing session using getClaims
        supabase.auth.getClaims().then(({ data: { claims } }) => {
            setClaims(claims);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            supabase.auth.getClaims().then(({ data: { claims } }) => {
                setClaims(claims);
            });
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: window.location.origin,
            }
        });
        if (error) {
            alert(error.error_description || error.message);
        } else {
            alert("Check your email for the login link!");
        }
        setLoading(false);
    };

    // Show verification state
    if (verifying) {
        return (
            <Center height={'100vh'}>
                <VStack gap="4">
                    <Heading>Authentication</Heading>
                    <Text>Confirming your magic link...</Text>
                    <Spinner />
                </VStack>
            </Center>
        );
    }

    // Show auth error
    if (authError) {
        return (
            <Center height={'100vh'}>
                <VStack gap="4">
                    <Heading>Authentication</Heading>
                    <Text>✗ Authentication failed</Text>
                    <Text color="red.500">{authError}</Text>
                    <Button 
                        onClick={() => {
                            setAuthError(null);
                            window.history.replaceState({}, document.title, "/");
                        }}
                    >
                        Return to login
                    </Button>
                </VStack>
            </Center>
        );
    }

    // Show auth success (briefly before claims load)
    if (authSuccess && !claims) {
        return (
            <Center height={'100vh'}>
                <VStack gap="4">
                    <Heading>Authentication</Heading>
                    <Text>✓ Authentication successful!</Text>
                    <Text>Loading your account...</Text>
                    <Spinner />
                </VStack>
            </Center>
        );
    }

    if (claims) {
        navigate("/dashboard", { replace: true });
        return (
            <Center height={'100vh'}>
                <Spinner />
            </Center>
        );
    }

    // Show login form
    return (
      <Center height={'80vh'}>
        <VStack gap="12">
            <Heading fontSize="3xl">Sign In</Heading>
            
            <form onSubmit={handleLogin}>
                <VStack gap="4">
                    <Input
                        width="400px"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        required={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  
                    <Button type="submit" isLoading={loading} loadingText="Sending...">
                        Send magic link
                    </Button>
                </VStack>
            </form>
        </VStack>
        </Center>
    );
}