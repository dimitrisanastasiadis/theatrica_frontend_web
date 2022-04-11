import PaginationPage from "../../src/components/PaginationPage";
import { mainFetcher } from "../../src/utils/AxiosInstances";
import getShowImage from "../../src/utils/getShowImage";
import Head from "next/head"

export const getServerSideProps = async ({ query }) => {
  if (!query.page) {
    return {
      redirect: {
        destination: '/shows?page=1',
        permanent: false,
      },
    }
  }

  const page = Number(query.page)
  const data = await mainFetcher(`/productions?page=${page - 1}&size=20`);

  if (!data.content.length) {
    return {
      notFound: true
    }
  }

  let shows = data.content;
  shows = shows.map(show => ({
    id: show.id,
    title: show.title,
    image: getShowImage(show.mediaURL)
  }))

  const pageCount = data.totalPages;

  return {
    props: {
      shows,
      pageCount,
      page
    }
  }
}

const ArtistsPagination = ({ shows, pageCount, page }) => {

  return (
    <>
      <Head>
        <title>Θεατρικές Παραστάσεις | Theatrica</title>
      </Head>
      <PaginationPage title="Παραστάσεις" items={shows} pageCount={pageCount} page={page} path="/shows" />
    </>

  );
}

export default ArtistsPagination;