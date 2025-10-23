import Timer from "./components/Timer";
import TaskList from "./components/TaskList";
import TopBar from "./components/TopBar";

function App() {
  return (
    <div className="h-screen flex flex-col gap-1">
      <div className="">
        <TopBar />
      </div>
      <div className="flex flex-col md:flex-row gap-2 h-screen">
        <div className="order-last w-full md:order-first md:w-2/5 h-full">
          <TaskList />
        </div>
        <div className="w-full md:w-3/5">
          <Timer />
        </div>
      </div>
    </div>
  );
}

export default App;
