import { BaseKey } from '@refinedev/core';
import { IUser } from '@interfaces/user';
export interface FormFieldProp {
  title: string;
  labelName: string;
}

export interface FormValues {
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number | undefined;
}

export interface PropertyCardProps {
  id?: BaseKey | undefined;
  title: string;
  location: string;
  price: number;
  photo: string;
}

export interface IProperty {
  _id?: string;
  title: string;
  description: string;
  propertyType: string;
  location: string;
  price: number;
  photo: string;
  creator: IUser;
}
