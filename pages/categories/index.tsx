import { MuiListInferencer } from '@refinedev/inferencer/mui';
import { GetServerSideProps } from 'next';

import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { ReviewList } from '@components/ReviewList';

export default function CategoryList() {
  return <ReviewList />;
}

export const getServerSideProps: GetServerSideProps<{}> = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      props: {},
      redirect: {
        destination: `/login?to=${encodeURIComponent('/categories')}`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
