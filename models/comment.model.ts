import User from "./user.model";

export default interface Comment {
  id: string;
  parentId?: string;
  score: number;
  content: string;
  createdAt: Date;
  user: User;
  replyingTo?: User;
}
