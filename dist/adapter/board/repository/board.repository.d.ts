import { User } from '../../../domain/entity/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import { BoardStatus } from '../../../domain/boards/board-status.enum';
import { Board } from '../../../domain/entity/board.entity';
import { CreateBoardDto } from '../../../domain/boards/dto/create-board.dto';
import { IBoardRepository } from 'src/ports/board.interface';
export declare class BoardRepository implements IBoardRepository {
    private boardRepository;
    constructor(boardRepository: Repository<Board>);
    findBoardById(id: number): Promise<Board>;
    findAllBoardsByUserId(user: User): Promise<Board[]>;
    createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board>;
    deleteBoardById(id: number, user: User): Promise<DeleteResult>;
    updateBoardStatus(id: number, status: BoardStatus): Promise<Board>;
}
