export interface User {
  id: number,
  displayName: string
}

export interface Comment {
  id: number,
  parentCommentId: number | null,
  ownerId: number,
  txt: string,
  createdAt: string,
  deletedAt: string | null
  children?: Comment[] | null
}
