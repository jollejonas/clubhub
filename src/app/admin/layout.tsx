import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin – ClubHub",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-surface">
      <AdminSidebar />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto pt-20 md:pt-8">
        {children}
      </main>
    </div>
  );
}
