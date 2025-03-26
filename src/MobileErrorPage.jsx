import React from "react";

const MobileErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="p-4 text-center">
        <div className="mb-4 text-6xl text-red-600">🚫</div>
        <h1 className="mb-2 text-3xl font-bold">
          Page Not Accessible on Mobile
        </h1>
        <p className="text-lg text-gray-700">
          This page is not available on mobile devices. Please use a desktop or
          tablet to view this content.
        </p>
      </div>
    </div>
  );
};

export default MobileErrorPage;
