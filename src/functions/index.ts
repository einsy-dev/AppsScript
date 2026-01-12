import { DOMAIN } from "./domain/Domain";

(globalThis as any) = {
  ...globalThis,
  DOMAIN
};
