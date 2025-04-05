// RNA building blocks and utilities
export type NucleotideType = "adenine" | "uracil" | "guanine" | "cytosine";

export interface NucleotidePosition {
  type: NucleotideType;
  position: [number, number, number];
  rotation?: [number, number, number];
  pairsWith?: number; // Index of paired nucleotide, if any
}

export interface RNAStructure {
  nucleotides: NucleotidePosition[];
  backbonePoints: [number, number, number][]; // Points for the phosphate backbone
}

// RNA sequence and folding patterns
export const generateLinearRNA = (sequence: string, segmentLength: number = 5): RNAStructure => {
  const nucleotides: NucleotidePosition[] = [];
  const backbonePoints: [number, number, number][] = [];
  
  // Enhanced helix parameters - larger radius and spacing for better visualization
  const radius = 4;  // Increased from 2
  const verticalSpacing = 1.8;  // Increased from 1.2
  const rotationPerStep = Math.PI / 6;
  
  for (let i = 0; i < sequence.length; i++) {
    const char = sequence[i].toUpperCase();
    const angle = i * rotationPerStep;
    const x = radius * Math.cos(angle);
    const y = i * verticalSpacing;
    const z = radius * Math.sin(angle);
    
    let type: NucleotideType;
    switch (char) {
      case "A": type = "adenine"; break;
      case "U": type = "uracil"; break;
      case "G": type = "guanine"; break;
      case "C": type = "cytosine"; break;
      default: type = "adenine"; // Default fallback
    }
    
    nucleotides.push({
      type,
      position: [x, y, z],
      rotation: [0, angle + Math.PI/2, 0]
    });
    
    backbonePoints.push([x, y, z]);
  }
  
  return {
    nucleotides,
    backbonePoints
  };
};

// Generate a folded RNA with hairpin loop - enhanced for better visualization
export const generateFoldedRNA = (sequence: string): RNAStructure => {
  const halfLength = Math.floor(sequence.length / 2);
  const nucleotides: NucleotidePosition[] = [];
  const backbonePoints: [number, number, number][] = [];
  
  // Enhanced parameters - larger dimensions for better visualization
  const radius = 4;  // Increased from 2
  const verticalSpacing = 1.8;  // Increased from 1.2
  const rotationPerStep = Math.PI / 6;
  const loopRadius = 5;  // Increased from 3
  
  // First half - upward helix
  for (let i = 0; i < halfLength; i++) {
    const char = sequence[i].toUpperCase();
    const angle = i * rotationPerStep;
    const x = radius * Math.cos(angle);
    const y = i * verticalSpacing;
    const z = radius * Math.sin(angle);
    
    let type: NucleotideType;
    switch (char) {
      case "A": type = "adenine"; break;
      case "U": type = "uracil"; break;
      case "G": type = "guanine"; break;
      case "C": type = "cytosine"; break;
      default: type = "adenine";
    }
    
    nucleotides.push({
      type,
      position: [x, y, z],
      rotation: [0, angle + Math.PI/2, 0],
      pairsWith: sequence.length - i - 1 // Pair with the corresponding base in the second half
    });
    
    backbonePoints.push([x, y, z]);
  }
  
  // Loop at the top - more segments for smoother appearance
  const loopSegments = 8;  // Increased from 5
  const loopStartAngle = halfLength * rotationPerStep;
  const loopAngleStep = Math.PI / loopSegments;
  
  for (let i = 0; i <= loopSegments; i++) {
    const loopAngle = loopStartAngle + i * loopAngleStep;
    const x = loopRadius * Math.cos(loopAngle);
    const y = halfLength * verticalSpacing;
    const z = loopRadius * Math.sin(loopAngle);
    
    backbonePoints.push([x, y, z]);
  }
  
  // Second half - downward helix (paired with first half)
  for (let i = halfLength; i < sequence.length; i++) {
    const char = sequence[i].toUpperCase();
    const angleOffset = (sequence.length - i - 1) * rotationPerStep;
    const angle = Math.PI + angleOffset;
    const x = radius * Math.cos(angle);
    const y = (sequence.length - i - 1) * verticalSpacing;
    const z = radius * Math.sin(angle);
    
    let type: NucleotideType;
    switch (char) {
      case "A": type = "adenine"; break;
      case "U": type = "uracil"; break;
      case "G": type = "guanine"; break;
      case "C": type = "cytosine"; break;
      default: type = "adenine";
    }
    
    nucleotides.push({
      type,
      position: [x, y, z],
      rotation: [0, angle + Math.PI/2, 0],
      pairsWith: sequence.length - i - 1 // Pair with the corresponding base in the first half
    });
    
    backbonePoints.push([x, y, z]);
  }
  
  return {
    nucleotides,
    backbonePoints
  };
};

// Generate both linear and folded states for animation
export const generateRNAStates = (sequence: string): [RNAStructure, RNAStructure] => {
  return [
    generateLinearRNA(sequence),
    generateFoldedRNA(sequence)
  ];
};

// Interpolate between two RNA structures for animation
export const interpolateRNAStructures = (
  startStructure: RNAStructure,
  endStructure: RNAStructure,
  progress: number // 0 to 1
): RNAStructure => {
  const interpolatedNucleotides: NucleotidePosition[] = [];
  const interpolatedBackbonePoints: [number, number, number][] = [];
  
  // Interpolate nucleotide positions
  for (let i = 0; i < startStructure.nucleotides.length; i++) {
    const start = startStructure.nucleotides[i];
    const end = endStructure.nucleotides[i];
    
    interpolatedNucleotides.push({
      type: start.type,
      position: [
        start.position[0] + (end.position[0] - start.position[0]) * progress,
        start.position[1] + (end.position[1] - start.position[1]) * progress,
        start.position[2] + (end.position[2] - start.position[2]) * progress
      ],
      rotation: start.rotation ? [
        start.rotation[0] + ((end.rotation?.[0] || 0) - start.rotation[0]) * progress,
        start.rotation[1] + ((end.rotation?.[1] || 0) - start.rotation[1]) * progress,
        start.rotation[2] + ((end.rotation?.[2] || 0) - start.rotation[2]) * progress
      ] : undefined,
      pairsWith: start.pairsWith
    });
  }
  
  // Interpolate backbone points
  const maxPoints = Math.max(
    startStructure.backbonePoints.length,
    endStructure.backbonePoints.length
  );
  
  for (let i = 0; i < maxPoints; i++) {
    if (i < startStructure.backbonePoints.length && i < endStructure.backbonePoints.length) {
      // Both structures have this point - interpolate
      const start = startStructure.backbonePoints[i];
      const end = endStructure.backbonePoints[i];
      
      interpolatedBackbonePoints.push([
        start[0] + (end[0] - start[0]) * progress,
        start[1] + (end[1] - start[1]) * progress,
        start[2] + (end[2] - start[2]) * progress
      ]);
    } else if (i < startStructure.backbonePoints.length) {
      // Only start structure has this point - fade it out
      const point = startStructure.backbonePoints[i];
      interpolatedBackbonePoints.push([...point]);
    } else {
      // Only end structure has this point - fade it in
      const point = endStructure.backbonePoints[i];
      interpolatedBackbonePoints.push([...point]);
    }
  }
  
  return {
    nucleotides: interpolatedNucleotides,
    backbonePoints: interpolatedBackbonePoints
  };
};

// Define example RNA sequences - adding longer sequences for more impressive models
export const rnaSequences = {
  short: "AUGCAUGCAUGC",
  medium: "AUGCAUGCAUGCAUGCAUGCAUGC",
  tRNA: "GCCCGGAUAGCUCAGUCGGUAGAGCAGGGGAUUGAAAAUCCCCGUGUCCUUGGUUCGAUUCCGAGUCCGGGCACCA",
  random: "AUGCGGCUUAGCAUGCUGAAGCUAGUUCCGAUAUCGAUAGCUAUACGAUCGAUAGCUA",
  large: "AUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUGCAUG"
};
