export default interface NewsCommentType {
  id: string;
  content: string;
  userId: string;
  newsId: string;
  createdAt: Date | string;
}
