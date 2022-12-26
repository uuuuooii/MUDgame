import { User } from '../entity/user.entity';
import { BoardStatus } from '../boards/board-status.enum';
export declare class Board {
    id: number;
    title: string;
    description: string;
    status: BoardStatus;
    user: User;
}
