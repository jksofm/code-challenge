import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { RequestData } from '../models';
import { API_URL } from '../constants';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const appService = {
  useGetRequest: (
    pagination: RequestData,
    options?: SWRConfiguration<any, any, (arg: string) => any>
  ) => {
    const response = useSWR(
      `${API_URL}?page=${pagination.currentPage}&limit=${pagination.limit}`,
      fetcher,
      options
    );

    return {
      ...response,
    };
  },
};
