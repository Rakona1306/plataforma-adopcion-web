import { Divider, Modal } from "@mantine/core";
import classNames from "classnames";

export default function HeaderModal({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <>
      <div
        className={classNames(
          "bg-gray-100 px-4 py-6 w-full rounded-tl-md rounded-tr-md flex items-center gap-2 justify-between border-b-2 border-gray-300 shadow shadow-gray-200",
          className,
        )}
      >
        <div>
          <h2 className="text-lg font-bold">{title}</h2>
        </div>
        <Modal.CloseButton size="lg" />
      </div>
      <Divider />
    </>
  );
}
