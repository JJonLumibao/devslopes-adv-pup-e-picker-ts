import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { ActiveTab, Dog } from "../types"
import { Requests } from "../api";
import toast from "react-hot-toast";

type DogsContextType = {
  dogs: Dog[];
  isLoading: boolean;
  activeTab: ActiveTab;

  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;

  handleFavorite: (dog: Dog) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;

  handleCreate: (dog: Omit<Dog, "id" | "isFavorite">) => Promise<void>;
}

const DogsContext = createContext<DogsContextType | null>(null);

export const useDogs = () => {
  const context = useContext(DogsContext);
  if (!context) {
    throw new Error("...");
  }
  return context;
}

export const DogsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>(null);

  useEffect(() => {
    setIsLoading(true);

    Requests.getAllDogs()
      .then(setDogs)
      .finally(() => setIsLoading(false));
  }, []);

  const handleFavorite = async (dog: Dog) => {
    const prevDogs = dogs;

    setDogs((prev) =>
      prev.map((current) => (current.id === dog.id ? { ...current, isFavorite: !current.isFavorite } : current))
    );

    try {
      await Requests.patchFavoriteForDog(dog.id, {
        isFavorite: !dog.isFavorite,
      });
    } catch (e) {
      setDogs(prevDogs);
    }
  };

  const handleDelete = async (id: number) => {
    const prevDogs = dogs;
    
    setDogs((prev) => prev.filter((current) => current.id !== id));

    try {
      await Requests.deleteDogRequest(id);
    } catch (e) {
      setDogs(prevDogs);
    }
  };

  const handleCreate = async (
    dog: Omit<Dog, "id" | "isFavorite">
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const newDog = await Requests.postDog(dog);  
      setDogs((prev) => [...prev, newDog]);
      toast.success("Dog Created");
    } finally {
      setIsLoading(false);
    }

  };
  
  const value: DogsContextType = {
    dogs,
    isLoading, 
    activeTab,
    setActiveTab, 
    handleFavorite, 
    handleDelete, 
    handleCreate,
  }
  
  return (
    <DogsContext.Provider value={value}>
      {children}
    </DogsContext.Provider>
  );
}
