import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { useDogs } from "../providers/DogsProvider";

export const CreateDogForm = () =>
  // no props allowed
  {
    const { handleCreate, isLoading } = useDogs();

    const [nameInput, setNameInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("");
    const [imageInput, setImageInput] = useState(dogPictures.BlueHeeler);

    return (
      <form
        action=""
        id="create-dog-form"
        onSubmit={(e) => {
          e.preventDefault();
          void handleCreate({
            name: nameInput,
            description: descriptionInput,
            image: imageInput,
          });
          setNameInput("");
          setDescriptionInput("");
          setImageInput(dogPictures.BlueHeeler);
        }}
      >
        <h4>Create a New Dog</h4>
        <label htmlFor="name">Dog Name</label>
        <input 
          type="text" 
          value={nameInput} 
          onChange={(e) => {
            setNameInput(e.target.value)
          }}
          disabled={isLoading} 
        />
        <label htmlFor="description">Dog Description</label>
        <textarea 
          cols={80} 
          rows={10}
          value={descriptionInput}
          onChange={(e) => {
            setDescriptionInput(e.target.value);
          }}
          disabled={isLoading}
        ></textarea>
        <label htmlFor="picture">Select an Image</label>
        <select
          value={imageInput}
          onChange={(e) => {
            setImageInput(e.target.value);
          }}
          disabled={isLoading}
        >
          {Object.entries(dogPictures).map(([label, pictureValue]) => {
            return (
              <option value={pictureValue} key={pictureValue}>
                {label}
              </option>
            );
          })}
        </select>
        <input type="submit" value="submit" disabled={isLoading} />
      </form>
    );
  };

