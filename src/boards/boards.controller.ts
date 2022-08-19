import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { BoardsService } from './boards.service'
import { BoardStatus } from './board.status.enum'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe'
import { Board } from './board.entity'

@Controller('boards')
export class BoardsController {
  constructor(private boardService: BoardsService) {}

  @Get()
  getAllBoard(): Promise<Board[]> {
    return this.boardService.getAllBoards()
  }

  @Get('/:id')
  getBoardId(@Param('id')id: number): Promise<Board> {
    return this.boardService.getBoardByid(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return await this.boardService.createBoard(createBoardDto)
  }

  @Delete('/:id')
  async deleteBoard(@Param('id', ParseIntPipe) id): Promise<void> {
    return this.boardService.deleteBoard(id)
  }

  @Patch('/:id/status')
  updateBoardStatus(
    @Param('id') id: number,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus
  ) {
    return this.boardService.updateBoardStatus(id, status)
  }
}
