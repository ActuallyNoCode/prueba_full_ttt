"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { GoEyeClosed } from "react-icons/go";
import { BsEye } from "react-icons/bs";
import axios from "axios";
import { config } from "@/config";
import { signIn } from "next-auth/react";

interface FormikValues {
  username: string;
  email: string;
  password: string;
  rememberMe: boolean;
}

const AuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isRegisterMode = searchParams.get("mode") === "register";

  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleModeToggle = () => {
    router.replace(`?mode=${isRegisterMode ? "login" : "register"}`);
  };

  const validationSchema = Yup.object({
    username: isRegisterMode
      ? Yup.string().required("Username is required")
      : Yup.string(),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleSubmit = async (values: FormikValues) => {
    if (isRegisterMode) {
      try {
        await axios.post(`${config.API.BASE_URL}/auth/register`, values);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            alert("User already exists");
          }

          console.error("Registration failed:", error.message);
        } else {
          console.error("An unexpected error occurred:", error);
        }
      }
    }

    const loginRes = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (loginRes?.error) {
      console.error("Login failed");
      // TODO: MODAL
    } else {
      router.push("/tasks");
    }
  };

  return (
    <div className="flex flex-1 bg-background">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <Image src="/logo.png" alt="Your Company" width={40} height={40} />
            <h2 className="mt-8 text-2xl font-bold tracking-tight text-textPrimary">
              {isRegisterMode ? "Create an account" : "Sign in to your account"}
            </h2>
            <p className="mt-2 text-sm text-textSecondary">
              {isRegisterMode
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <a
                onClick={handleModeToggle}
                className="font-semibold text-primary hover:text-primaryDark cursor-pointer"
              >
                {isRegisterMode ? "Sign in" : "Create it here"}
              </a>
            </p>
          </div>

          <div className="mt-10">
            <Formik
              initialValues={{
                username: "",
                email: "",
                password: "",
                rememberMe: false,
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-6">
                  {isRegisterMode && (
                    <div>
                      <label
                        htmlFor="username"
                        className="block text-sm font-medium text-textPrimary"
                      >
                        Username
                      </label>
                      <div className="mt-2">
                        <Field
                          id="username"
                          name="username"
                          type="text"
                          className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                        />
                        <ErrorMessage
                          name="username"
                          component="div"
                          className="text-red-500 text-xs"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-textPrimary"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-textPrimary"
                    >
                      Password
                    </label>
                    <div className="mt-2 relative">
                      <Field
                        id="password"
                        name="password"
                        type={passwordVisible ? "text" : "password"}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {passwordVisible ? (
                          <GoEyeClosed size={20} />
                        ) : (
                          <BsEye size={20} />
                        )}
                      </button>
                      <ErrorMessage
                        name="password"
                        component="div"
                        className="text-red-500 text-xs"
                      />
                    </div>
                  </div>

                  {!isRegisterMode && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Field
                          id="rememberMe"
                          name="rememberMe"
                          type="checkbox"
                          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary hover:cursor-pointer"
                        />
                        <label
                          htmlFor="rememberMe"
                          className="ml-3 block text-sm text-textSecondary"
                        >
                          Remember me
                        </label>
                      </div>

                      <div className="text-sm">
                        <a
                          href="#"
                          className="font-semibold text-primary hover:text-primaryDark"
                        >
                          Forgot password?
                        </a>
                      </div>
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-primaryDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      disabled={isSubmitting}
                    >
                      {isRegisterMode ? "Register" : "Sign in"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
