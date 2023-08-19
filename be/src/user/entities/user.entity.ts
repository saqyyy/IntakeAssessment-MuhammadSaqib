import { PasswordUtils } from 'src/auth/utils/password-utils';
import { Role } from 'src/constants/role.enum';
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, CreateDateColumn, UpdateDateColumn, BeforeUpdate, AfterLoad } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true, length: 250 })
    email: string;

    @Column({ type: "varchar", select: false })
    password: string;

    @Column({ type: "varchar", length: 50, nullable: true })
    name: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.USER,
    })
    role: Role;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        this.password = await PasswordUtils.hashPassword(this.password);
    }

}
