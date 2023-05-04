import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getPoint } from '../api/GetPointApi';

const useUpdatePoint = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(getPoint, {
    onSuccess: () => {
      queryClient.invalidateQueries(['point']);
    },
  });

  const updatePoint = (memberId: number) => mutate(memberId);

  return updatePoint;
};

export default useUpdatePoint;
