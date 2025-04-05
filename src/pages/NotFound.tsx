
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-md animate-fade-in">
          <div className="mb-6 relative">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 bg-blue-100 rounded-full animate-pulse-soft"></div>
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 w-full h-full text-blue-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-3 text-gray-900">404</h1>
          <p className="text-xl text-muted-foreground mb-6">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Button asChild>
            <a href="/">Back to Home</a>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
