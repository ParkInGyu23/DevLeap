export interface formPops {
  title: string;
  category: "Travel" | "Food" | "Life" | "";
  username: string;
  thumbnail: string;
  desc: string;
}

export interface Post {
  id: number;
  title: string;
  category: string;
  author: string;
  username: string;
  thumbnail: string;
  desc: string;
  regdate: Date;
}
