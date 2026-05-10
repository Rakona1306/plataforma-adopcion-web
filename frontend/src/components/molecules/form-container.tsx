'use client'

import { ReactNode } from 'react'
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikProps,
  FormikValues,
} from 'formik'

export default function FormContainer<Values extends FormikValues>({
  children,
  className,
  containerClassName,
  initialValues,
  onSubmit,
  validationSchema,
  validate,
  validateOnBlur,
  validateOnChange,
  validateOnMount,
  enableReinitialize,
  initialErrors,
  initialTouched,
  initialStatus,
}: FormContainerFormikProps<Values>) {
  return (
    <Formik<Values>
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      validate={validate}
      validateOnBlur={validateOnBlur}
      validateOnChange={validateOnChange}
      validateOnMount={validateOnMount}
      enableReinitialize={enableReinitialize}
      initialErrors={initialErrors}
      initialTouched={initialTouched}
      initialStatus={initialStatus}
    >
      {(formik) => (
        <div className={containerClassName}>
          <Form className={className}>
            {typeof children === 'function' ? children(formik) : children}
          </Form>
        </div>
      )}
    </Formik>
  )
}

interface FormContainerFormikProps<Values extends FormikValues>
  extends Pick<
    FormikConfig<Values>,
    | 'initialValues'
    | 'onSubmit'
    | 'validationSchema'
    | 'validate'
    | 'validateOnBlur'
    | 'validateOnChange'
    | 'validateOnMount'
    | 'enableReinitialize'
    | 'initialErrors'
    | 'initialTouched'
    | 'initialStatus'
  > {
  children: ReactNode | FormRenderFunction<Values>
  className?: string
  containerClassName?: string
}

type FormRenderFunction<Values extends FormikValues> = (
  formik: FormikProps<Values>,
) => ReactNode

export type FormContainerFormikSubmit<Values extends FormikValues> = (
  values: Values,
  formikHelpers: FormikHelpers<Values>,
) => void | Promise<unknown>