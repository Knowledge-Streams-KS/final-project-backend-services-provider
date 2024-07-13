import crypto from "crypto";

const obfuscateId = (id) => {
  const cipher = crypto.createCipher(
    "aes-256-cbc",
    process.env.OBFUSCATION_KEY
  );
  let encrypted = cipher.update(id, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
};

export { obfuscateId };
