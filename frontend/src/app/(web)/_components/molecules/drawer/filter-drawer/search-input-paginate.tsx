import { Box, Input } from "@mantine/core";
import { BiSearch, BiX } from "react-icons/bi";

interface Props {
    onChange: (value: string) => void
    value: string
}

export default function SearchInputPaginate({ onChange, value }: Props) {
    return (
        <Box className="px-4!">
            <Input
                value={value}
                leftSection={<BiSearch size={15} />}
                rightSectionPointerEvents="all"
                rightSection={value !== '' ? <BiX size={17} className="text-slate-900 cursor-pointer z-10" onClick={() => onChange('')} /> : undefined}
                onChange={(e) => onChange(e.target.value)}
            />
        </Box>
    )
}