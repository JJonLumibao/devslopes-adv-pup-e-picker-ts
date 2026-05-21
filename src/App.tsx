import { CreateDogForm } from "./Components/CreateDogForm";
import { Dogs } from "./Components/Dogs";
import { Section } from "./Components/Section";
import { DogsProvider, useDogs } from "./providers/DogsProvider";

const AppContent = () => {
  const { activeTab } = useDogs();
  
  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
        <header>
          <h1>pup-e-picker (Functional)</h1>
        </header>
        <Section label={"Dogs: "}>
          {activeTab === "create" ? <CreateDogForm /> : <Dogs />}
        </Section>
    </div>
  );
} 

export function App() {  
  return (
    <DogsProvider>
      <AppContent />
    </DogsProvider>
  );
}
