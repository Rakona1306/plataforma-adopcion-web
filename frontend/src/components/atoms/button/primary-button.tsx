import { cn } from "@/lib/utils";
import { Button, FactoryPayload, StylesApiProps } from "@mantine/core";
import { ReactNode, useState } from "react";

interface Props {
    children: ReactNode
    mode?: 'cancel' | 'primary'
    rootClassName?: string
}

export default function PrimaryButton({ children, rootClassName, mode = 'primary', }: Props) {

    const [rootClass, setRootClass] = useState('')

    switch (mode) {
        case 'primary':
            setRootClass('bg-primary text-white hover:')
    }

    return (
        <Button classNames={{
            root: cn('px-6 py-3 ', rootClassName)
        }}>
            {children}
        </Button>
    )
}