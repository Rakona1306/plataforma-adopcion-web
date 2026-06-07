"use client";

import { ModalContext } from "@/core/infrastructure/providers/modal-provider";
import { useContext } from "react";

export const useModal = () =>  useContext(ModalContext);