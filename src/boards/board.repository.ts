import { EntityRepository, Repository } from "typeorm";
import { Board } from "./board.entity";
import { BoardStatus } from "./board.status.enum";
import { CreateBoardDto } from "./dto/create-board.dto";

//EntityRepository를 대체할 수 있게 예정
@EntityRepository(Board)
export class boardRepository extends Repository<Board> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const {title, description} = createBoardDto

    const board = this.create({
      title,
      description,
      status: BoardStatus.PUBLIC
    })

    await this.save(board)
    return board
  }
}