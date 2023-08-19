import * as bcrypt from 'bcrypt';

export class PasswordUtils {
    static async hashPassword(password: string): Promise<string> {

        const saltOrRounds = 10;
        const hash = await bcrypt.hash(password, saltOrRounds);
        return hash
    }
    static async comparePasswords(passwordEntered: string, password: string): Promise<Boolean> {
        const res = await bcrypt.compare(passwordEntered, password)
        return res
    }

}
