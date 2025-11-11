import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/generated/prisma/client";
import { siwe } from "better-auth/plugins";
import { verifySiweMessage, generateSiweNonce, parseSiweMessage } from "viem/siwe";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { SiweMessage } from "siwe";

const prisma = new PrismaClient();
export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
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
        return nonce;
      },
      verifyMessage: async ({ message, signature, address }) => {
        try {
          //  Method 1: making http request to verify SIWE message
          // takes too much time
          // const publicClient = createPublicClient({
          //   chain: mainnet,
          //   transport: http(),
          // });

          // const valid = await publicClient.verifySiweMessage({
          //   message,
          //   signature: signature as `0x${string}`,
          // });

          // method: 2: using siwe library to verify SIWE message cryptographically locally only
          // quick
          const siweMessage = new SiweMessage(message);
          const res = await siweMessage.verify({ signature });

          return res.success;
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
