import type { ReactNode } from "react";
import { type State, WagmiProvider } from "wagmi";
import AppWagmiProvider from "./AppWagmiProvider";
import AppAuthUIProvider from "./AppAuthUIProvider";

export default function AppProviders({ children, initialState }: { children: ReactNode; initialState: State | undefined }) {
  return (
    <AppWagmiProvider initialState={initialState}>
      <AppAuthUIProvider>{children}</AppAuthUIProvider>
    </AppWagmiProvider>
  );
}
