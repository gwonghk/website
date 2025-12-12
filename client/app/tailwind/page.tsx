"use client";
import React from "react";

export default function TailwindTransitionsDemo() {
  return (
    <div className="space-y-8 p-8 max-w-xl mx-auto">
      {/* 1. Fade */}
      <div className="transition-opacity duration-300 hover:opacity-70 p-4 bg-gray-600 rounded">
        1. Fade on hover
      </div>

      {/* 2. Scale */}
      <div className="transition-transform duration-300 hover:scale-105 p-4 bg-gray-600 rounded">
        2. Scale on hover
      </div>

      {/* 3. Background Color */}
      <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors duration-300">
        3. Background color transition
      </button>

      {/* 4. Shadow */}
      <div className="p-4 bg-white rounded shadow transition-shadow duration-300 hover:shadow-lg">
        4. Shadow transition
      </div>

      {/* 5. Combined Fade + Scale */}
      <div className="transition-all duration-300 hover:scale-105 hover:opacity-80 p-4 bg-gray-600 rounded">
        5. Fade + scale combined
      </div>

      {/* 6. Slide Down (max-height) */}
      <div className="group">
        <div className="bg-gray-200 p-3 rounded cursor-pointer">
          6. Hover to slide down
        </div>
        <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-40 bg-gray-600 p-3 rounded">
          Sliding content appears...
        </div>
      </div>

      {/* 7. Slide Right */}
      <div className="transition-transform duration-300 hover:translate-x-2 p-4 bg-gray-600 rounded">
        7. Slide right
      </div>

      {/* 8. Rotate */}
      <div className="transition-transform duration-300 hover:rotate-6 p-4 bg-gray-600 rounded">
        8. Rotate slightly
      </div>

      {/* 9. Blur */}
      <img
        className="transition-all duration-300 hover:blur-sm w-40 rounded"
        src="https://placekitten.com/200/200"
        alt="example"
      />

      {/* 10. Button press shrinking */}
      <button className="transition-transform active:scale-95 bg-gray-800 text-white px-4 py-2 rounded">
        10. Press me
      </button>
    </div>
  );
}
