export default function Dashboard() {

  return (
    <div className="w-2/4 h-60 bg-gray-200 mr-4 rounded-xl overflow-hidden flex flex-col justify-between">
      <div className="flex justify-between py-2 px-2">
        <div>
          <h1>Monday</h1>
        </div>
        <div>
          <h1>09:00 PM</h1>
        </div>
      </div>
      <div className="flex flex-col m-auto items-center w-40">
        <div className="flex w-full justify-evenly">
          <div>
            <h1 className="text-7xl">25&deg;</h1>
          </div>
          <div className="border-l-2 border-black pl-4 my-auto">
            <h1>22&deg;</h1>
            <h1>18&deg;</h1>
          </div>
        </div>
        <div>
          <h1>Mostly Clear</h1>
        </div>
      </div>
      <div className="flex justify-between py-2 px-2">
        <div>
          <h1>Real Feel: 24&deg;</h1>
        </div>
        <div>
          <h1>Rain</h1>
        </div>
      </div>
    </div>
  );
}
