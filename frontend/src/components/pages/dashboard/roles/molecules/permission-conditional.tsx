/* eslint-disable @typescript-eslint/no-explicit-any */
import MultiSelect from "@/app/dashboard/_components/organism/multi-select";
import { usePermissionOptions } from "@/core/application/features/organization/permissions/hooks/getPermissionOptions";
import { Button, Skeleton } from "@mantine/core";
import { useFormikContext } from "formik";

export function PermissionConditional({
  initialPermissions,
  type = "create",
  name
}: {
  initialPermissions: string[];
  type: "create" | "update";
  name: string
}) {
  const { values, setFieldValue } = useFormikContext<any>();
  const { options, isLoading } = usePermissionOptions();

  // Reset: Vuelve al estado inicial capturado en UpdateRoleForm
  const handleReset = () => {
    setFieldValue(name, initialPermissions);
  };

  return (
    <>
      {values.toDashboard && (
        <section className="space-y-2">
          {isLoading ? (
            <Skeleton height={70} width={"100%"} />
          ) : (
            <>
              <div className="">
                {type === "update" && (
                  <Button
                    variant="subtle"
                    size="xs"
                    onClick={handleReset}
                    className=""
                  >
                    Resetear
                  </Button>
                )}
                <MultiSelect
                  name={name} // Coincide con UpdateRoleForm
                  label="Selecciona permisos"
                  options={options}
                />
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
