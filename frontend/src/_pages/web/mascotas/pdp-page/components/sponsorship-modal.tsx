"use client";

import { Modal, Stack, Group, Button } from "@mantine/core";
import { IoClose } from "react-icons/io5";

interface SponsorshipModalProps {
    opened: boolean;
    onClose: () => void;
    petName: string;
}

export function SponsorshipModal({ opened, onClose, petName }: SponsorshipModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Apadrinar a ${petName}`}
            centered
            size="md"
            styles={{
                header: {
                    backgroundColor: "var(--terciary)",
                    color: "#171717",
                },
            }}
        >
            <Stack gap="lg">
                {/* Form will be added here */}
                <div className="text-center text-gray-500">
                    <p>Formulario de apadrinamiento - Por implementar</p>
                </div>

                <Group justify="flex-end" mt="md">
                    <Button
                        variant="default"
                        onClick={onClose}
                        leftSection={<IoClose size={18} />}
                    >
                        Cancelar
                    </Button>
                    <Button
                        style={{ backgroundColor: "var(--terciary)", color: "#171717" }}
                        onClick={onClose}
                    >
                        Apadrinar
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
