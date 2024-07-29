import crypto from "crypto"

export class PasswordHasher {
    static async GenerateSalt(): Promise<string> {
        return  crypto.randomBytes(16).toString("hex")
    }

    static async Hash(password: string, salt: string): Promise<string> {
        return crypto.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex")
    }
}