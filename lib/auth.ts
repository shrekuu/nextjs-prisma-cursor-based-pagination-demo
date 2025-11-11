import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { siwe } from "better-auth/plugins";
import { verifySiweMessage, generateSiweNonce } from "viem/siwe";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    siwe({
      domain: "localhost",
      // emailDomainName: "localhost", // optional
      // anonymous: false, // optional, default is true
      getNonce: async () => {
        const nonce = await generateSiweNonce();

        console.log("nonce", nonce);
        return nonce;
      },
      verifyMessage: async ({ message, signature, address }) => {
        try {
          const publicClient = createPublicClient({
            chain: mainnet,
            transport: http(),
          });

          console.log({ message, signature, address });
          const valid = await publicClient.verifySiweMessage({
            message,
            signature: signature as `0x${string}`,
          });

          return valid;
        } catch (error) {
          console.error("SIWE verification failed:", error);
          return false;
        }
      },
      // ensLookup: async (args) => {
      //   // Optional: Implement ENS lookup for user names and avatars
      //   return {
      //     name: "user.eth",
      //     avatar: "https://example.com/avatar.png",
      //   };
      // },
    }),
  ],
});
