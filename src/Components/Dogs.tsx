// Right now these dogs are constant, but in reality we should be getting these from our server

import { useDogs } from "../providers/DogsProvider";
import { DogCard } from "./DogCard";

// Todo: Refactor to get rid of props (THERE SHOULD BE NO PROPS DRILLING ON THIS COMPONENT)
export const Dogs = () => {
  // no props allowed
    const { dogs, activeTab, handleDelete, handleFavorite, isLoading } = useDogs();
    const displayedDogs =
      activeTab === "favorited"
        ? dogs.filter((dog) => dog.isFavorite)
        : activeTab === "unfavorited"
        ? dogs.filter((dog) => !dog.isFavorite)
        : dogs;
    
    return (
      //  the "<> </>"" are called react fragments, it's like adding all the html inside
      // without adding an actual html element
      <>
        {displayedDogs.map((dog) => (
          <DogCard 
            key={dog.id}
            dog={dog}
            isLoading={isLoading}
            onTrashIconClick={() => void handleDelete(dog.id)}
            onHeartClick={() => void handleFavorite(dog)}
            onEmptyHeartClick={() => void handleFavorite(dog)}
          />
        ))}
      </>
    );
  };
