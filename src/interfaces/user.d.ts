import { BaseKey } from '@refinedev/core';

export interface UserInterface {
  userId?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  allProperties: unknown[];
}
