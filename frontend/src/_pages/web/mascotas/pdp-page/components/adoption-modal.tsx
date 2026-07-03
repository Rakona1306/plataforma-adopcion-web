"use client";

import { Modal, Stack, Group, Button } from "@mantine/core";
import { IoClose } from "react-icons/io5";

interface AdoptionModalProps {
    opened: boolean;
    onClose: () => void;
    petName: string;
}

export function AdoptionModal({ opened, onClose, petName }: AdoptionModalProps) {
    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={`Adoptar a ${petName}`}
            centered
            size="md"
            styles={{
                header: {
                    backgroundColor: "var(--primary)",
                    color: "white",
                },
            }}
        >
            <Stack gap="lg">
                {/* Form will be added here */}
                <div className="text-center text-gray-500">
                    <p>Formulario de adopción - Por implementar</p>
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
                        style={{ backgroundColor: "var(--primary)" }}
                        onClick={onClose}
                    >
                        Solicitar Adopción
                    </Button>
                </Group>
            </Stack>
        </Modal>
    );
}
