export interface Board {
  id: String,
  title: string,
  description: string,
  status: BoardStatus,
}

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}