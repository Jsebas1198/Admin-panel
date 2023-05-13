import React from 'react';
import { useTable } from '@refinedev/core';
import { Add } from '@mui/icons-material';
import {
  Typography,
  Box,
  Stack,
} from '@mui/material';
import { useForm } from '@refinedev/react-hook-form';
import Link from 'next/link';

import {
  CustomButton,
  PropertyCard,
} from '@components/index';

const AllProperties = () => {
  const {
    tableQueryResult: {
      data,
      isLoading,
      isError,
    },
  } = useTable();

  const allProperties = data?.data ?? [];

  if (isLoading)
    return <Typography>Loading...</Typography>;

  if (isError)
    return <Typography>Error...</Typography>;
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          fontSize={25}
          fontWeight={700}
          color="#11142d"
        >
          All Properties
        </Typography>
        <Link href="/properties/create">
          <CustomButton
            title="Add Property"
            handleClick={() => {}}
            backgroundColor="#475be8"
            color="#fcfcfc"
            icon={<Add />}
          ></CustomButton>
        </Link>
      </Stack>
      <Box
        mt="20px"
        sx={{
          display: 'felx',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            title={property.title}
            price={property.price}
            location={property.location}
            photo={property.photo}
          />
        ))}
      </Box>
    </Box>
  );
};

export default AllProperties;
