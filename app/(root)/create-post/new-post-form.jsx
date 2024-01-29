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
import { createPostSchema } from "@/lib/validations/create-post";
import { createPost } from "@/actions/create-post";
import { toast } from "sonner";
import SubmitButton from "@/components/login-page/submit-login-form";
import { routes } from "@/routes/routes";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allUsers } from "@/actions/data";
import { useEffect, useState } from "react";

const NewPostForm = () => {
  const router = useRouter();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function gerAllusers() {
      const usersData = await allUsers();
      setUsers(usersData);
    }
    gerAllusers();
  }, []);

  const form = useForm({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      title: "",
      description: "",
      authorId: "",
      authorName: "",
      image: null,
    },
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        if (value) {
          formData.append(key, value);
        }
      });
      const res = await createPost(formData);

      if (res.status === 200) {
        toast.success("پست ایجاد شد");
        router.push(routes.managementPosts);
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
        <h2 className="text-xl font-bold">افزودن پست</h2>
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 grid w-full grid-cols-3 gap-4"
          >
            <FormField
              control={control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عنوان</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete="off"
                      placeholder="عنوان"
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
              name="authorId"
              render={({ field }) => (
                <FormItem className="relative flex flex-col space-y-[18px]">
                  <FormLabel>کاربر</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? users.find((user) => user.id === field.value)
                                ?.fullName
                            : "انتخاب کاربر"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-72 p-0">
                      <Command>
                        <CommandInput placeholder="انتخاب کاربر" />
                        <CommandEmpty>کاربری یافت نشد</CommandEmpty>
                        <CommandGroup>
                          {users.map((user) => (
                            <CommandItem
                              value={user.id}
                              key={user.id}
                              onSelect={() => {
                                setValue("authorId", user.id);
                                setValue("authorName", user.fullName);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  user.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                              {user.fullName}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage className="text-gold" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="image"
              render={({ field: { value, ...fieldValues } }) => (
                <FormItem>
                  <FormLabel>انتخاب تصویر</FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...fieldValues}
                      type="file"
                      accept="image/*"
                      className="file:dark:text-white"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        fieldValues.onChange(file);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-gold" />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem className="col-span-3">
                  <FormLabel>توضیحات</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="توضیحات"
                      className="h-32 resize-none focus-visible:ring-gold"
                      {...field}
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

export default NewPostForm;
