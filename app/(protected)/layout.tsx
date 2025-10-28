// app/(protected)/layout.tsx
import Navbar from '../components/Navbar';

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Ustawiamy layout na całą wysokość ekranu i używamy flexboxa
    <div className="h-screen flex flex-col">
      <Navbar />
      {/* Glówna treść strony zajmie całą dostępną przestrzeň i będzie się przewijać */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}