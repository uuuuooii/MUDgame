import { BoardStatus } from './board-status.enum';
import { Board } from '../adapters/model/board.entity';
import { User } from '../../auth/user.entity';
import { IBoardService } from './inboundPorts/IBoardService';
import { IBoardRepository } from './outboundPorts/IBoardRepository';
import { CreateBoardDto } from './dto/create-board.dto';
export declare class BoardsService implements IBoardService {
    private boardReposity;
    constructor(boardReposity: IBoardRepository);
    getBoardById(id: number): Promise<Board>;
    getAllBoards(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoard(id: number, user: User): Promise<void>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
