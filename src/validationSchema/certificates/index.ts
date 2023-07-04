import * as yup from 'yup';

export const certificateValidationSchema = yup.object().shape({
  workshop_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
