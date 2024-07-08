export default interface UserType {
  uid: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  isAdmin?: boolean;
  photoURL: string | null;
  acceptedToReceivePromotions: boolean;
  createdAt: string;
}
