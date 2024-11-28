import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextPageWithLayout } from './_app';
import { ReactElement, useState } from 'react';
import { API_URL, defaultPagination } from '../constants';
import React from 'react';
import { appService } from '../service/app.service';
import { Card, Loading, Pagination } from '@repo/ui/components';
import { ApiResponse, RequestData, RequestItem } from '@repo/models';

export const getStaticProps = (async () => {
  const res = await fetch(API_URL as string);
  const response = await res.json();
  return { props: { response } };
}) satisfies GetStaticProps<{
  response: ApiResponse;
}>;

type Props = InferGetStaticPropsType<typeof getStaticProps>;

const Page: NextPageWithLayout<Props> = ({
  response,
}: {
  response: ApiResponse;
}) => {
  const [data, setData] = useState<RequestItem[]>(response.items);

  const [pagination, setPagination] = useState<RequestData>(
    response
      ? {
          currentPage: response.currentPage,
          limit: response.totalPages,
        }
      : defaultPagination
  );

  const { isLoading, isValidating } = appService.useGetRequest(pagination, {
    onSuccess: (data) => {
      setData(data.items);
    },
    onError: () => {
      setData([]);
    },
  });

  const handlePageChange = (pageNumber: number) => {
    setPagination({
      ...pagination,
      currentPage: pageNumber,
    });
  };
  const loading = isLoading || isValidating;

  // if (!data.length) return <DataError />;

  return (
    <div className="px-8 py-12">
      <h1 className="mb-4 text-4xl text-center">Requests</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <ul className="grid grid-cols-2 gap-4">
            {data.map((request) => {
              return <Card request={request} key={request.id} />;
            })}
          </ul>
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={response.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Page;
