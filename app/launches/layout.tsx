import { ApolloWrapper } from "@/app/providers/ApolloProvider";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

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