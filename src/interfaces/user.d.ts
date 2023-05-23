import { BaseKey } from '@refinedev/core';
import { IProperty } from './property';

export interface IUser {
  userId?: BaseKey | undefined;
  name: string;
  email: string;
  avatar: string;
  allProperties: IProperty[];
}
