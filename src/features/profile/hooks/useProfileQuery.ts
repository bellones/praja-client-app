import { useQuery } from '@tanstack/react-query';
import { profileService } from '../../../services/api/profileService';
import { Profile } from '../types';

export const useProfileQuery = () => {
  return useQuery<Profile>({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await profileService.getProfile();
      return response as Profile;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};




