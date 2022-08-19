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

  async findOne(id: number): Promise<Board> {
    return await this.boardRepository.findOne({
      where: {id: id},
    })
  }
}
