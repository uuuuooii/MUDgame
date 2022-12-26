import { BoardStatus } from '../../domain/board-status.enum';
import { User } from '../../../auth/user.entity';
import { Board } from 'src/board/adapters/model/board.entity';
import { CreateBoardDto } from 'src/board/domain/dto/create-board.dto';
import { IBoardService } from 'src/board/domain/inboundPorts/IBoardService';
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: IBoardService);
    getBoardById(id: number): Promise<Board>;
    getAllBoards(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
