"use client";

import Link from "next/link";
import { useProperty } from "@/hooks/use-property";
import { LocationMap } from "@/components/card/location-map";
import { PropertyGallery } from "@/app/[locale]/(root)/properties/[slug]/_components/item/property-gallery";
import { PropertyDetailSkeleton } from "@/components/loading/property-detail-skeleton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PropertyContactCard } from "@/components/card/property-contact-card";
import { PropertyInquiryCard } from "@/components/card/property-inquiry-card";

export function PropertyDetail({ slug }: { slug: string }) {
  const query = useProperty(slug);
  const property = query.data;
  if (query.isPending) return <PropertyDetailSkeleton />;
  if (query.isError)
    return (
      <div role="alert" className="rounded-xl border p-8">
        <h1 className="text-2xl">Could not fetch this property</h1>
        <Button className="mt-4" onClick={() => void query.refetch()}>
          Retry
        </Button>
      </div>
    );
  if (!property)
    return (
      <div className="py-12">
        <h1 className="font-serif text-3xl">Property not found</h1>
        <p className="mt-3 text-muted-foreground">
          This property may no longer be available.
        </p>
        <Link
          href="/properties"
          className={buttonVariants({ className: "mt-5" })}
        >
          Browse properties
        </Link>
      </div>
    );
  const title = property?.title || "Untitled property";
  const location = [
    property?.localArea,
    property?.location?.township?.nameEn,
    property?.location?.region?.nameEn,
  ]
    .filter(Boolean)
    .join(", ");
  const fields = [
    ["Property code", property?.code],
    ["Property type", property?.propertyType],
    ["Listing type", property?.listingType],
    ["Status", property?.status],
    ["Size", property?.propertySize],
    ["Features", property?.propertyFeatures],
    ["Price terms", property?.priceLabel],
    ["Street", property?.street],
    ["Landmark", property?.landmark],
    ["Address", property?.addressDetail],
  ].filter(([, value]) => value);
  return (
    <>
      <div className="mb-6 flex flex-wrap gap-2">
        {property?.listingType && (
          <Badge className="capitalize">{property.listingType}</Badge>
        )}
        {property?.isFeatured && <Badge variant="secondary">Featured</Badge>}
      </div>
      <h1 className="font-serif text-3xl sm:text-4xl">{title}</h1>
      {property?.subtitle && (
        <p className="mt-3 text-lg">{property.subtitle}</p>
      )}
      {location && <p className="mt-3 text-muted-foreground">{location}</p>}
      <div className="mt-8">
        <PropertyGallery
          key={`${slug}-property-gallery`}
          images={property?.images}
          title={title}
        />

      </div>
      <div className="mt-10 space-y-8">
        {property?.description && (
          <section>
            <h2 className="text-2xl font-semibold">About this property</h2>
            <p className="mt-4 whitespace-pre-line leading-7 text-muted-foreground">
              {property.description}
            </p>
          </section>
        )}
        {fields.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold">Property details</h2>
            <dl className="mt-4 grid gap-5 rounded-2xl border p-6 sm:grid-cols-2">
              {fields.map(([label, value]) => (
                <div key={label}>
                  <dt className="text-sm text-muted-foreground">{label}</dt>
                  <dd className="mt-1 whitespace-pre-line">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}
        {!!property?.amenities?.length && (
          <section>
            <h2 className="text-2xl font-semibold">Amenities</h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {property.amenities.map(
                (amenity, index) =>
                  amenity?.name && (
                    <li key={amenity?.id ?? index}>
                      <Badge variant="secondary">{amenity.name}</Badge>
                    </li>
                  ),
              )}
            </ul>
          </section>
        )}
        <div className="grid items-start gap-6 lg:grid-cols-2">
          <PropertyInquiryCard
            key={`${slug}-${property.id}-inquiry`}
            propertyId={property.id}
            propertyTitle={title}
          />
          <PropertyContactCard
            key={`${slug}-property-contact-card`}
            property={property}
          />
        </div>
        <LocationMap
          latitude={property.latitude}
          longitude={property.longitude}
        />
      </div>
    </>
  );
}
