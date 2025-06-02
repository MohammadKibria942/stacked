import React from "react";

export function Address() {
  return (
    <div className="flex items-center gap-2 text-sm">
      {/* Map Pin Icon from Lucide React */}
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-primary"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-10a8 8 0 1 1 16 0c0 4.627-3.582 10-8 10Zm0-10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"/></svg>
      202 Three Colts Lane, London, EMEA E2 6JN
    </div>
  );
}
