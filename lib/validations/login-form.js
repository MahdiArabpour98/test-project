import { z } from "zod";

export const usernameSchema = z.object({
  username: z.string().min(3, "نام کاربری الزامی میباشد"),
  phoneNumber: z
    .string()
    .startsWith("09", "شماره تماس صحیح نمیباشد")
    .min(11, "شماره تماس باید ۱۱ رقم باشد")
    .max(11, "شماره تماس باید ۱۱ رقم باشد"),
});

export const passwordSchema = z.object({
  password: z.string().min(4, "رمز ورود حداقل ۴ حرف میباشد"),
});
