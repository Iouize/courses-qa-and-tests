import { sql } from "../../../infrastructure/db";

export async function createUserInRepository({ userId, amount }) {
  const accounts = await sql`
    INSERT INTO accounts (userId, amount)
    VALUES (${userId}, ${amount})
    RETURNING *
    `;

  return accounts[0];
}

export async function getAccountsInRepository({userId}) {
  const accounts = await sql`
    SELECT * FROM accounts
    WHERE userId = ${userId}
    `;

  return accounts;
}

export async function deleteAccountInRepository({ userId, id }) {
  const accounts = await sql`
    DELETE FROM accounts
    WHERE userId = ${userId} AND id = ${id}
    RETURNING *
    `;

  return accounts[0];
}
