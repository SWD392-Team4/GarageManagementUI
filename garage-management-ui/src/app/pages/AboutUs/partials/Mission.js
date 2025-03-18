import React from "react";
import { useTranslation } from "react-i18next";

export default function Mission() {
  const { t } = useTranslation("about_overview");
  return (
    <p className="text-2xl md:text-5xl font-semibold max-w-6xl">
      {t("about_overview.mission_text")}
    </p>
  );
}
