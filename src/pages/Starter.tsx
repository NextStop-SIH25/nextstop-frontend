import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import logo from "../assets/LOGO 2.svg";

const Starter = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-8">
      <div className="w-full max-w-sm space-y-8">
        {/* Logo placeholder */}
<div className="flex justify-center">
  <div className="w-24 h-24 bg-muted rounded-lg flex items-center justify-center">
    <img src={logo} alt="NextStop Logo" className="w-50 h-50 object-contain" />
  </div>
</div>

        
        {/* Welcome text */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold text-brand-header">
            Welcome to the NextStop
          </h1>
        </div>
        
        {/* Get Started button */}
        <Button 
          onClick={() => navigate('/signup')}
          className="w-full h-12 text-base font-medium"
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
};

export default Starter;