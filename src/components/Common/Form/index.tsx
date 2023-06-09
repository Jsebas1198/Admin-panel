import React from 'react';
import {
  Typography,
  Box,
  Stack,
  FormControl,
  FormHelperText,
  TextField,
  TextareaAutosize,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import { FormProps } from '@interfaces/common';
import CustomButton from '../CustomButton';

const Form = ({
  type,
  register,
  handleSubmit,
  handleImageChange,
  onFinishHandler,
  formLoading,
  propertyImage,
}: FormProps) => {
  return (
    <Box>
      <Typography
        fontSize={25}
        fontWeight={700}
        color="#11142d"
      >
        {type} a property
      </Typography>
      <Box
        mt={2.5}
        borderRadius="15px"
        padding="20px"
        bgcolor="#fcfcfc"
      >
        <form
          style={{
            marginTop: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
          }}
          onSubmit={handleSubmit(onFinishHandler)}
        >
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Enter property name
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('title', {
                required: true,
              })}
            />
          </FormControl>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Enter description
            </FormHelperText>
            <TextareaAutosize
              minRows={5}
              required
              placeholder="write description"
              color="info"
              style={{
                width: '100%',
                background: 'transparent',
                fontSize: '16px',
                borderColor: 'rgba(0,0,0,0,23)',
                borderRadius: 6,
                padding: 10,
                color: '#919191',
              }}
              {...register('description', {
                required: true,
              })}
            />
          </FormControl>
          <Stack direction="row" gap={4}>
            <FormControl sx={{ flex: 1 }}>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  margin: '10px  0',
                  fontSize: 16,
                  color: '#11142d',
                }}
              >
                Select property type
              </FormHelperText>

              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{
                  'aria-label': 'Witout label',
                }}
                defaultValue="apartment"
                {...register('propertyType', {
                  required: true,
                })}
              >
                <MenuItem value="Apartments">
                  Apartment
                </MenuItem>
                <MenuItem value="villa">
                  Villa
                </MenuItem>
                <MenuItem value="FarmHouse">
                  Farm house
                </MenuItem>
                <MenuItem value="Condos">
                  Condos
                </MenuItem>
                <MenuItem value="TownHouse">
                  Town House
                </MenuItem>
                <MenuItem value="Duplex">
                  Duplex
                </MenuItem>
                <MenuItem value="Studio">
                  Studio
                </MenuItem>
                <MenuItem value="Chalet">
                  Chalet
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{
                  fontWeight: 500,
                  fontSize: 16,
                  margin: '10px',
                  color: '#11142d',
                }}
              >
                Enter property price
              </FormHelperText>
              <TextField
                fullWidth
                required
                id="outlined-basic"
                color="info"
                type="number"
                variant="outlined"
                {...register('price', {
                  required: true,
                })}
              />
            </FormControl>
          </Stack>
          <FormControl>
            <FormHelperText
              sx={{
                fontWeight: 500,
                fontSize: 16,
                margin: '10px',
                color: '#11142d',
              }}
            >
              Enter Location
            </FormHelperText>
            <TextField
              fullWidth
              required
              id="outlined-basic"
              color="info"
              variant="outlined"
              {...register('location', {
                required: true,
              })}
            />
          </FormControl>

          <Stack
            direction="column"
            gap={1}
            justifyContent="center"
            mb={2}
          >
            <Stack direction="row" gap={2}>
              <Typography
                color="#11142d"
                fontSize={16}
                fontWeight={500}
                my="10px"
              >
                Property Photo
              </Typography>
              <Button
                component="label"
                sx={{
                  width: 'fit-label',
                  color: '#2ed480',
                  textTransform: 'capitalize',
                  fontSize: 16,
                }}
              >
                Upload *
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    handleImageChange(
                      //@ts-ignore
                      e.target.files[0]
                    );
                  }}
                />
              </Button>
            </Stack>
            <Typography
              fontSize={14}
              color="#8081991"
              sx={{ wordBreak: 'break-all' }}
            >
              {propertyImage?.name}
            </Typography>
          </Stack>

          <CustomButton
            type="submit"
            title={
              formLoading
                ? 'Submitting...'
                : 'Submit'
            }
            backgroundColor="#475be8"
            color="#fcfcfc"
          />
        </form>
      </Box>
    </Box>
  );
};

export default Form;
