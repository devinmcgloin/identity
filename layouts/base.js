import { Header } from 'components/header';

const BaseLayout = ({ children }) => (
  <main className="max-w-screen-lg mx-auto">
    <Header />
    {children}
  </main>
);

export default BaseLayout;
