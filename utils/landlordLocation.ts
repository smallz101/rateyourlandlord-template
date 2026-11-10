const DEFAULT_LANDLORD_CITY = 'east lansing';

export function getDisplayLandlordCity(city: string): string | undefined {
  const trimmedCity = city.trim();
  return trimmedCity && trimmedCity.toLowerCase() !== DEFAULT_LANDLORD_CITY
    ? trimmedCity
    : undefined;
}

export function formatLandlordAddress(address: string): string {
  return address.replace(/,\s*East Lansing\b.*$/i, '').trim();
}
