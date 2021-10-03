import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";

export const getServerSideProps = async ({ query }) => {
  if (!query.page){
    return {
      redirect: {
        destination: '/artists?page=1',
        permanent: false,
      },
    }
  }

  const page = Number(query.page)
  const data = await mainFetcher(`/people?page=${page-1}&size=20`);

  if(!data.content.length) {
    return {
      notFound: true
    }
  }

  const artists = data.content;
  const pageCount = data.totalPages;

  return {
    props: {
      artists,
      pageCount,
      page
    }
  }
}

const ArtistsPagination = ({ artists, pageCount, page }) => {

  return (
    <PaginationPage items={artists} pageCount={pageCount} page={page} path="/artists" />
  );
}
 
export default ArtistsPagination;