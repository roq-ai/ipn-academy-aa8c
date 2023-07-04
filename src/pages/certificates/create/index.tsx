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
import { createCertificate } from 'apiSdk/certificates';
import { Error } from 'components/error';
import { certificateValidationSchema } from 'validationSchema/certificates';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { WorkshopInterface } from 'interfaces/workshop';
import { UserInterface } from 'interfaces/user';
import { getWorkshops } from 'apiSdk/workshops';
import { getUsers } from 'apiSdk/users';
import { CertificateInterface } from 'interfaces/certificate';

function CertificateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CertificateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCertificate(values);
      resetForm();
      router.push('/certificates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CertificateInterface>({
    initialValues: {
      workshop_id: (router.query.workshop_id as string) ?? null,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: certificateValidationSchema,
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
            Create Certificate
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
    entity: 'certificate',
    operation: AccessOperationEnum.CREATE,
  }),
)(CertificateCreatePage);
