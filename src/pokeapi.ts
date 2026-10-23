import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor() {
    this.cache = new Cache(5 * 60 * 1000);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL ?? `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);

    if (cached !== undefined) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location areas: ${res.status} ${res.statusText}`,
      );
    }

    const data: ShallowLocations = await res.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);

    if (cached !== undefined) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch location: ${res.status} ${res.statusText}`,
      );
    }

    const data: Location = await res.json();
    this.cache.add(url, data);

    return data;
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);

    if (cached !== undefined) {
      return cached;
    }

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(
        `Failed to fetch Pokemon: ${res.status} ${res.statusText}`,
      );
    }

    const data: Pokemon = await res.json();
    this.cache.add(url, data);

    return data;
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
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};
