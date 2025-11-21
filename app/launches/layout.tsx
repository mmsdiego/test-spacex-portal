import { ApolloWrapper } from '@/app/providers/ApolloProvider';
import { Header } from '@/components/Header';

export default function LaunchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <ApolloWrapper>
        {children}
      </ApolloWrapper>
    </>
  );
}