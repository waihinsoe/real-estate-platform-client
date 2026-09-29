"use client";

import { useId, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { useInquiry } from "@/hooks/use-inquiry";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function PropertyInquiryCard({
  propertyId,
  propertyTitle,
}: {
  propertyId?: number;
  propertyTitle: string;
}) {
  const t = useTranslations("PropertyInquiry");
  const id = useId();
  const inquiry = useInquiry();
  const canSubmit = typeof propertyId === "number" && Number.isInteger(propertyId) && propertyId > 0;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSubmit || propertyId === undefined || inquiry.isPending || inquiry.isSuccess) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const value = (name: string) => String(data.get(name) ?? "").trim();

    inquiry.mutate({
      property_id: propertyId,
      name: value("name"),
      phone: value("phone"),
      email: value("email"),
      message: value("message"),
      inquiry_type: "GENERAL",
    }, { onSuccess: () => form.reset() });
  }

  return (
    <Card className="rounded-2xl border border-primary/20 shadow-sm">
      <CardHeader>
        <h2 id={`${id}-heading`} className="text-lg font-semibold">{t("heading")}</h2>
        <CardDescription>
          {t("description")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} aria-labelledby={`${id}-heading`} aria-busy={inquiry.isPending}>
          <fieldset disabled={!canSubmit || inquiry.isPending || inquiry.isSuccess} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor={`${id}-name`} className="text-sm font-medium">{t("name")}</label>
              <Input id={`${id}-name`} name="name" autoComplete="name" placeholder={t("namePlaceholder")} required pattern=".*\S.*" title={t("nameValidation")} className="h-11" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${id}-phone`} className="text-sm font-medium">{t("phone")}</label>
              <Input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" placeholder={t("phonePlaceholder")} required pattern=".*[0-9၀-၉].*" title={t("phoneValidation")} className="h-11" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${id}-email`} className="text-sm font-medium">{t("email")}</label>
              <Input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder={t("emailPlaceholder")} required className="h-11" />
            </div>
            <div className="space-y-2">
              <label htmlFor={`${id}-message`} className="text-sm font-medium">{t("message")}</label>
              <Textarea id={`${id}-message`} name="message" defaultValue={t("defaultMessage", { title: propertyTitle })} required className="min-h-28" onChange={(event) => event.currentTarget.setCustomValidity(event.currentTarget.value.trim() ? "" : t("messageValidation"))} />
            </div>
            <Button type="submit" disabled={!canSubmit || inquiry.isPending || inquiry.isSuccess} className="h-11 w-full gap-2">
              <Send aria-hidden="true" />
              {inquiry.isPending ? t("sending") : inquiry.isSuccess ? t("sent") : t("send")}
            </Button>
          </fieldset>
          {inquiry.isSuccess && (
            <p role="status" className="mt-4 rounded-lg bg-primary/5 p-3 text-sm text-primary">
              {t("success")}
            </p>
          )}
          {inquiry.isError && (
            <p role="alert" className="mt-4 text-sm text-destructive">
              {t("error")}
            </p>
          )}
          {!canSubmit && (
            <p className="mt-4 text-sm text-muted-foreground">{t("unavailable")}</p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
