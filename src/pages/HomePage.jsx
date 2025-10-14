import React from "react"
import { useTranslation } from "react-i18next"

export default function Home() {
   const { t } = useTranslation()

   return (
      <h1>{t("title")}</h1>
   )
}