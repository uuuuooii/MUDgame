import { BoardStatus } from './board-status.enum';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from '../entity/board.entity';
import { User } from '../entity/user.entity';
import { IBoardRepository, IBoardService } from '../../ports/board.interface';
export declare class BoardsService implements IBoardService {
    private boardReposity;
    constructor(boardReposity: IBoardRepository);
    getBoardById(id: number): Promise<Board>;
    getAllBoards(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
