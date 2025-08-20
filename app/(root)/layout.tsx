import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return <div>{children}</div>;
};

export default RootLayout;
