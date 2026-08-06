import axiosClient from "./axiosClient";
import type { ApiSuccess } from "../types/api.types";
import type { User } from "../types/user.types";
import type { LoginInput, RegisterInput } from "../schemas/auth.schema";

type AuthPayload = {
  user: User;
  accessToken: string;
};

export async function register(data: RegisterInput) {
  const res = await axiosClient.post<ApiSuccess<AuthPayload>>(
    "/auth/register",
    data,
  );
  return res.data;
}

export async function login(data: LoginInput) {
  const res = await axiosClient.post<ApiSuccess<AuthPayload>>(
    "/auth/login",
    data,
  );
  return res.data;
}

export async function refresh() {
  const res = await axiosClient.post<ApiSuccess<AuthPayload>>("/auth/refresh");
  return res.data;
}

export async function logout() {
  const res =
    await axiosClient.post<ApiSuccess<{ message: string }>>("/auth/logout");
  return res.data;
}

export async function getMe() {
  const res = await axiosClient.get<ApiSuccess<User>>("/auth/me");
  return res.data;
}
