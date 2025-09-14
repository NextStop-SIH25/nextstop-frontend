import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { toast } from "sonner";
import bus from "../assets/city bus-amico.svg";

const loginSchema = z.object({
  username: z.string().min(1, "Username or mobile number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginForm) => {
    // Simulate login
    toast.success("Login successful!");
    console.log("Login data:", data);
    // Navigate to dashboard or main app
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-brand-header mb-6">Login</h1>
        </div>

        {/* Bus Illustration */}
        <div className="flex justify-center mb-8">
          <img src={bus} alt="Bus" className="w-70 h-45" />
        </div>

        {/* Login Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Username or Mobile no."
                      {...field}
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Password"
                      {...field}
                      className="h-12 text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-brand-header hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-12 text-base font-medium"

            >
              Login
            </Button>
          </form>
        </Form>

        {/* Sign up link */}
        <div className="text-center">
          <p className="text-sm small-text">
            Don't have an Account?{" "}
            <Link to="/signup" className="text-brand-header hover:underline font-medium">
              Signup
            </Link>
          </p>
        </div>

        {/* Google Sign In */}
        <div className="text-center">
          <Button variant="outline" className="w-full h-12 flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
              <g>
                <path fill="#4285F4" d="M43.6 20.5H42V20.5H24V27.5H35.1C33.6 31.4 29.2 34 24 34c-5.5 0-10-4.5-10-10s4.5-10 10-10c2.4 0 4.6 0.8 6.3 2.2l5.3-5.3C32.2 8.1 28.3 6.5 24 6.5 13.8 6.5 5.5 14.8 5.5 25S13.8 43.5 24 43.5c9.5 0 17.5-7.7 17.5-17.5 0-1.2-0.1-2.1-0.3-3z" />
                <path fill="#34A853" d="M6.3 14.7l5.8 4.3C13.7 16.1 18.5 13 24 13c2.4 0 4.6 0.8 6.3 2.2l5.3-5.3C32.2 8.1 28.3 6.5 24 6.5c-6.6 0-12.2 3.8-15.1 9.2z" />
                <path fill="#FBBC05" d="M24 43.5c4.3 0 8.2-1.4 11.2-3.8l-5.2-4.3c-1.6 1.1-3.7 1.8-6 1.8-5.2 0-9.6-3.5-11.2-8.2l-5.7 4.4C7.8 39.7 15.3 43.5 24 43.5z" />
                <path fill="#EA4335" d="M43.6 20.5H42V20.5H24V27.5H35.1C34.5 29.1 33.5 30.5 32.1 31.7l5.2 4.3C39.7 33.2 42 29.1 42 25c0-1.2-0.1-2.1-0.3-3z" />
              </g>
            </svg>
            <span className="text-base">Continue with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;