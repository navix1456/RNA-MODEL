
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Rotate3d, RotateCcw, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { rnaSequences } from "@/lib/rna-utils";

interface RNAControlsProps {
  currentView: "linear" | "folded";
  isAnimating: boolean;
  animationProgress: number;
  toggleFoldingAnimation: () => void;
  resetCamera: () => void;
  toggleAutoRotation: () => void;
  onInfoToggle: () => void;
  selectedSequence: string;
  onSequenceChange: (sequence: string) => void;
}

const RNAControls: React.FC<RNAControlsProps> = ({
  currentView,
  isAnimating,
  animationProgress,
  toggleFoldingAnimation,
  resetCamera,
  toggleAutoRotation,
  onInfoToggle,
  selectedSequence,
  onSequenceChange
}) => {
  return (
    <div className="absolute left-0 top-0 p-2 z-10 animate-fade-in">
      <div className="glass-card p-2 rounded-lg backdrop-blur-sm bg-white/70">
        <Tabs defaultValue="controls" className="w-full">
          <TabsList className="mb-1">
            <TabsTrigger value="controls" className="text-xs py-1">Controls</TabsTrigger>
            <TabsTrigger value="sequences" className="text-xs py-1">Sequences</TabsTrigger>
          </TabsList>
          
          <TabsContent value="controls" className="space-y-1">
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-7 px-2"
                onClick={toggleFoldingAnimation}
                disabled={isAnimating}
              >
                {currentView === "linear" ? (
                  <><ArrowRight className="mr-1 h-3 w-3" /> Fold RNA</>
                ) : (
                  <><ArrowLeft className="mr-1 h-3 w-3" /> Unfold RNA</>
                )}
              </Button>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={toggleAutoRotation}
                    >
                      <RotateCcw className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    <p>Toggle auto-rotation</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={resetCamera}
                    >
                      <Rotate3d className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    <p>Reset camera view</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      onClick={onInfoToggle}
                    >
                      <Info className="h-3 w-3" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="text-xs">
                    <p>Show information</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            
            {isAnimating && (
              <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                <div
                  className="bg-primary h-1 rounded-full transition-all duration-300 ease-in-out"
                  style={{ width: `${animationProgress * 100}%` }}
                ></div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sequences" className="space-y-1">
            <Button
              variant={selectedSequence === rnaSequences.short ? "default" : "outline"}
              size="sm"
              className="w-full text-xs h-7"
              onClick={() => onSequenceChange(rnaSequences.short)}
            >
              Short Sequence
            </Button>
            
            <Button
              variant={selectedSequence === rnaSequences.medium ? "default" : "outline"}
              size="sm"
              className="w-full text-xs h-7"
              onClick={() => onSequenceChange(rnaSequences.medium)}
            >
              Medium Sequence
            </Button>
            
            <Button
              variant={selectedSequence === rnaSequences.tRNA ? "default" : "outline"}
              size="sm"
              className="w-full text-xs h-7"
              onClick={() => onSequenceChange(rnaSequences.tRNA)}
            >
              tRNA Sequence
            </Button>
            
            <Button
              variant={selectedSequence === rnaSequences.large ? "default" : "outline"}
              size="sm"
              className="w-full text-xs h-7"
              onClick={() => onSequenceChange(rnaSequences.large)}
            >
              Large Sequence
            </Button>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RNAControls;
