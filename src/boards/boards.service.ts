import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './board.status.enum'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto'
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BoardsService {
  
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>
  ) {}

  async getBoardByid(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({
      where: {id: id},
    })

    if(!found) throw new NotFoundException(`Can't find Board with id : ${id}`)

    return found
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    const {title, description} = createBoardDto

    const board = this.boardRepository.create({
      title,
      description,
      status: BoardStatus.PUBLIC,
    })
    
    await this.boardRepository.save(board)

    return board
  }

  async deleteBoard(id: number): Promise<void> {
    const result = await this.boardRepository.delete(id)
    console.log('result', result)
    //delete시 id값이 없어 삭제가 안된경우 affected값이 0으로 반환
    if(result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`)
    }
  }

  async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
    const board = await this.getBoardByid(id)

    board.status = status

    await this.boardRepository.save(board)

    return board
  }

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find()
  }

}
