import { User } from '../../../auth/user.entity';
import { BoardStatus } from '../../domain/board-status.enum';
export declare class Board {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
    user: User;
}
