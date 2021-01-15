import * as yup from 'yup';

export default (data) => {
  const schema = yup.object().shape({
    password: yup.string().trim().min(8),
    username: yup.string().trim().required(),
  });
  return schema.validate(data);
};
