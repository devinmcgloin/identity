import { Footer } from 'components/footer';
import { Header } from 'components/header';

const BaseLayout = ({ children, includeFooter = false }) => (
  <main className="max-w-screen-lg mx-auto">
    <Header />
    {children}
    {includeFooter && <Footer />}
  </main>
);

export default BaseLayout;
