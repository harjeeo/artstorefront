import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import ComingSoon from '@/views/ComingSoon';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <ComingSoon />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
