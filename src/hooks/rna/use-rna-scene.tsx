
import { useRef, useState, useCallback, useEffect } from "react";
import * as THREE from "three";
import { useRNARenderer } from "./use-rna-renderer";
import { useRNAAnimation } from "./use-rna-animation";
import { useRNAMaterials } from "./use-rna-materials";
import { useRNAControls } from "./use-rna-controls";
import { RNAStructure, generateRNAStates, rnaSequences } from "@/lib/rna-utils";

interface UseRNASceneProps {
  containerRef: React.RefObject<HTMLDivElement>;
  sequence?: string;
  initialAnimationState?: "linear" | "folded";
}

export const useRNAScene = ({
  containerRef,
  sequence = rnaSequences.medium,
  initialAnimationState = "linear"
}: UseRNASceneProps) => {
  // Core refs that need to be shared across hooks
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const nucleotidesGroupRef = useRef<THREE.Group | null>(null);
  const backboneRef = useRef<THREE.Line | null>(null);
  const bondLinesRef = useRef<THREE.LineSegments | null>(null);
  
  // State
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [currentView, setCurrentView] = useState<"linear" | "folded">(initialAnimationState);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // RNA states for animation
  const rnaStates = useRef(generateRNAStates(sequence));
  
  // Initialize renderer and setup scene
  const { renderRNAStructure } = useRNARenderer({
    containerRef,
    sceneRef,
    cameraRef,
    nucleotidesGroupRef,
    backboneRef,
    bondLinesRef,
    setIsInitialized
  });

  // Materials for nucleotides 
  useRNAMaterials();
  
  // Camera and scene controls
  const { resetCamera, toggleAutoRotation } = useRNAControls({
    cameraRef
  });
  
  // Animation controls
  const { toggleFoldingAnimation } = useRNAAnimation({
    isAnimating,
    setIsAnimating,
    currentView,
    setCurrentView,
    rnaStates,
    renderRNAStructure,
    setAnimationProgress
  });
  
  // Update RNA structure if sequence changes
  useEffect(() => {
    if (isInitialized && sequence) {
      rnaStates.current = generateRNAStates(sequence);
      renderRNAStructure(rnaStates.current[currentView === "linear" ? 0 : 1]);
    }
  }, [isInitialized, sequence, currentView, renderRNAStructure]);
  
  return {
    currentView,
    isAnimating,
    animationProgress,
    toggleFoldingAnimation,
    resetCamera,
    toggleAutoRotation
  };
};
