import "i18next";
import i18nResources from "./locales";

// https://www.i18next.com/overview/typescript
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "translation";
    resources: typeof i18nResources["fi"];
  }
}