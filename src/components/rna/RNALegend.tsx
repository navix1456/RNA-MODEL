
import React from "react";
import { Dna } from "lucide-react";

const RNALegend: React.FC = () => {
  return (
    <div className="absolute bottom-2 right-2 z-10 animate-fade-in">
      <div className="glass-card p-2 rounded-lg backdrop-blur-sm bg-white/60">
        <h3 className="font-medium text-xs mb-1 flex items-center">
          <Dna className="h-3 w-3 mr-1" /> RNA Nucleotides
        </h3>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-rna-adenine mr-1"></div>
            <span>Adenine (A)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-rna-uracil mr-1"></div>
            <span>Uracil (U)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-rna-guanine mr-1"></div>
            <span>Guanine (G)</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-rna-cytosine mr-1"></div>
            <span>Cytosine (C)</span>
          </div>
          <div className="flex items-center col-span-2">
            <div className="w-2 h-2 rounded-full bg-rna-backbone mr-1"></div>
            <span>Phosphate Backbone</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RNALegend;
