import { User } from '../../../auth/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BoardStatus } from '../../domain/board-status.enum';
import { Board } from '../model/board.entity';
import { IBoardRepository } from 'src/board/domain/outboundPorts/IBoardRepository';
import { CreateBoardDto } from 'src/board/domain/dto/create-board.dto';
export declare class BoardRepository implements IBoardRepository {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
    findBoardById(id: number): Promise<Board>;
    findAllBoardsByUserId(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoardById(id: number, user: User): Promise<DeleteResult>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
