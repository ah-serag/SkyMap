"use client";

import React from "react";
import Link from "next/link";

const DocPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Page Header */}
      <header className="w-full flex justify-between items-center flex-wrap max-w-7xl mx-auto px-4 py-6 mt-16">
        <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Documentation</h1>
        <p className="text-sm text-muted-foreground">
          User guide, instructions, and examples for interacting with SkyMap
        </p>

        </div>
     


          {/* Go to Dashboard Button */}
        <div className=" flex justify-center mt-3">
          <Link href="/Dashboard" className="px-6 py-3 bg-gradient-to-r from-fuchsia-400  to-emerald-300 font-semibold rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            Go to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-4 py-6 space-y-8">

        {/* Section 1 */}
        <section className="bg-card p-6 rounded-xl shadow-md border border-accent">
          <h2 className="text-2xl font-semibold mb-3">Getting Started</h2>
          <p className="text-foreground/90 mb-2">
            Start using SkyMap easily by following these steps:
          </p>
          <ul className="list-disc list-inside space-y-1 text-foreground/80">
            <li>Select your location on the map</li>
            <li>View the current weather conditions</li>
            <li>Check rainfall and temperature forecasts</li>
            <li>See wind direction and speed</li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="bg-card p-6 rounded-xl shadow-md border border-accent">
          <h2 className="text-2xl font-semibold mb-3">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1">Interactive Map</h3>
              <p className="text-foreground/80">
                An interactive map allowing you to set your location and track weather conditions accurately.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1">Weather Forecast</h3>
              <p className="text-foreground/80">
                7-day weather forecast including rainfall and temperature information.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1">Wind & Direction</h3>
              <p className="text-foreground/80">
                Clear display of wind direction and speed on the map.
              </p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-lg transition">
              <h3 className="font-semibold text-lg mb-1">Dark/Light Mode</h3>
              <p className="text-foreground/80">
                Supports both dark and light modes for a comfortable viewing experience.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3 - Support */}
        <section className="bg-card p-6 rounded-xl shadow-md border border-accent">
          <h2 className="text-2xl font-semibold mb-3">Support</h2>
          <p className="text-foreground/80">
            For any questions or issues, contact us at:
            <span className="text-blue-500 underline ml-1">aserag877@gmail.com</span>
          </p>
        </section>

      

      </main>
    </div>
  );
};

export default DocPage;
