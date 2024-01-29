import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { passwordSchema } from "@/lib/validations/login-form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock } from "lucide-react";
import SubmitButton from "./submit-login-form";

const Password = ({ changeStep, submitPassword }) => {
  const form = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = form;

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(submitPassword)}
        className="mt-28 w-5/6 md:mt-0"
      >
        <h2 className="text-center text-3xl">رمز ورود</h2>

        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem
              dir="ltr"
              className="relative mx-0 mt-7 h-[30px] w-full border-b-2 border-white md:border-b"
            >
              <span className="absolute -top-1 right-0 text-lg">
                <Lock />
              </span>
              <FormControl>
                <Input
                  type="password"
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
                رمز ورود
              </FormLabel>
              <FormMessage className="text-gold" />
            </FormItem>
          )}
        />

        <div
          className={cn("my-3 flex justify-center", errors.password && "mt-11")}
        >
          <Button
            type="button"
            onClick={() => changeStep(1, null)}
            className="h-fit space-y-0 bg-transparent p-0 transition-all duration-200 hover:scale-105 hover:bg-transparent dark:text-white"
          >
            تغییر مشخصات کاربری
          </Button>
        </div>

        <SubmitButton loading={isSubmitting}>ورود</SubmitButton>
      </form>
    </Form>
  );
};

export default Password;
