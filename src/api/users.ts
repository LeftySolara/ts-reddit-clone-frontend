import { AxiosError, AxiosResponse } from "axios";
import axiosClient from "@api/axiosClient";

/**
 * Send a POST request to create a new user.
 *
 * @param {string} emailAddress The user's email address.
 * @param {string} username The user's username.
 * @param {string} password The user's password.
 *
 * @returns A promise containing response data.
 */
const createUser = async (
  emailAddress: string,
  username: string,
  password: string
): Promise<AxiosResponse | undefined> => {
  let response;
  try {
    response = await axiosClient.post("/users", {
      emailAddress,
      username,
      password,
    });
  } catch (err: unknown) {
    if (err instanceof AxiosError) {
      response = err.response;
    }
  }

  return response;
};

export { createUser };
