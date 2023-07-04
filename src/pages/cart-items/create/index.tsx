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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCartItem } from 'apiSdk/cart-items';
import { Error } from 'components/error';
import { cartItemValidationSchema } from 'validationSchema/cart-items';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { WorkshopInterface } from 'interfaces/workshop';
import { CartInterface } from 'interfaces/cart';
import { getWorkshops } from 'apiSdk/workshops';
import { getCarts } from 'apiSdk/carts';
import { CartItemInterface } from 'interfaces/cart-item';

function CartItemCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CartItemInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCartItem(values);
      resetForm();
      router.push('/cart-items');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CartItemInterface>({
    initialValues: {
      workshop_id: (router.query.workshop_id as string) ?? null,
      cart_id: (router.query.cart_id as string) ?? null,
    },
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
            Create Cart Item
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
    operation: AccessOperationEnum.CREATE,
  }),
)(CartItemCreatePage);
