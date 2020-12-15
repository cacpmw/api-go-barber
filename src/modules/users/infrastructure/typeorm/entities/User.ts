import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import multerConfig from '@config/multerconfig';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    avatar: string;

    @Expose({ name: 'avatarUrl' })
    getAvatarUrl(): string | null {
        if (!this.avatar) {
            return null;
        }
        switch (multerConfig.driver) {
            case 'disk':
                return `${process.env.APP_API_URL}/files/${this.avatar}`;
            case 's3':
                return `https://${process.env.AWS_BUCKET}.s3-sa-east-1.amazonaws.com/${this.avatar}`;
            default:
                return null;
        }
    }

    @Column()
    @Exclude()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default User;
