import { Footer } from 'components/footer';
import { Header } from 'components/header';

const BaseLayout = ({
  children,
  includeFooter = false,
  includeNewsletter = false,
}) => (
  <main className="max-w-screen-lg mx-auto">
    <Header />
    {children}
    {includeFooter && <Footer includeNewsletter={includeNewsletter} />}
  </main>
);

export default BaseLayout;
