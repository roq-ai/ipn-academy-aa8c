import * as yup from 'yup';

export const workshopValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  vimeo_link: yup.string().required(),
  trainer_id: yup.string().nullable(),
  organization_id: yup.string().nullable(),
});
