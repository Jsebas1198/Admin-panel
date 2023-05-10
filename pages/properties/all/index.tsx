import React from 'react';
import { useList } from '@refinedev/core';
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
    </Box>
  );
};

export default AllProperties;
