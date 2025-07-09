import '../styles/globals.css';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Inventory Kanban',
  description: 'Barcode-driven inventory system',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  );
}
