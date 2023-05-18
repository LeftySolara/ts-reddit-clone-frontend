import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const SignupForm = () => {
  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={{
          email: "",
          username: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
          username: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Username is required"),
          password: Yup.string()
            .min(8, "Must be at least 8 characters")
            .required("Password is required"),
          passwordConfirmation: Yup.string()
            .required("Password confirmation is required")
            .oneOf([Yup.ref("password")], "Passwords must match"),
        })}
        onSubmit={(values: FormValues, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form>
          <Field name="email">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.email && form.touched.email)}
              >
                <FormLabel>Email</FormLabel>
                <Input type="email" required {...field} />
                <FormErrorMessage>
                  {form.errors.email as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="username">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.username && form.touched.username)}
              >
                <FormLabel>Username</FormLabel>
                <Input required {...field} />
                <FormErrorMessage>
                  {form.errors.username as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={!!(form.errors.password && form.touched.password)}
              >
                <FormLabel>Password</FormLabel>
                <Input type="password" required {...field} />
                <FormErrorMessage>
                  {form.errors.password as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="passwordConfirmation">
            {({ field, form }: FieldProps) => (
              <FormControl
                isInvalid={
                  !!(
                    form.errors.passwordConfirmation &&
                    form.touched.passwordConfirmation
                  )
                }
              >
                <FormLabel>Confirm Password</FormLabel>
                <Input type="password" required {...field} />
                <FormErrorMessage>
                  {form.errors.passwordConfirmation as string}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default SignupForm;
