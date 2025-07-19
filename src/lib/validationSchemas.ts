import * as Yup from 'yup';

export const AddStuffSchema = Yup.object({
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export const AddContactSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  address: Yup.string().required('Address is required'),
  image: Yup.string().required('Image must be a valid URL').required('Image is required'),
  description: Yup.string().required('Description is required'),
  owner: Yup.string().required(),
});

export const EditContactSchema = AddContactSchema.shape({
  id: Yup.number().required(),
  owner: Yup.string().required(),
});

export const EditStuffSchema = Yup.object({
  id: Yup.number().required(),
  name: Yup.string().required(),
  quantity: Yup.number().positive().required(),
  condition: Yup.string().oneOf(['excellent', 'good', 'fair', 'poor']).required(),
  owner: Yup.string().required(),
});

export interface Contact {
  firstName: string;
  lastName: string;
  address: string;
  image: string;
  description: string;
  owner: string;
  id: number;
}

export interface ContactFormData extends Contact {
  id: number;
}
