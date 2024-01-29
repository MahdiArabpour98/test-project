"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createUserSchema } from "@/lib/validations/create-user";
import { createUser } from "@/actions/create-user";
import { toast } from "sonner";
import SubmitButton from "@/components/login-page/submit-login-form";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";

const NewUserForm = () => {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      nationalCode: "",
    },
  });

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      const res = await createUser(values);

      if (res.status === 200) {
        toast.success("کاربر ایجاد شد");
        router.push(routes.dashboard);
      } else if (res.status === 403) {
        toast.error("دسترسی غیر مجاز");
      } else if (res.status === 400) {
        toast.error("مشکلی پیش آمده است.لطفا مجددا تلاش فرمایید");
      }
    } catch (error) {
      toast.error("مشکلی پیش آمده است.لطفا مجددا تلاش فرمایید");
    }
  };

  return (
    <main>
      <div>
        <h2 className="text-xl font-bold">افزودن کاربر</h2>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 grid w-full grid-cols-3 gap-4"
          >
            <FormField
              control={control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>نام و نام خانوادگی</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="نام و نام خانوادگی"
                      {...field}
                      className="focus-visible:ring-gold"
                    />
                  </FormControl>
                  <FormMessage className="text-gold" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phoneNumber"
              type="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>شماره تماس</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="شماره تماس"
                      {...field}
                      className="focus-visible:ring-gold"
                    />
                  </FormControl>
                  <FormMessage className="text-gold" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="nationalCode"
              type="number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>کد ملی</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="کد ملی"
                      {...field}
                      className="focus-visible:ring-gold"
                    />
                  </FormControl>
                  <FormMessage className="text-gold" />
                </FormItem>
              )}
            />
            <div className="col-span-3">
              <SubmitButton
                className="w-fit border-gold text-gold outline-gold duration-200"
                loading={isSubmitting}
              >
                ارسال
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default NewUserForm;
