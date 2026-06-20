import { InferType } from "yup";
import { userPublicSchema } from "../schema/user-public.schema";

export type ChangeAccountInfoDto = InferType<typeof userPublicSchema>