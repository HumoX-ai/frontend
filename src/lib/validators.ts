import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Foydalanuvchi nomi talab qilinadi" }),
  password: z
    .string()
    .min(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "Ism talab qilinadi" }),
  lastName: z.string().min(1, { message: "Familiya talab qilinadi" }),
  username: z.string().min(3, {
    message: "Foydalanuvchi nomi kamida 3 belgidan iborat bo'lishi kerak",
  }),
  password: z
    .string()
    .min(6, { message: "Parol kamida 6 belgidan iborat bo'lishi kerak" }),
  phone: z.string().regex(/^\+998\d{9}$/, {
    message: "Telefon raqami noto'g'ri formatda (+998xxxxxxxxx)",
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export const bookingSchema = z.object({
  date: z.date({
    required_error: "Sana tanlanishi kerak.",
    invalid_type_error: "Sana noto'g'ri formatda.",
  }),
  guestCount: z.coerce // stringni numberga o'tkazadi
    .number({
      required_error: "Mehmonlar soni kiritilishi kerak.",
      invalid_type_error: "Mehmonlar soni raqam bo'lishi kerak.",
    })
    .int({ message: "Mehmonlar soni butun son bo'lishi kerak." })
    .positive({ message: "Mehmonlar soni musbat bo'lishi kerak." }),
});

export type BookingFormValues = z.infer<typeof bookingSchema>;
