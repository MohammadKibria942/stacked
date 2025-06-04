import { POSSidebar } from "@/components/POSSidebar";

export default function POSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <POSSidebar />
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
