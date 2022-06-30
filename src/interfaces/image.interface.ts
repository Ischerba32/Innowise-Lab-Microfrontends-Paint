export default interface Image {
  date: string;
  image: string;
  userId: string;
  userEmail: string | null;
  imageId: string;
}
export interface ImageState {
  isLoading: boolean;
  images: Image[];
  error?: string;
}

export interface SaveImageParams {
  blob: Blob;
  imageId: string;
  uid: string;
  email: string | null;
}
