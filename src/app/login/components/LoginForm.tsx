"use client";
import Input from "@/app/components/Input";
import { useAuth } from "@/hook";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { LoginData, RegisterData } from "./validator";

const LoginForm = () => {
  const { register, handleSubmit, reset } = useForm();
  const [mode, setMode] = useState("login");

  const { loginFunction, registerFunction } = useAuth();

  const onSub = (data: any) => {
    console.log(data);
    if (mode === "login") {
      loginFunction(data);
    } else if (mode === "register") {
      registerFunction(data);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSub)}
      className="flex flex-col gap-4 w-[500px] h-[600px] justify-center  text-white font-bold bg-gray-100 p-9 bg-opacity-[50%]"
    >
      {mode === "register" ? (
        <>
          <div className="flex justify-center items-center">
            <h2 className="text-4xl">Registe-se</h2>
          </div>

          <div className="flex flex-col gap-5">
            <Input type="text" id="name" label="Nome" {...register("name")} />
            <Input
              type="email"
              id="email"
              label="Email"
              {...register("email")}
            />
            <Input
              type="password"
              id="password"
              label="Senha"
              {...register("password")}
            />
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex gap-1">
              <p className="opacity-[70%]">Já possui uma conta? </p>
              <span
                onClick={() => setMode("login")}
                className="text-white opacity-[80%] font-extrabold cursor-pointer"
              >
                Login
              </span>
            </div>

            <button className="w-full h-12 rounded-md text-blue-950 bg-gray-300 shadow-lg">
              Regitrar-se
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-center items-center">
            <h2 className="text-4xl">Login</h2>
          </div>

          <div className="flex flex-col gap-5">
            <Input
              type="email"
              id="email"
              label="Email"
              {...register("email")}
            />
            <Input
              type="password"
              id="password"
              label="Senha"
              {...register("password")}
            />
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              className="flex h-12 justify-center items-center gap-2 text-white bg-blue-500 rounded-md"
            >
              <div>
                <FcGoogle className="text-2xl" />
              </div>
              Entrar com google
            </button>
          </div>

          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex gap-1">
              <p className="opacity-[70%]">Não possui uma conta? </p>
              <span
                onClick={() => setMode("register")}
                className="text-white opacity-[80%] font-extrabold cursor-pointer"
              >
                Criar conta
              </span>
            </div>

            <button
              type="submit"
              className="w-full h-12 rounded-md text-blue-950 bg-gray-300 shadow-lg"
            >
              Logar
            </button>
          </div>
        </>
      )}
    </form>
  );
};

export default LoginForm;
