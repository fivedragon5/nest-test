import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model'
import { v1 as uuid } from 'uuid'
import { CreateBoardDto } from './dto/create-board.dto'

@Injectable()
export class BoardsService {
  private boards: Board[] = []
  
  getAllBoards(): Board[] {
    return this.boards
  }

  createBoard(createBoardDto: CreateBoardDto) {
    const {
      title,
      description
    } = createBoardDto

    const board: Board = {
      id: uuid(),
      title,
      description,
      status: BoardStatus.PUBLIC,
    }

    //만든 board를 boards에 push
    this.boards.push(board)
    return board

    //대체 가능
    // const board = {
    //   title: title,
    //   description: description,
    //   status: BoardStatus.PUBLIC,
    // }
  }

  getBoardById(id: string): Board {
    const found = this.boards.find((board) => board.id === id)

    //조회결과가 없을경우 Error 처리
    //if(!found) throw new NotFoundException
    if(!found) throw new NotFoundException(`Can't find Board with id ${id}`)

    return found
  }

  deleteBoard(id: string): void {
    const found = this.getBoardById(id)
    this.boards = this.boards.filter((board) => board.id !== id)
  }

  updateBoardStatus(id: string, status: BoardStatus): Board {
    const board = this.getBoardById(id)
    board.status = status
    return board
    
  }

}
