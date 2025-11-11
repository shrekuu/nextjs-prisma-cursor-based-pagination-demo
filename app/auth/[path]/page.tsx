import { AuthView, SignInForm } from "@daveyplate/better-auth-ui";
import { authViewPaths } from "@daveyplate/better-auth-ui/server";
import SocialLogin from "./SocialLogin";

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.values(authViewPaths).map((path) => ({ path }));
}

export default async function AuthPage({ params }: { params: Promise<{ path: string }> }) {
  const { path } = await params;

  return (
    <main className="container flex grow flex-col items-center justify-center self-center p-4 md:p-6">
      <AuthView path={path} socialLayout="auto" redirectTo="/dashboard" />
      <div className="mt-6 max-w-sm w-full border border-gray-200 rounded-lg p-6">
        <SignInForm localization={{}} />
        <div className="p-10 ">
          <SocialLogin />
        </div>
      </div>
    </main>
  );
}
