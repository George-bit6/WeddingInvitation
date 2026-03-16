import "../styles/index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "./supabase-client";
import { Input, VStack, Heading, Button, Text, Center } from "@chakra-ui/react";


export default function LoginPage() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [claims, setClaims] = useState(null);
    const [authError, setAuthError] = useState(null);

    useEffect(() => {
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
        setAuthError(null);

        try {
            // Query the auth table to find user by username
            const { data: user, error: queryError } = await supabase
                .from('auth')
                .select('*')
                .eq('username', username)
                .single();

            if (queryError || !user) {
                setAuthError("User not found");
                setLoading(false);
                return;
            }

            // Verify password (assuming password is stored in the database)
            // Note: In production, passwords should be hashed and verified securely
            if (user.password !== password) {
                setAuthError("Invalid password");
                setLoading(false);
                return;
            }

            // Create a session manually by signing in with the user's email if available
            if (user.email) {
                const { error: signInError } = await supabase.auth.signInWithPassword({
                    email: user.email,
                    password: password,
                });

                if (signInError) {
                    setAuthError("Authentication failed");
                } else {
                    // Claims will be set by the onAuthStateChange listener
                    supabase.auth.getClaims().then(({ data: { claims } }) => {
                        setClaims(claims);
                    });
                }
            } else {
                setAuthError("User email not found in database");
            }
        } catch (error) {
            setAuthError(error.message || "Login failed");
        }
        setLoading(false);
    };

    // If user is logged in, redirect to dashboard
    if (claims) {
        navigate("/dashboard", { replace: true });
        return null;
    }

    // Show login form
    return (
      <Center height={'80vh'}>
        <VStack gap="12">
            <Heading fontSize="3xl">Sign In</Heading>
            
            {authError && (
                <Text color="red.500" fontSize="sm">{authError}</Text>
            )}
            
            <form onSubmit={handleLogin}>
                <VStack gap="4">
                    <Input
                        width="400px"
                        type="text"
                        placeholder="Username"
                        value={username}
                        required={true}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    
                    <Input
                        width="400px"
                        type="password"
                        placeholder="Password"
                        value={password}
                        required={true}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  
                    <Button type="submit" isLoading={loading} loadingText="Signing in...">
                        Sign In
                    </Button>
                </VStack>
            </form>
        </VStack>
        </Center>
    );
}