import React from 'react';
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
  TopAgent,
} from '@components';
import {
  Typography,
  Box,
  Stack,
} from '@mui/material';

import { useList } from '@refinedev/core';
const Home = () => {
  
  const { data, isLoading, isError } = useList({
    resource: 'properties',
    config: {
      pagination: {
        pageSize: 3,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        color="#11142D"
      >
        Dashboard
      </Typography>
      <Box
        mt="20px"
        display="flex"
        flexWrap="wrap"
        gap={4}
      >
        <PieChart
          title="properties for sale"
          value={684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="properties for rent"
          value={550}
          series={[60, 40]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="Total customers"
          value={5684}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
        <PieChart
          title="properties for Cities"
          value={555}
          series={[75, 25]}
          colors={['#275be8', '#c4e8ef']}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: 'column', lg: 'row' }}
        gap={4}
      >
        <TotalRevenue />
        <PropertyReferrals />
      </Stack>

      <Stack
        mt="25px"
        width="100%"
        flexWrap="wrap"
        direction="row"
        gap={4}
      >
        <TopAgent />

        <Box
          flex={1}
          borderRadius="15px"
          padding="20px"
          bgcolor="#FCFCFC"
          display="flex"
          flexDirection="column"
          minWidth={{ xs: '100%', sm: 450 }}
        >
          <Typography
            fontSize={18}
            fontWeight={600}
            color="#11142D"
          >
            Latest Properties
          </Typography>

          <Box
            mt={2.5}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 4,
            }}
          >
            {latestProperties.map((property) => (
              <PropertyCard
                key={property._id}
                id={property._id}
                title={property.title}
                location={property.location}
                price={property.price}
                photo={property.photo}
              />
            ))}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Home;
