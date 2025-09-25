import { afterAll, afterEach, describe, expect, it, vi } from "vitest";
import { createUser } from "./user.service.js";
import { createUserInRepository } from "./user.repository.js";

vi.mock("./user.repository", async (importOriginal) => ({
  ...(await importOriginal()),
  createUserInRepository: vi.fn((data) => {
    return {
      id: 4,
      name: data.name,
      birthday: data.birthday,
    };
  }),
}));

describe("User Service", () => {
  afterEach(() => vi.clearAllMocks());
  it("should create an user", async () => {
    const user = await createUser({
      name: "John Doe",
      birthday: new Date(1990,1,1),
    });

    expect(user).toBeDefined();
    expect(user.id).toBeDefined();
    expect(user.id).toBeTypeOf("number");
    expect(user).toHaveProperty("name", "John Doe");
    expect(user.birthday).toBeDefined();
    expect(user.birthday).toBeInstanceOf(Date);
    expect(user.birthday.getFullYear()).toBe(1990);
    expect(user.birthday.getMonth()).toBe(1);
    expect(createUserInRepository).toHaveBeenCalledTimes(1);
    expect(createUserInRepository).toHaveBeenCalledWith({
      name: "John Doe",
      birthday: new Date(1990,1,1),
    });
  });
});
