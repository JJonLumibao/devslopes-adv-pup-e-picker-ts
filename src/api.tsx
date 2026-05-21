import { Dog } from "./types";

const baseUrl = "http://localhost:3000";

const getAllDogs = (): Promise<Dog[]> => {
  // fill out method
  return fetch(`${baseUrl}/dogs`).then(res => res.json()) as Promise<Dog[]>;
};

const postDog = (dog: Omit<Dog, "id" | "isFavorite">): Promise<Dog> => {
  // fill out method
  return fetch(`${baseUrl}/dogs`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(dog),
  }).then(res => res.json()) as Promise<Dog>;
};

const deleteDogRequest = (id: number): Promise<void> => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "DELETE"
  }).then(() => undefined);
};

const patchFavoriteForDog = (id: number, updatedDog: Partial<Dog>): Promise<Dog> => {
  // fill out method
  return fetch(`${baseUrl}/dogs/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(updatedDog),
  }).then(res => res.json()) as Promise<Dog>;
};

export const Requests = {
  postDog,
  deleteDogRequest,
  patchFavoriteForDog,
  getAllDogs,
};
