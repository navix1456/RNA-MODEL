
import { useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface UseRNAControlsProps {
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  controlsRef?: React.RefObject<OrbitControls>;
}

export const useRNAControls = ({
  cameraRef,
  controlsRef
}: UseRNAControlsProps) => {
  // Reset camera view
  const resetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef?.current) {
      cameraRef.current.position.set(0, 15, 30);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    } else if (cameraRef.current) {
      cameraRef.current.position.set(0, 15, 30);
      cameraRef.current.lookAt(0, 0, 0);
    }
  }, [cameraRef, controlsRef]);
  
  // Toggle auto-rotation
  const toggleAutoRotation = useCallback(() => {
    if (controlsRef?.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  }, [controlsRef]);
  
  return {
    resetCamera,
    toggleAutoRotation
  };
};
