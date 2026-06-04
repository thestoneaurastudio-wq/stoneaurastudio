import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${window.location.origin}/login`,
            },
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            setSuccess(true);
            setLoading(false);
            // Auto-redirect to login after 2 seconds
            setTimeout(() => {
                navigate("/login");
            }, 2000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary/20 to-background p-6">
            <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl p-8">
                <div className="text-center mb-8">
                    <h1 className="font-serif text-3xl font-bold text-primary mb-2">StoneAura</h1>
                    <p className="text-sm text-muted-foreground tracking-widest uppercase">Create Admin Account</p>
                </div>

                {success ? (
                    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
                        <p className="font-semibold">Account created successfully!</p>
                        <p className="mt-1">Redirecting to login...</p>
                    </div>
                ) : (
                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium mb-2 block">Email</label>
                            <Input
                                type="email"
                                placeholder="admin@stoneaura.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-medium mb-2 block">Password</label>
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full"
                            />
                            <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
                                {error}
                            </div>
                        )}

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                "Create Admin Account"
                            )}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <a href="/login" className="text-primary hover:underline">
                                Login here
                            </a>
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
