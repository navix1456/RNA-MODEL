
import React, { useRef, useState, useEffect } from "react";
import { useRNAScene } from "@/hooks/rna";
import { rnaSequences } from "@/lib/rna-utils";
import { cn } from "@/lib/utils";
import RNAControls from "./rna/RNAControls";
import RNALegend from "./rna/RNALegend";
import RNAInfoPanel from "./rna/RNAInfoPanel";

interface RNAVisualizerProps {
  className?: string;
}

const RNAVisualizer: React.FC<RNAVisualizerProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedSequence, setSelectedSequence] = useState(rnaSequences.medium);
  const [showInfo, setShowInfo] = useState(false);
  
  const {
    currentView,
    isAnimating,
    animationProgress,
    toggleFoldingAnimation,
    resetCamera,
    toggleAutoRotation
  } = useRNAScene({
    containerRef,
    sequence: selectedSequence,
    initialAnimationState: "linear"
  });
  
  const handleSequenceChange = (sequence: string) => {
    setSelectedSequence(sequence);
  };
  
  // Handle escape key to close info panel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showInfo) {
        setShowInfo(false);
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showInfo]);
  
  const toggleInfoPanel = () => {
    setShowInfo(!showInfo);
  };
  
  return (
    <div className={cn("relative w-full h-full flex flex-col", className)}>
      {/* 3D Visualization container */}
      <div 
        ref={containerRef} 
        className="relative flex-1 w-full h-full min-h-[500px] bg-gradient-to-b from-blue-50 to-white overflow-hidden rounded-lg"
      />
      
      {/* Controls */}
      <RNAControls
        currentView={currentView}
        isAnimating={isAnimating}
        animationProgress={animationProgress}
        toggleFoldingAnimation={toggleFoldingAnimation}
        resetCamera={resetCamera}
        toggleAutoRotation={toggleAutoRotation}
        onInfoToggle={toggleInfoPanel}
        selectedSequence={selectedSequence}
        onSequenceChange={handleSequenceChange}
      />
      
      {/* Legend */}
      <RNALegend />
      
      {/* Info Panel */}
      <RNAInfoPanel 
        showInfo={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </div>
  );
};

export default RNAVisualizer;
