import { useRef, useEffect, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  NucleotideType,
  RNAStructure,
  interpolateRNAStructures,
  generateRNAStates,
  rnaSequences
} from "@/lib/rna-utils";

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
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animationFrameRef = useRef<number>(0);
  const nucleotidesGroupRef = useRef<THREE.Group | null>(null);
  const backboneRef = useRef<THREE.Line | null>(null);
  const bondLinesRef = useRef<THREE.LineSegments | null>(null);
  
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationProgress, setAnimationProgress] = useState(0);
  const [currentView, setCurrentView] = useState<"linear" | "folded">(initialAnimationState);
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Generate RNA structures for linear and folded states
  const rnaStates = useRef(generateRNAStates(sequence));
  
  // Material cache to avoid recreating materials
  const materialsCache = useRef<Record<NucleotideType, THREE.Material>>({} as Record<NucleotideType, THREE.Material>);
  
  // Initialize the scene
  const initScene = useCallback(() => {
    if (!containerRef.current) return;
    
    // Create scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf8f9fa);
    sceneRef.current = scene;
    
    // Add ambient light with increased intensity
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);
    
    // Add directional light with better positioning
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(10, 20, 15);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Add hemisphere light for better coloring
    const hemisphereLight = new THREE.HemisphereLight(0x606090, 0xfffff0, 0.5);
    scene.add(hemisphereLight);
    
    // Add a point light for highlights
    const pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.set(0, 50, 50);
    scene.add(pointLight);
    
    // Create camera with wider field of view
    const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 1000);
    camera.position.set(0, 20, 45); // Position further back to see larger model
    cameraRef.current = camera;
    
    // Create renderer with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: "highp"
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    containerRef.current.appendChild(renderer.domElement);
    renderer.domElement.classList.add("three-canvas");
    rendererRef.current = renderer;
    
    // Add controls with improved settings
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.rotateSpeed = 0.7;
    controls.minDistance = 20;
    controls.maxDistance = 150;
    controls.autoRotate = false; // Can be toggled by user
    controls.autoRotateSpeed = 0.5;
    controlsRef.current = controls;
    
    // Create improved material cache for nucleotides
    materialsCache.current = {
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
    };
    
    // Create the groups to hold the RNA parts
    const nucleotidesGroup = new THREE.Group();
    scene.add(nucleotidesGroup);
    nucleotidesGroupRef.current = nucleotidesGroup;
    
    // Initial RNA structure
    renderRNAStructure(rnaStates.current[initialAnimationState === "linear" ? 0 : 1]);
    
    // Start animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      // Update controls
      if (controlsRef.current) {
        controlsRef.current.update();
      }
      
      // Render
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    setIsInitialized(true);
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      rendererRef.current?.dispose();
    };
  }, [containerRef, sequence, initialAnimationState]);
  
  // Render the RNA structure with improved visuals
  const renderRNAStructure = useCallback((structure: RNAStructure) => {
    if (!sceneRef.current || !nucleotidesGroupRef.current) return;
    
    // Clear previous structure
    if (nucleotidesGroupRef.current) {
      while (nucleotidesGroupRef.current.children.length > 0) {
        const child = nucleotidesGroupRef.current.children[0];
        nucleotidesGroupRef.current.remove(child);
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
        }
      }
    }
    
    if (backboneRef.current) {
      sceneRef.current.remove(backboneRef.current);
      backboneRef.current.geometry.dispose();
      backboneRef.current = null;
    }
    
    if (bondLinesRef.current) {
      sceneRef.current.remove(bondLinesRef.current);
      bondLinesRef.current.geometry.dispose();
      bondLinesRef.current = null;
    }
    
    // Create nucleotides with improved geometry
    structure.nucleotides.forEach((nucleotide, index) => {
      // Create improved nucleotide mesh with better geometry
      const geometry = new THREE.SphereGeometry(1.2, 36, 36); // Larger and higher poly count
      const material = materialsCache.current[nucleotide.type].clone();
      
      const nucleotideMesh = new THREE.Mesh(geometry, material);
      nucleotideMesh.position.set(...nucleotide.position);
      nucleotideMesh.castShadow = true;
      nucleotideMesh.receiveShadow = true;
      
      if (nucleotide.rotation) {
        nucleotideMesh.rotation.set(...nucleotide.rotation);
      }
      
      nucleotideMesh.userData = { type: nucleotide.type, index };
      nucleotidesGroupRef.current?.add(nucleotideMesh);
    });
    
    // Create phosphate backbone with improved appearance
    const backbonePoints = structure.backbonePoints.map(
      point => new THREE.Vector3(...point)
    );
    
    // Use CatmullRomCurve3 for smoother backbone
    const curve = new THREE.CatmullRomCurve3(backbonePoints);
    const curvePoints = curve.getPoints(backbonePoints.length * 6); // More points for smoother curve
    
    const backboneGeometry = new THREE.BufferGeometry().setFromPoints(curvePoints);
    const backboneMaterial = new THREE.LineBasicMaterial({
      color: 0xDADADA,
      linewidth: 3,
      transparent: true,
      opacity: 0.8
    });
    
    const backboneLine = new THREE.Line(backboneGeometry, backboneMaterial);
    sceneRef.current.add(backboneLine);
    backboneRef.current = backboneLine;
    
    // Create hydrogen bonds between paired nucleotides with improved appearance
    const bondVertices: number[] = [];
    
    structure.nucleotides.forEach((nucleotide, index) => {
      if (nucleotide.pairsWith !== undefined && nucleotide.pairsWith > index) {
        const pairNucleotide = structure.nucleotides[nucleotide.pairsWith];
        
        bondVertices.push(...nucleotide.position);
        bondVertices.push(...pairNucleotide.position);
      }
    });
    
    if (bondVertices.length > 0) {
      const bondGeometry = new THREE.BufferGeometry();
      bondGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(bondVertices, 3)
      );
      
      const bondMaterial = new THREE.LineBasicMaterial({
        color: 0xFFFFFF,
        transparent: true,
        opacity: 0.7,
        linewidth: 1.5
      });
      
      const bondLines = new THREE.LineSegments(bondGeometry, bondMaterial);
      sceneRef.current.add(bondLines);
      bondLinesRef.current = bondLines;
    }
  }, []);
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      
      rendererRef.current.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [containerRef]);
  
  // Initialize scene
  useEffect(() => {
    initScene();
    
    return () => {
      cancelAnimationFrame(animationFrameRef.current);
    };
  }, [initScene]);
  
  // Update RNA structure if sequence changes
  useEffect(() => {
    if (isInitialized) {
      rnaStates.current = generateRNAStates(sequence);
      renderRNAStructure(rnaStates.current[currentView === "linear" ? 0 : 1]);
    }
  }, [sequence, isInitialized, renderRNAStructure, currentView]);
  
  // Animation between states
  const animateToState = useCallback((targetState: "linear" | "folded", duration: number = 2000) => {
    if (isAnimating) return;
    
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
  }, [isAnimating, currentView, renderRNAStructure]);
  
  // Expose the animation controls
  const toggleFoldingAnimation = useCallback(() => {
    const targetState = currentView === "linear" ? "folded" : "linear";
    animateToState(targetState);
  }, [currentView, animateToState]);
  
  // Reset camera view
  const resetCamera = useCallback(() => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(0, 15, 30);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  }, []);
  
  // Toggle auto-rotation - new feature
  const toggleAutoRotation = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = !controlsRef.current.autoRotate;
    }
  }, []);
  
  return {
    currentView,
    isAnimating,
    animationProgress,
    toggleFoldingAnimation,
    resetCamera,
    toggleAutoRotation // New feature
  };
};
