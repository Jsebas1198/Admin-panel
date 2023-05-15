import { useState } from 'react';
import { useGetIdentity } from '@refinedev/core';
import { useForm } from '@refinedev/react-hook-form';
import Form from '@components/Common/Form';

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
  } = useForm();

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

  const onFinishHandler = async (
    data: FormValues
  ) => {
    if (!propertyImage.name)
      return alert(
        'Please upload a property image'
      );

    const formData = {
      ...data,
      photo: propertyImage.url,
      email: user.email,
    };

    await onFinish(formData);
  };

  return (
    <Form
      type="Edit"
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
