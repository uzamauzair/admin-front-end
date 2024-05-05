import Sidebar from "@/components/Sidebar";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row items-stretch">
      <div className="z-10 flex-shrink-0">
        <Sidebar />
      </div>
    </main>
  );
}
