import { afterEach, assert, describe, expect, it, vi } from "vitest";
import {createAccount, getAccounts, deleteAccount} from "./account.service.js";
import { createAccountInRepository, getAccountsInRepository, deleteAccountInRepository } from "./account.repository.js";

vi.mock("./account.repository", async (importOriginal) => ({
  ...(await importOriginal()),
  createAccountInRepository: vi.fn((data) => {
    return {
      id : 5,
      userId: data.userId,
      amount: data.amount,
    };
  }),
  getAccountsInRepository: vi.fn((data) => {
    return [{ id : 6, userId: data.userId, amount: 360 }];
  }),
  deleteAccountInRepository: vi.fn((data) => {
    return {
      id : data.id,
      userId: data.userId,
    };
  }),
}));

describe("Account Service", () => {
  afterEach(() => vi.clearAllMocks());
  it("should create an account", async () => {
    const account = await createAccount({
      userId: 5,
      amount: 360,
    });

    expect(account).toBeDefined();
    expect(account.id).toBeDefined();
    expect(account.id).toBeTypeOf("number");
    expect(account.amount).toBeDefined();
    expect(account.amount).toBeTypeOf("number");
    expect(createAccountInRepository).toHaveBeenCalledTimes(1);
    expect(createAccountInRepository).toHaveBeenCalledWith({
      userId: 5,
      amount: 360,
    });
  });

  it("should trigger a bad request error when account creation", async () => {
    try {
      await createAccount({
        userId: "8",
      });
      assert.fail("createAccount should have thrown an error");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");
      expect(e.statusCode).toBe(400);
    }
  });

  it("should get all accounts", async () => {
    const accounts = await getAccounts({
      userId : 5
    });

    const account = accounts[0];

    expect(accounts).toBeDefined();
    expect(accounts.length).toBe(1);
    expect(accounts).toBeTypeOf("object");

    expect(account).toBeDefined();
    expect(account).toBeTypeOf("object");
    expect(account.id).toBeDefined();
    expect(account.id).toBeTypeOf("number");
    expect(account.userId).toBeDefined();
    expect(account.userId).toBeTypeOf("number");
    expect(account.amount).toBeDefined();
    expect(account.amount).toBeTypeOf("number");

    expect(getAccountsInRepository).toHaveBeenCalledTimes(1);
    expect(getAccountsInRepository).toHaveBeenCalledWith({
      userId: 5,
    });
  });

  it("should trigger an error in getting accounts when given wrong user id", async () => {
    try {
      await getAccounts({
        userId: -5,
      });
      assert.fail("getAccounts should have thrown an error");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");
      expect(e.statusCode).toBe(400);
    }
  });

  it("should delete an account", async () => {
    const account = await deleteAccount({
      userId: 5,
      id: 6,
    });

    expect(account).toBeDefined();
    expect(account.id).toBeDefined();
    expect(account.id).toBeTypeOf("number");
    expect(account.userId).toBeDefined();
    expect(account.userId).toBeTypeOf("number");
    expect(deleteAccountInRepository).toHaveBeenCalledTimes(1);
    expect(deleteAccountInRepository).toHaveBeenCalledWith({
      userId: 5,
      id: 6,
    });

  });

  it("should trigger an error in account deletion when given wrong account id", async () => {
    try {
      await deleteAccount({
        userId: 5,
        id: -2,
      });
      assert.fail("deleteAccount should have thrown an error");
    } catch (e) {
      expect(e.name).toBe("HttpBadRequest");
      expect(e.statusCode).toBe(400);
    }
  });





});
