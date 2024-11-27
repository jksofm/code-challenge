import { GetStaticProps,InferGetStaticPropsType } from "next";
import { Request, RequestData, Response } from "../models";
import { NextPageWithLayout } from "./_app";
import { ReactElement, useState } from "react";
import { API_URL, defaultPagination } from "../constants";

import { Card, Loading, Pagination } from "../components";
import { appService } from "../service/app.service";


export const getStaticProps = (async () => {
    const res = await fetch(API_URL)
    const response = await res.json()
    return { props: { response } }
  }) satisfies GetStaticProps<{
    response: Response
  }>

  type Props = InferGetStaticPropsType<typeof getStaticProps>;

  const Page: NextPageWithLayout<Props>= ({response}:{response:Response}) => {
    const [data, setData] = useState<Request[]>(response.items);
    
    const [pagination, setPagination] = useState<RequestData>(response ? {
        currentPage: response.currentPage,
        limit: response.totalPages
    } :   defaultPagination)
  
    const {isLoading,isValidating} = appService.useGetRequest(pagination,{
        onSuccess: (data) => {
            setData(data.items)
        },
        onError: () => {
            setData([])
        }
    })

    const handlePageChange = (pageNumber: number) => {
        setPagination({
            ...pagination,
            currentPage: pageNumber
        })
    }
  const loading = isLoading || isValidating;

  if(!data.length) return <div>Failed to fetch data</div>
  
    return <div className="px-8 py-12">
        <h1 className="mb-4 text-4xl text-center">Requests</h1>
      {loading ? <Loading/> : (
         <>
                      <ul className="grid grid-cols-2 gap-4">
             {data.map(request =>{
                 return (
                   <Card request={request} key={request.id} />
                
                  
                     )
             })}
         </ul>
         <Pagination currentPage={pagination.currentPage} totalPages={response.totalPages} onPageChange={handlePageChange} />
         </>

      )}
    
    </div>
  }

  Page.getLayout = function getLayout(page: ReactElement) {
    return (
        <>
        {page}
        
        </>
    )
  }

  export default Page

