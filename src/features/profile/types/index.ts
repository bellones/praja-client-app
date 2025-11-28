export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  clubStatus?: {
    hasClub: boolean;
    clubName?: string;
  };
  phone?: string;
  document?: string;
  dateOfBirth?: string;
  role: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  clubStatus?: {
    hasClub: boolean;
    clubName?: string;
  };
  phone?: string;
  document?: string;
  dateOfBirth?: string;
  role: string;
}

export interface ProfileMenuItem {
  id: string;
  label: string;
  icon: string;
  badge?: number;
  onPress: () => void;
}





