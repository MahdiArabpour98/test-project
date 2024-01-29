"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import Username from "@/components/login-page/username";
import Password from "@/components/login-page/password";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isStepTwo, setIsStepTwo] = useState(false);
  const [isMount, setIsMount] = useState(false);
  const [userInformation, setUserInformation] = useState({
    username: "",
    phoneNumber: "",
    password: "",
  });

  useEffect(() => {
    setIsMount(true);
  }, []);

  const changeStep = (step, data) => {
    if (step === 1) {
      setIsStepTwo(false);
    } else if (step === 2) {
      const { username, phoneNumber } = data;
      setUserInformation({ ...userInformation, username, phoneNumber });
      setIsStepTwo(true);
    }
  };

  const submitPassword = async (data) => {
    setUserInformation({ ...userInformation, password: data.password });
    const { password } = data;
    const { username, phoneNumber } = userInformation;
    try {
      const res = await signIn("credentials", {
        username,
        phoneNumber,
        password,
        redirect: false,
        callbackUrl,
      });

      if (res.ok) {
        router.push(callbackUrl);
      } else {
        toast(
          <div className="border-gold text-gold w-full rounded-lg border p-3">
            اطلاعات وارد شده صحیح نمیباشند
          </div>,
          {
            style: {
              background: "transparent",
              padding: "0",
              border: "none",
            },
          },
        );
      }
    } catch (error) {
      toast(
        <div className="border-gold text-gold w-full rounded-lg border p-3">
          مشکلی پیش آمده است. لطفا مجددا تلاش فرمائید
        </div>,
        {
          style: {
            background: "transparent",
            padding: "0",
            border: "none",
          },
        },
      );
    }
  };

  if (!isMount) {
    return null;
  }

  return (
    <main className="overflow-hidden">
      <div className="bg-login-page dark:bg-login-page-dark flex h-screen w-screen scale-105 items-center justify-center bg-cover bg-center blur-md" />
      <div
        className="bg-login-page dark:bg-login-page-dark absolute left-1/2 top-1/2 h-[550px] w-5/6 -translate-x-1/2 -translate-y-1/2
        rounded-xl bg-cover bg-left md:w-3/4 md:bg-center"
      >
        <div
          className="text-gold absolute right-0 top-0 hidden h-full w-0 flex-col justify-between bg-transparent px-8
           pb-20 pt-10 md:flex md:w-7/12 lg:px-16"
        >
          <h2 className="animate-pulse text-3xl leading-none lg:mr-5 lg:text-4xl">
            پروژه تست
          </h2>
          <div className="mt-auto space-y-5 rounded-lg bg-transparent p-5">
            <h2 className="text-3xl leading-none lg:text-4xl">
              <span className="flex gap-x-2">خوش آمدید</span>
            </h2>
            <p className="text-justify text-base leading-7 lg:text-base lg:leading-8">
              برای استفاده از امکانات سایت لطفا اطلاعات کاربری خود را وارد
              نمایید
            </p>
          </div>
        </div>

        <div className="absolute left-0 top-0 h-full w-full overflow-x-hidden md:w-5/12">
          {/* step 1 */}
          <div
            className={`absolute flex h-full w-full flex-col items-center justify-center rounded-l-md bg-transparent
          text-white transition-all duration-300 md:backdrop-blur-sm ${
            isStepTwo ? "-translate-x-full" : "-translate-x-0 delay-300"
          }`}
          >
            <Username changeStep={changeStep} />
          </div>

          {/* step 2 */}
          <div
            className={`absolute flex h-full w-full flex-col items-center justify-center rounded-l-md bg-transparent text-white
            transition-all duration-300 md:backdrop-blur-sm ${
              isStepTwo ? "-translate-x-0 delay-300" : "-translate-x-full"
            }`}
          >
            <Password changeStep={changeStep} submitPassword={submitPassword} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
