import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, UserRound } from "lucide-react";
import SubmitButton from "./submit-login-form";
import { usernameSchema } from "@/lib/validations/login-form";
import { cn } from "@/lib/utils";
import { findUserByUsername } from "@/actions/auth";
import { toast } from "sonner";

const Username = ({ changeStep }) => {
  const form = useForm({
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: "",
      phoneNumber: "",
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { isSubmitting, errors },
  } = form;

  const usernameSubmit = async (values) => {
    try {
      const user = await findUserByUsername(values);
      if (user.status === 200) {
        changeStep(2, user.data);
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

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(usernameSubmit)}
        className="mt-28 w-5/6 md:mt-0"
      >
        <h2 className="text-center text-3xl">نام کاربری و شماره تماس</h2>

        <FormField
          control={control}
          name="username"
          render={({ field }) => (
            <FormItem
              dir="ltr"
              className="relative mx-0 my-7 h-[30px] w-full border-b-2 border-white md:border-b"
            >
              <span className="absolute -top-1 right-0 text-lg">
                <UserRound />
              </span>
              <FormControl>
                <Input
                  autoComplete="off"
                  placeholder=" "
                  {...field}
                  className="peer h-full w-full border-none bg-transparent py-0 pl-0 pr-7
                  text-base font-medium text-white outline-none [appearance:textfield] focus:outline-none
                  focus-visible:border-none focus-visible:outline-none focus-visible:ring-0
                  focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </FormControl>
              <FormLabel
                className="pointer-events-none absolute left-0 -translate-y-[62px] text-base font-medium transition-all
                duration-300 peer-placeholder-shown:-translate-y-10 peer-focus:-translate-y-[62px]"
              >
                نام کاربری
              </FormLabel>
              <FormMessage className="text-gold" />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem
              dir="ltr"
              className={cn(
                "relative mx-0 my-8 h-[30px] w-full border-b-2 border-white md:border-b",
                errors.username && "mt-14",
              )}
            >
              <span className="absolute -top-1 right-0 text-lg">
                <Phone />
              </span>
              <FormControl>
                <Input
                  type="number"
                  autoComplete="off"
                  placeholder=" "
                  {...field}
                  className="peer h-full w-full border-none bg-transparent py-0 pl-0 pr-7 text-base
                  font-medium text-white outline-none [appearance:textfield] focus:outline-none
                  focus-visible:border-none focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0
                  [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
              </FormControl>
              <FormLabel
                className="pointer-events-none absolute left-0 -translate-y-[62px] text-base font-medium transition-all
                duration-300 peer-placeholder-shown:-translate-y-10 peer-focus:-translate-y-[62px]"
              >
                شماره تماس
              </FormLabel>
              <FormMessage className="text-gold" />
            </FormItem>
          )}
        />

        <SubmitButton
          loading={isSubmitting}
          className={cn(errors.phoneNumber && "mt-11")}
        >
          ارسال
        </SubmitButton>
      </form>
    </Form>
  );
};

export default Username;
