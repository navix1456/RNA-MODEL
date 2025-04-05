
import { useRef } from "react";
import * as THREE from "three";
import { NucleotideType } from "@/lib/rna-utils";

export const useRNAMaterials = () => {
  // Material cache to avoid recreating materials
  const materialsCache = useRef<Record<NucleotideType, THREE.Material>>({
    adenine: new THREE.MeshPhysicalMaterial({
      color: 0xA3E2C5,
      metalness: 0.2,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    }),
    uracil: new THREE.MeshPhysicalMaterial({
      color: 0xF1A5A5,
      metalness: 0.2,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    }),
    guanine: new THREE.MeshPhysicalMaterial({
      color: 0xA3C9E2,
      metalness: 0.2,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    }),
    cytosine: new THREE.MeshPhysicalMaterial({
      color: 0xF1E3A5,
      metalness: 0.2,
      roughness: 0.2,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    }),
  });

  return { materialsCache };
};
