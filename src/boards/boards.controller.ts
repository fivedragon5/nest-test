import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus } from './board.status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { NotFoundError } from 'rxjs'

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get('/:id')
  async getBoardId(@Param('id')id: number) {
    const found = await this.boardService.findOne(id)

    if(!found) throw new NotFoundException(`Can't not find Board id : ${id}`)

    return found
  }
}
