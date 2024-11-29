import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextPageWithLayout } from './_app';
import { ReactElement, useMemo, useState } from 'react';
import { API_URL, defaultPagination } from '../constants';
import React from 'react';
import { appService } from '../service/app.service';
import { Card, CardSkeleton, DataError, NoData, Pagination } from '@repo/ui';
import { ApiResponse, RequestItem } from '@repo/models';
import { useRouter } from 'next/router';
import { useRouterLoading } from '@repo/utils';

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
  const [data, setData] = useState<RequestItem[]>(response?.items || []);
  const router = useRouter();
  const { isRouterLoading } = useRouterLoading();

  const query = router.query;

  const defaultPag = useMemo(() => {
    if (
      Number.isInteger(Number(query.page)) &&
      Number.isInteger(Number(query.limit))
    ) {
      return {
        currentPage: Number(query.page),
        limit: Number(query.limit),
      };
    }
    if (response) {
      return {
        currentPage: response.currentPage,
        limit: response.limit,
      };
    }
    return defaultPagination;
  }, [query]);

  const {
    isLoading,
    isValidating,
    error,
    data: clientResponse,
  } = appService.useGetRequest(defaultPag, {
    onSuccess: (data) => {
      setData(data.items);
    },
    onError: () => {
      setData([]);
    },
  });

  if (!data.length && error) return <DataError />;

  const Content = () => {
    if (isValidating || isLoading || isRouterLoading)
      return (
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      );
    if (!data.length) return <NoData />;
    return (
      <>
        <ul className="grid lg:grid-cols-3 grid-cols-2 gap-4">
          {data.map((request) => {
            return <Card request={request} key={request.id} />;
          })}
        </ul>
        <Pagination
          currentPage={defaultPag.currentPage}
          totalPages={response?.totalPages || clientResponse?.totalPages || 0}
          limit={defaultPag.limit}
        />
      </>
    );
  };

  return (
    <div className="min-h-[100vh] px-8 py-12">
      <h1 className="mb-8 text-4xl text-center">Requests</h1>

      <Content />
    </div>
  );
};

Page.getLayout = function getLayout(page: ReactElement) {
  return <>{page}</>;
};

export default Page;
