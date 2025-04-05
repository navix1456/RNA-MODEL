
import React from "react";
import { Button } from "@/components/ui/button";

interface RNAInfoPanelProps {
  showInfo: boolean;
  onClose: () => void;
}

const RNAInfoPanel: React.FC<RNAInfoPanelProps> = ({ showInfo, onClose }) => {
  if (!showInfo) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-20 flex items-center justify-center p-4 animate-scale-in">
      <div className="bg-white rounded-lg p-4 max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-3">About RNA Visualization</h2>
        
        <div className="space-y-3 text-sm">
          <p>
            This interactive 3D model represents an RNA (Ribonucleic Acid) molecule, a crucial 
            biological macromolecule involved in various biological roles including coding, 
            decoding, regulation, and expression of genes.
          </p>
          
          <h3 className="text-base font-semibold">Structure Components:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Nucleotide Bases:</span> RNA contains four types of nucleotide bases: Adenine (green), Uracil (red), Guanine (blue), and Cytosine (yellow).</li>
            <li><span className="font-medium">Phosphate Backbone:</span> The light gray line represents the phosphate-sugar backbone that holds the nucleotides together.</li>
            <li><span className="font-medium">Hydrogen Bonds:</span> The thin white lines represent hydrogen bonds that form between complementary base pairs (A-U and G-C).</li>
          </ul>
          
          <h3 className="text-base font-semibold">Folding Animation:</h3>
          <p>
            RNA molecules can fold into complex three-dimensional structures based on the 
            complementary pairing between nucleotides. The animation shows this folding process, 
            which is crucial for RNA's biological function.
          </p>
          
          <h3 className="text-base font-semibold">Interactions:</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li><span className="font-medium">Rotate:</span> Click and drag to rotate the model.</li>
            <li><span className="font-medium">Zoom:</span> Use mouse wheel or pinch gesture to zoom in/out.</li>
            <li><span className="font-medium">Pan:</span> Right-click and drag (or use two fingers) to pan the view.</li>
            <li><span className="font-medium">Auto-Rotate:</span> Toggle automatic rotation for a better view of the 3D structure.</li>
          </ul>
        </div>
        
        <Button 
          className="mt-3" 
          onClick={onClose}
        >
          Close
        </Button>
      </div>
    </div>
  );
};

export default RNAInfoPanel;
