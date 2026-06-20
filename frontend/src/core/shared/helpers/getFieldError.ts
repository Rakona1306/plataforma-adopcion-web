/* eslint-disable @typescript-eslint/no-explicit-any */
export function getFieldError(
  error: any,
  field: string
): string | undefined {

  return error?.data?.errors?.[field]?.[0];
}