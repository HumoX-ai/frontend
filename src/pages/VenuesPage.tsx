import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVenuesQuery, type Venue } from "@/store/api/venueApi";
import { useQueryParams } from "@/lib/utils";

const DISTRICTS = [
  "Yunusobod",
  "Chilonzor",
  "Yakkasaroy",
  "Olmazor",
  "Shayxontohur",
  "Uchtepa",
  "Mirobod",
  "Mirzo Ulug'bek",
  "Sergeli",
  "Bektemir",
];

// Define a type for filters to avoid circular reference error
type VenueFilters = {
  query: string;
  district: string;
  capacity: string;
  minPricePerSeat: string;
  maxPricePerSeat: string;
};

const VenuesPage = () => {
  const [params, setParams] = useQueryParams<{
    query?: string;
    district?: string;
    capacity?: string;
    minPricePerSeat?: string;
    maxPricePerSeat?: string;
  }>();

  const [filters, setFilters] = useState<VenueFilters>({
    query: params.query || "",
    district: params.district || "",
    capacity: params.capacity || "",
    minPricePerSeat: params.minPricePerSeat || "",
    maxPricePerSeat: params.maxPricePerSeat || "",
  });

  // Sync filters to URL params
  const updateFilter = (newFilters: Partial<VenueFilters>) => {
    const updated = { ...filters, ...newFilters };
    setFilters(updated);
    setParams(updated);
  };

  const {
    data: venues,
    isLoading,
    isError,
    error,
  } = useGetVenuesQuery({
    query: filters.query || undefined,
    district: filters.district || undefined,
    capacity: filters.capacity ? Number(filters.capacity) : undefined,
    minPricePerSeat: filters.minPricePerSeat
      ? Number(filters.minPricePerSeat)
      : undefined,
    maxPricePerSeat: filters.maxPricePerSeat
      ? Number(filters.maxPricePerSeat)
      : undefined,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">To'yxonalar</h1>
        <FilterForm filters={filters} updateFilter={updateFilter} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <Skeleton className="w-full h-56" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-10 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Xatolik</h1>
        <FilterForm filters={filters} updateFilter={updateFilter} />
        <p className="text-red-500">
          To'yxonalarni yuklashda xatolik yuz berdi.
        </p>
        {error && (
          <pre className="mt-4 text-left bg-red-100 p-4 rounded">
            {JSON.stringify(error, null, 2)}
          </pre>
        )}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Barcha To'yxonalar
      </h1>
      <FilterForm filters={filters} updateFilter={updateFilter} />
      {!venues || venues.length === 0 ? (
        <div className="text-center py-12">
          <p>Hozircha to'yxonalar mavjud emas.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {venues.map((venue: Venue) => (
            <div
              key={venue._id}
              className="border rounded-lg overflow-hidden shadow-lg flex flex-col"
            >
              <img
                src={venue.images[0]}
                alt={venue.name}
                className="w-full h-56 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src =
                    "https://via.placeholder.com/400x250?text=Rasm+Yuklanmadi";
                }}
              />
              <div className="p-4 flex flex-col flex-grow">
                <h2
                  className="text-xl font-semibold mb-2 truncate"
                  title={venue.name}
                >
                  {venue.name}
                </h2>
                <p className="text-sm text-muted-foreground mb-1 truncate">
                  <span className="font-medium">Manzil:</span> {venue.district},{" "}
                  {venue.address}
                </p>
                <p className="text-sm text-muted-foreground mb-1">
                  <span className="font-medium">Sig'imi:</span> {venue.capacity}{" "}
                  kishi
                </p>
                <p className="text-lg font-semibold text-primary mb-3">
                  {venue.pricePerSeat.toLocaleString()} so'm / kishi
                </p>
                <div className="mt-auto">
                  <Button asChild className="w-full">
                    <Link to={`/venues/${venue._id}`}>Batafsil</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

function FilterForm({
  filters,
  updateFilter,
}: {
  filters: VenueFilters;
  updateFilter: (f: Partial<VenueFilters>) => void;
}) {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 bg-muted/50 p-4 rounded-lg"
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <Label htmlFor="query">Qidiruv</Label>
        <Input
          id="query"
          name="query"
          placeholder="Nomi yoki kalit so'z..."
          value={filters.query}
          onChange={(e) => updateFilter({ query: e.target.value })}
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="district">Tuman</Label>
        <Select
          value={filters.district || "__all__"}
          onValueChange={(val) =>
            updateFilter({ district: val === "__all__" ? "" : val })
          }
        >
          <SelectTrigger id="district" className="mt-1">
            <SelectValue placeholder="Barchasi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__all__">Barchasi</SelectItem>
            {DISTRICTS.map((d) => (
              <SelectItem key={d} value={d}>
                {d}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="capacity">Minimal sig‘im</Label>
        <Input
          id="capacity"
          name="capacity"
          type="number"
          min={0}
          placeholder="Masalan, 100"
          value={filters.capacity}
          onChange={(e) => updateFilter({ capacity: e.target.value })}
          className="mt-1"
        />
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <Label htmlFor="minPricePerSeat">Min narx</Label>
          <Input
            id="minPricePerSeat"
            name="minPricePerSeat"
            type="number"
            min={0}
            placeholder="0"
            value={filters.minPricePerSeat}
            onChange={(e) => updateFilter({ minPricePerSeat: e.target.value })}
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="maxPricePerSeat">Max narx</Label>
          <Input
            id="maxPricePerSeat"
            name="maxPricePerSeat"
            type="number"
            min={0}
            placeholder="1000000"
            value={filters.maxPricePerSeat}
            onChange={(e) => updateFilter({ maxPricePerSeat: e.target.value })}
            className="mt-1"
          />
        </div>
      </div>
    </form>
  );
}

export default VenuesPage;
