
import React from "react";
import RNAVisualizer from "@/components/RNAVisualizer";
import Header from "@/components/Header";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-blue-50">
      <Header />
      
      <main className="flex-1 container mx-auto px-2 py-4 sm:px-4 lg:px-6">
        <div className="grid gap-4">
          <section className="animate-fade-in">
            <div className="text-center max-w-2xl mx-auto mb-4">
              <div className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium inline-block mb-1 animate-fade-in">
                Interactive 3D Model
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2 text-gray-900 sm:text-3xl">
                RNA Structure & Dynamics
              </h1>
              <p className="text-sm text-muted-foreground">
                Explore the molecular architecture of RNA through this interactive 3D visualization.
              </p>
            </div>
            
            <div className="bg-white shadow-xl rounded-xl overflow-hidden h-[85vh] animate-scale-in">
              <RNAVisualizer />
            </div>
          </section>
          
          <section className="grid md:grid-cols-2 gap-4 mb-4 animate-fade-in delay-150">
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-semibold mb-2">Understanding RNA Structure</h2>
              <p className="text-xs text-muted-foreground">
                RNA is a nucleic acid present in all living cells. It acts as a messenger carrying instructions from DNA for controlling the synthesis of proteins, but also forms crucial cellular machinery like ribosomes.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
              <h2 className="text-sm font-semibold mb-2">Interactive Features</h2>
              <ul className="space-y-1 text-xs text-muted-foreground">
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full h-4 w-4 flex items-center justify-center text-xs mr-1 mt-0.5">1</span>
                  <span>Rotate the model by clicking and dragging</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full h-4 w-4 flex items-center justify-center text-xs mr-1 mt-0.5">2</span>
                  <span>Zoom in and out using the mouse wheel</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full h-4 w-4 flex items-center justify-center text-xs mr-1 mt-0.5">3</span>
                  <span>Toggle the folding animation to see how RNA structures form</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-100 text-blue-800 rounded-full h-4 w-4 flex items-center justify-center text-xs mr-1 mt-0.5">4</span>
                  <span>Switch between different RNA sequences to compare structures</span>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="bg-white border-t py-2">
        <div className="container mx-auto px-4 text-center text-xs text-muted-foreground">
          <p>
            Interactive RNA Visualizer — Created with Three.js and React
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
