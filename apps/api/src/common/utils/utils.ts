import * as bcrypt from "bcrypt";

export async function hashAText(plainText: string) {
  return await bcrypt.hash(plainText, 10);
}

export async function compareHashAndText(hashedText: string, text: string) {
  return await bcrypt.compare(hashedText, text);
}
