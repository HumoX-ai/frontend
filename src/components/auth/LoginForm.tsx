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
import { loginSchema, type LoginFormValues } from "@/lib/validators";
import { useLoginUserMutation } from "@/store/api/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useDispatch } from "react-redux"; // useDispatch ni import qilamiz
import { setCredentials } from "@/store/slices/authSlice"; // setCredentials actionini import qilamiz

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // useDispatch hookini ishlatamiz
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    try {
      const result = await loginUser(values).unwrap();
      dispatch(
        setCredentials({ user: result.user, token: result.access_token })
      ); // Foydalanuvchi ma'lumotlari va tokenini store ga saqlaymiz
      toast.success("Muvaffaqiyatli kirdingiz!", {
        style: {
          backgroundColor: "#4caf50", // Yashil rang
          color: "#fff",
          border: "1px solid #388e3c", // Yashil rang
        },
      });
      navigate("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      toast.error("Login qilishda xatolik. Ma'lumotlarni tekshiring.", {
        description: error.data?.message || "Xatolik yuz berdi",
        style: {
          backgroundColor: "#f87171",
          color: "#fff",
          border: "1px solid #ef4444",
        },
      });
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 space-y-6 bg-card shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center">Kirish</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Kirilmoqda..." : "Kirish"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
