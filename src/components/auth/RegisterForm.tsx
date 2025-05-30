/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerSchema, type RegisterFormValues } from "@/lib/validators";
import { useRegisterUserMutation } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"; // Yoki siz ishlatayotgan toast kutubxonasi

export function RegisterForm() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      phone: "+998",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      const result = await registerUser(values).unwrap();
      // TODO: Tokenni saqlash (localStorage, Redux store)
      console.log("Registration successful:", result);
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!", {
        style: {
          backgroundColor: "#4caf50", // Yashil rang
          color: "#fff",
          border: "1px solid #388e3c", // Yashil rang
        },
      });
      navigate("/login"); // Login sahifasiga yo'naltirish
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Ro'yxatdan o'tishda xatolik. Ma'lumotlarni tekshiring.", {
        description: (error as any).data?.message || "Xatolik yuz berdi",
        style: {
          backgroundColor: "#f87171", // Tailwind 'red-400'
          color: "#fff",
          border: "1px solid #ef4444", // Tailwind 'red-500'
        },
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-8">
      <div className="w-full max-w-lg p-8 space-y-6 bg-card shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Ro'yxatdan o'tish</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ism</FormLabel>
                    <FormControl>
                      <Input placeholder="Ismingiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Familiya</FormLabel>
                    <FormControl>
                      <Input placeholder="Familiyangiz" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Foydalanuvchi nomi</FormLabel>
                  <FormControl>
                    <Input placeholder="Foydalanuvchi nomingiz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parol</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Parolingiz"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefon raqami</FormLabel>
                  <FormControl>
                    <Input placeholder="+998xxxxxxxxx" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Ro'yxatdan o'tilmoqda..." : "Ro'yxatdan o'tish"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
