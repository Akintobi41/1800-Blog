import { Outlet } from "react-router-dom";

function App() {
  // function checkNum(x1, v1, x2, v2) {
  //   let fj = x1 + v1;
  //   let sj = x2 + v2;

  //   while (fj !== sj) {}
  // }
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        {" "}
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
