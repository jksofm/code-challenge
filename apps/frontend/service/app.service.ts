/* eslint-disable */
import useSWR, { SWRConfiguration } from 'swr';
import { API_URL } from '../constants';
import { ApiResponse, RequestData } from '@repo/models';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const appService = {
  useGetRequest: (
    pagination: RequestData,

    options?: SWRConfiguration<any, any, (arg: string) => any>
  ) => {
    const response = useSWR<ApiResponse>(
      `${API_URL}?page=${pagination.currentPage}&limit=${pagination.limit}`,
      fetcher,
      options
    );

    return {
      ...response,
    };
  },
};
