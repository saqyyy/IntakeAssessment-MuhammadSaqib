import { ExpenseStatus } from 'src/constants/status.enum';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, AfterLoad } from 'typeorm';

@Entity('expenses')
export class Expense {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 250 })
    name: string;

    @Column({ type: 'varchar', nullable: true })
    picture: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({
        type: 'enum',
        enum: ExpenseStatus,
        default: ExpenseStatus.PENDING,
    })
    status: ExpenseStatus;

    @Column({ type: "int" })
    userId: number;

    @ManyToOne(() => User, (user) => user.id, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({ name: "userId" })
    consultant: User

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @AfterLoad()
    async attachments() {
        if (this.picture) {
            this.picture = process.env.BACKEND_DOMAIN+"/image/"+this.picture
        }
    }
}
