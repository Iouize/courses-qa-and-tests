import { HttpBadRequest, HttpForbidden } from "@httpx/exception";
import { z } from "zod";
import { createAccountInRepository, getAccountsInRepository, deleteAccountInRepository } from "./account.repository";

const AccountSchema = z.object({
  userId: z.number().int().positive(),
  amount: z.number().default(0),
});

export async function createAccount(data) {
  const result = AccountSchema.safeParse(data);

  if (result.success) {
    return createAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }
}

export async function getAccounts(data) {
  const result = z.object({
    userId: z.number().int().positive(),
  }).safeParse(data);

  if (result.success) {
    return getAccountsInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }

}

export async function deleteAccount(data) {
  const result = z.object({
    userId: z.number().int().positive(),
    id: z.number().int().positive(),
  }).safeParse(data);

  if (result.success) {
    return deleteAccountInRepository(result.data);
  } else {
    throw new HttpBadRequest(result.error);
  }

}
