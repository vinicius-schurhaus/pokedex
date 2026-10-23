export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location areas: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location/${locationName}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location: ${res.status} ${res.statusText}`,
      );
    }

    return res.json();
  }
}

export type ShallowLocations = {
  next: string | null;
  previous: string | null;
  results: {
    name: string;
  }[];
};

export type Location = {
  id: number;
  name: string;
};
