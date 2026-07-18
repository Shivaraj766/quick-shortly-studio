"use server";

import { createClient } from "@/lib/supabase/server";

export async function signUpWithPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signInWithPassword(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  if (!email || !password) {
    return { error: "Email and password are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function sendLoginOtp(formData: FormData) {
  const email = formData.get("email") as string;
  
  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: false, // DO NOT allow new users via login
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function sendSignupOtp(formData: FormData) {
  const email = formData.get("email") as string;
  const name = formData.get("name") as string;
  
  if (!email) {
    return { error: "Email is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true, // Allow user creation for signup
      data: name ? { full_name: name } : undefined,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function updateUserPassword(formData: FormData) {
  const password = formData.get("password") as string;

  if (!password) {
    return { error: "Password is required." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function verifyEmailOtp(formData: FormData) {
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  
  if (!email || !token) {
    return { error: "Email and OTP token are required." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.verifyOtp({
    email,
    token,
    type: "email",
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return { success: true };
}
