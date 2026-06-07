import { httpClient } from "@/lib/httpClient";
import { VaccineRepositoryImpl } from "../../repositoryImpl/shelter/vaccineRepository";
import { VaccineService } from "@/core/application/services/shelter/vaccines/vaccine-service";

const vaccineRepositoryImpl = new VaccineRepositoryImpl(httpClient);

export const vaccineContainer = new VaccineService(vaccineRepositoryImpl);