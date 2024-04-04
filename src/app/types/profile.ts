
export type Profile = {
  id: string;
  photoURL: string | null;
  displayName: string | null;
  description: string;
  createdAt: string;
}

export type Photo = {
  id: string;
  name: string;
  url: string;
}