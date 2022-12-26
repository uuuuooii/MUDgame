import { BoardStatus } from '../../../domain/boards/board-status.enum';
import { CreateBoardDto } from '../../../domain/boards/dto/create-board.dto';
import { User } from '../../../domain/entity/user.entity';
import { Board } from 'src/domain/entity/board.entity';
import { BoardsService } from 'src/domain/boards/boards.service';
export declare class BoardsController {
    private boardsService;
    private logger;
    constructor(boardsService: BoardsService);
    getBoardById(id: number): Promise<Board>;
    getAllBoards(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
