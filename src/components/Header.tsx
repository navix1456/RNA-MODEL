
import React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Github } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-30 w-full">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-cyan-400 rounded-full opacity-90 animate-pulse-soft"></div>
            <svg
              viewBox="0 0 24 24"
              className="absolute inset-0 w-full h-full text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 3v18M9 6l3-3 3 3M9 18l3 3 3-3" />
              <path d="M18 7.5V12a6 6 0 0 1-6 6 6 6 0 0 1-6-6V4.5" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              RNA <span className="text-blue-500">Visualizer</span>
            </h1>
            <p className="text-xs text-muted-foreground -mt-1">
              Explore RNA structure and folding
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href="https://github.com/navix1456/RNA-MODEL"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub Repository"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View on GitHub</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </header>
  );
};

export default Header;
