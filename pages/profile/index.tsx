import {
  useGetIdentity,
  useOne,
} from '@refinedev/core';

import Profile from '@components/Common/Profile';
import { IUser } from '@interfaces/user';

const MyProfile = () => {
  const { data: user } = useGetIdentity<IUser>();
  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: user?.userId,
  });

  const myProfile = (data?.data as IUser) ?? [];
  console.log(myProfile?.allProperties);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="My"
      name={myProfile?.name}
      avatar={myProfile?.avatar}
      email={myProfile?.email}
      properties={myProfile?.allProperties}
    />
  );
};

export default MyProfile;
