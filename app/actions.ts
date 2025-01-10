"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

// Helper function to create a URL with status and message parameters
const createRedirectURL = (status: "success" | "error", path: string, message: string) => {
  const params = new URLSearchParams({
    status,
    message,
  });
  return `${path}?${params.toString()}`;
};

export const signUpAction = async (formData: FormData) => {
  const full_name = formData.get('full_name')?.toString()
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  if (!email || !password) {
    return redirect(createRedirectURL(
      "error",
      "/sign-up",
      "Email and password are required"
    ));
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        full_name,
      },
    },
  });

  if (error) {
    console.error(error.code + " " + error.message);
    return redirect(createRedirectURL("error", "/sign-up", error.message));
  }

  return redirect(createRedirectURL(
    "success",
    "/sign-up",
    "Thanks for signing up! Please check your email for a verification link."
  ));
};

export const signInAction = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();
  
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (authError) {
    return redirect(createRedirectURL("error", "/sign-in", authError.message));
  }

  const { data: userData, error: userError } = await supabase
    .from('users')
    .select('is_Admin')
    .eq('id', authData.user.id)
    .single();

  if (userError) {
    return redirect(createRedirectURL("error", "/sign-in", "Failed to fetch user role"));
  }

  // For admin/user redirects, we'll show a success message before redirecting
  const redirectPath = userData.is_Admin ? "/admin" : "/user";
  return redirect(createRedirectURL("success", redirectPath, "Successfully signed in"));
};

export const forgotPasswordAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString();
  const supabase = await createClient();
  const origin = (await headers()).get("origin");
  const callbackUrl = formData.get("callbackUrl")?.toString();

  if (!email) {
    return redirect(createRedirectURL("error", "/forgot-password", "Email is required"));
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/auth/callback?redirect_to=/protected/reset-password`,
  });

  if (error) {
    console.error(error.message);
    return redirect(createRedirectURL("error", "/forgot-password", "Could not reset password"));
  }

  const redirectUrl = callbackUrl || "/forgot-password";
  return redirect(createRedirectURL(
    "success",
    redirectUrl,
    "Check your email for a link to reset your password."
  ));
};

export const resetPasswordAction = async (formData: FormData) => {
  const supabase = await createClient();

  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !confirmPassword) {
    return redirect(createRedirectURL(
      "error",
      "/protected/reset-password",
      "Password and confirm password are required"
    ));
  }

  if (password !== confirmPassword) {
    return redirect(createRedirectURL(
      "error",
      "/protected/reset-password",
      "Passwords do not match"
    ));
  }

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return redirect(createRedirectURL(
      "error",
      "/protected/reset-password",
      "Password update failed"
    ));
  }

  return redirect(createRedirectURL(
    "success",
    "/protected/reset-password",
    "Password updated successfully"
  ));
};

export const signOutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return redirect(createRedirectURL("success", "/sign-in", "Successfully signed out"));
};