import { useOne } from '@refinedev/core';
import { useRouter } from 'next/router';

import Profile from '@components/Common/Profile';
import { UserInterface } from '@interfaces/user';

const AgentProfile = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading, isError } = useOne({
    resource: 'users',
    id: id as string,
  });

  const agentProfile =
    (data?.data as UserInterface) ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Profile
      type="Agent"
      name={agentProfile?.name}
      avatar={agentProfile?.avatar}
      email={agentProfile?.email}
      properties={agentProfile?.allProperties}
    />
  );
};

export default AgentProfile;
