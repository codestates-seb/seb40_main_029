export interface BookItemType {
  name: string;
  url: string;
}
export interface BookmarkState {
  booksArr: BookItemType[];
  setBookmarkArr: React.Dispatch<React.SetStateAction<BookItemType[]>>;
}
export interface BookmarkProps extends BookmarkState {
  book?: BookItemType;
}
