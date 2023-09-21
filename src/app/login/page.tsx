import LoginForm from "./components/LoginForm";

const Login = () => {
  return (
    <main className="flex justify-center items-center min-h-screen  backgroundLogin">
      <section className="w-full h-screen flex justify-between ">
        <div className="w-1/2 flex gap-2 justify-center items-center text-5xl max-[920px]:hidden">
          <p className="text-yellow-200">Curta</p>
          <p className="text-white">a música</p>
        </div>

        <div className="w-1/2 flex justify-center items-center max-[920px]:w-full ">
          <LoginForm />
        </div>
      </section>
    </main>
  );
};

export default Login;
