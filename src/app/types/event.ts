export type AppEvent = {
  id: string;
  title: string;
  category: string;
  description: string;
  city: string;
  venue: string;
  date: string;
  hostedBy: string;
  hostPhotoURL: string;
  attendees: Attendee[];
  isCancelled: boolean;
};

export type Attendee = {
  id: string;
  name: string;
  photoURL: string;
};
