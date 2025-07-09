// app/page.js
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import KanbanPageClient from '@/components/KanbanPageClient';

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // ✅ Redirect to login page if not authenticated
    redirect('/login');
  }

  return (
    <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full flex justify-center pt-4 mb-8">
        <h1 className="text-4xl font-bold text-[color:var(--color-primary)] tracking-tight text-center">
          📦 Inventory Kanban System
        </h1>
      </div>

      <KanbanPageClient />
    </main>
  );
}
