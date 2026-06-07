import { TraitService } from "@/core/application/services/shelter/traits/trait-service";
import { TraitRepositoryImpl } from "../../repositoryImpl/shelter/traitRepository";
import { httpClient } from "@/lib/httpClient";

const traitRepository = new TraitRepositoryImpl(httpClient);

export const traitContainer = new TraitService(traitRepository);