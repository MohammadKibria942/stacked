"use client";

import { POSSidebar } from "@/components/POSSidebar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authenticated = sessionStorage.getItem("pos_authenticated") === "true";
    if (!authenticated) {
      router.push("/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <div className="flex min-h-screen">
      <POSSidebar />
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
