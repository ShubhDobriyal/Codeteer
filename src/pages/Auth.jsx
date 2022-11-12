import AuthForm from "../components/Auth/AuthForm";
import Logo from "../components/UI/Logo";
const Auth = () => {
  return (
    <div className="flex min-h-[calc(100%-100px)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        <AuthForm />
      </div>
    </div>
  );
};

export default Auth;
