
import { useCallback } from "react";
import { RNAStructure, interpolateRNAStructures } from "@/lib/rna-utils";

interface UseRNAAnimationProps {
  isAnimating: boolean;
  setIsAnimating: (value: boolean) => void;
  currentView: "linear" | "folded";
  setCurrentView: (value: "linear" | "folded") => void;
  rnaStates: React.RefObject<[RNAStructure, RNAStructure]>;
  renderRNAStructure: (structure: RNAStructure) => void;
  setAnimationProgress: (value: number) => void;
}

export const useRNAAnimation = ({
  isAnimating,
  setIsAnimating,
  currentView,
  setCurrentView,
  rnaStates,
  renderRNAStructure,
  setAnimationProgress
}: UseRNAAnimationProps) => {
  // Animation between states
  const animateToState = useCallback((targetState: "linear" | "folded", duration: number = 2000) => {
    if (isAnimating || !rnaStates.current) return;
    
    const startTime = Date.now();
    const startStructure = rnaStates.current[currentView === "linear" ? 0 : 1];
    const endStructure = rnaStates.current[targetState === "linear" ? 0 : 1];
    
    setIsAnimating(true);
    
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setAnimationProgress(progress);
      
      const interpolatedStructure = interpolateRNAStructures(
        startStructure,
        endStructure,
        progress
      );
      
      renderRNAStructure(interpolatedStructure);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentView(targetState);
        setIsAnimating(false);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isAnimating, currentView, setIsAnimating, setCurrentView, rnaStates, renderRNAStructure, setAnimationProgress]);
  
  // Expose the animation controls
  const toggleFoldingAnimation = useCallback(() => {
    const targetState = currentView === "linear" ? "folded" : "linear";
    animateToState(targetState);
  }, [currentView, animateToState]);
  
  return {
    toggleFoldingAnimation,
    animateToState
  };
};
