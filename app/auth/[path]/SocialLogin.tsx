"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import React from "react";
import { useConnect, useAccount } from "wagmi";
import { Address } from "viem";
import { createSiweMessage } from "viem/siwe";
import { mainnet } from "viem/chains";
import { toast } from "sonner";
import { createWalletClient, custom } from "viem";

const walletClient =
  typeof window !== "undefined"
    ? createWalletClient({
        transport: custom(window.ethereum!),
      })
    : null;

export default function SocialLogin() {
  const router = useRouter();

  const { connectors } = useConnect();
  const { connect } = useConnect();
  const { isConnected, address } = useAccount();

  const handleSignInWithGoogle = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  const handleSignInWithEthereum = async (address: Address) => {
    if (!address) {
      toast.error("No Ethereum address found");
      return;
    }

    const { data: getNonceRes, error: getNonceError } = await authClient.siwe.nonce({
      walletAddress: address,
      chainId: 1, // optional for Ethereum mainnet, required for other chains. Defaults to 1
    });
    if (getNonceRes) {
      console.log("Nonce:", getNonceRes.nonce);
    }

    const nonce = getNonceRes?.nonce;

    if (!nonce) {
      toast.error("Failed to fetch nonce");
      return;
    }

    const message = createSiweMessage({
      address: address,
      chainId: mainnet.id,
      domain: window.location.hostname,
      nonce: nonce,
      uri: window.location.origin,
      version: "1",
    });

    if (!walletClient) {
      toast.error("Wallet client not initialized");
      return;
    }

    const signature = await walletClient.signMessage({ account: address, message });

    const { data: verifyData, error: verifyError } = await authClient.siwe.verify({
      message: message,
      signature, // The signature from the user's wallet
      walletAddress: address as Address,
      chainId: 1, // optional for Ethereum mainnet, required for other chains. Must match Chain ID in SIWE message
      // email: "user@example.com", // optional, required if anonymous is false
    });

    if (!verifyData) {
      toast.error("SIWE verification failed");
      return;
    }

    console.log("Authentication successful:", verifyData.user);
    router.push("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700" onClick={handleSignInWithGoogle}>
        sign in with google
      </button>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => {
            if (isConnected && address) {
              handleSignInWithEthereum(address);
              return;
            }

            connect(
              { connector },
              {
                onSuccess: (res) => {
                  handleSignInWithEthereum(res.accounts[0]);
                },
              }
            );
          }}
          className="m-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
        >
          {connector.name}
        </button>
      ))}
    </div>
  );
}
