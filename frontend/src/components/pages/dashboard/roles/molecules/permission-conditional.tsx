import MultiSelect from "@/app/dashboard/_components/organism/multi-select";
import { usePermissionOptions } from "@/core/application/features/organization/permissions/hooks/getPermissionOptions";
import { Button, Skeleton } from "@mantine/core";
import { useFormikContext } from "formik";

export function PermissionConditional({ initialPermissions }: { initialPermissions: string[] }) {
  const { values, setFieldValue } = useFormikContext<any>();
  const { options, isLoading } = usePermissionOptions();

  // Reset: Vuelve al estado inicial capturado en UpdateRoleForm
  const handleReset = () => {
    setFieldValue("currentPermissions", initialPermissions);
  };

  return (
    <>
      {values.toDashboard && (
        <section className="space-y-2">
          {isLoading ? (
            <Skeleton height={70} width={"100%"} />
          ) : (
            <>
              <div className="flex justify-between items-center">
                <MultiSelect
                  name="currentPermissions" // Coincide con UpdateRoleForm
                  label="Selecciona permisos"
                  options={options}
                />
                <Button
                  variant="subtle" 
                  size="xs" 
                  onClick={handleReset}
                  className="mt-6"
                >
                  Resetear
                </Button>
              </div>
            </>
          )}
        </section>
      )}
    </>
  );
}
