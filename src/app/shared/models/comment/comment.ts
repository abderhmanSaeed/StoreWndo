import { User } from "src/app/modules/auth/models/user/user"

export interface Comment {
   id: number,
   user?: User,
   likes?: number,
   message?: string,
   isMine?: boolean
   isLike?: boolean,
   productId?: string,
   isReported?: boolean,
   commentReplies: any[],
   creationTime?: string,
}
