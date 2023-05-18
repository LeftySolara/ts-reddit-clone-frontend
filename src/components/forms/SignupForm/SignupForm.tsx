import {
  Flex,
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
  Button,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import { createUser } from "@api/users";

interface FormValues {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

const SignupForm = () => {
  return (
    <Flex bg="gray.100" align="center" justify="center" h="100vh">
      <Box bg="white" p={6} rounded="md" w={512}>
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
          onSubmit={async (values: FormValues, { setSubmitting }) => {
            const response = await createUser(
              values.email,
              values.username,
              values.password
            );

            if (!response) {
              alert("No response from server.");
              return;
            }

            if (response.status != 201) {
              alert(`Error ${response.status}: ${response.statusText}`);
            } else {
              alert(`User ${response.data.user.username} created.`);
            }

            setSubmitting(false);
          }}
        >
          <Form>
            <VStack spacing={4} align="flex-start">
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
                    isInvalid={
                      !!(form.errors.username && form.touched.username)
                    }
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
                    isInvalid={
                      !!(form.errors.password && form.touched.password)
                    }
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
              <Button type="submit" colorScheme="purple" width="full">
                Sign Up
              </Button>
            </VStack>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
};

export default SignupForm;
