import bcrypt from "bcrypt";

export async function hashPassword(password: string) {
  const salt = 10;

  const hashPassword = await bcrypt.hash(password, salt);

  return hashPassword;
}
