interface SignInData {
  'user-email': string,
  'user-password': string,
}

interface Film {
  id: number,
  background_color: string,
  background_image: string,
  description: string,
  director: string,
  genre: string,
  is_favorite: boolean,
  name: string,
  poster_image: string,
  preview_image: string,
  preview_video_link: string,
  rating: number,
  released: number,
  run_time: number,
  scores_count: number,
  starring: string[],
  video_link: string,
}

interface accountData {
  id: number,
  email: string,
  name: string,
  avatar_url: string,
}

interface Review {
  id: number,
  user: {
    id: number,
    name: string,
  },
  rating: number,
  comment: string,
  date: string
}

export {Film, SignInData, accountData, Review}
