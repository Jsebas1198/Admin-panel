import { useState } from 'react';
import Form from '@components/Common/Form';
import { useForm } from '@refinedev/react-hook-form';
import { useGetIdentity } from '@refinedev/core';

const CreateProperty = () => {
  type FormValues = Record<string, any>;
  const { data: user } = useGetIdentity() as {
    data: { email: string };
  };
  const [propertyImage, setPropertyImage] =
    useState({ name: '', url: '' });
  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Lector de archivos
   */
  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () =>
          resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setPropertyImage({
        name: file?.name,
        url: result,
      })
    );
  };

  /**
   * Filtra si se selecciono un archivo
   */
  const onFinishHandler = async (
    data: FormValues
  ) => {
    if (!propertyImage.name) {
      return alert('Please select an image');
    }

    const formData = {
      ...data,
      photo: propertyImage.url,
      email: user.email,
    };

    await onFinish(formData);
  };

  return (
    <Form
      type="create"
      register={register}
      onFinish={onFinish}
      formLoading={formLoading}
      handleSubmit={handleSubmit}
      handleImageChange={handleImageChange}
      onFinishHandler={onFinishHandler}
      propertyImage={propertyImage}
    />
  );
};

export default CreateProperty;
