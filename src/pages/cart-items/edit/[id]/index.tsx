import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getCartItemById, updateCartItemById } from 'apiSdk/cart-items';
import { Error } from 'components/error';
import { cartItemValidationSchema } from 'validationSchema/cart-items';
import { CartItemInterface } from 'interfaces/cart-item';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { WorkshopInterface } from 'interfaces/workshop';
import { CartInterface } from 'interfaces/cart';
import { getWorkshops } from 'apiSdk/workshops';
import { getCarts } from 'apiSdk/carts';

function CartItemEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CartItemInterface>(
    () => (id ? `/cart-items/${id}` : null),
    () => getCartItemById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CartItemInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCartItemById(id, values);
      mutate(updated);
      resetForm();
      router.push('/cart-items');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CartItemInterface>({
    initialValues: data,
    validationSchema: cartItemValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Cart Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <AsyncSelect<WorkshopInterface>
              formik={formik}
              name={'workshop_id'}
              label={'Select Workshop'}
              placeholder={'Select Workshop'}
              fetcher={getWorkshops}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.title}
                </option>
              )}
            />
            <AsyncSelect<CartInterface>
              formik={formik}
              name={'cart_id'}
              label={'Select Cart'}
              placeholder={'Select Cart'}
              fetcher={getCarts}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.id}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'cart_item',
    operation: AccessOperationEnum.UPDATE,
  }),
)(CartItemEditPage);
