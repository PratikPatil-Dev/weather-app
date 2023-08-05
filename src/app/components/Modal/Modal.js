"use client";

export default function Modal(props) {
  const { autoDetectLocation, getLocation, setInputCity, onKeyPress} = props;
  return (
    <>
      <div className="fixed top-0 flex justify-center items-center w-full h-screen bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="bg-white w-96 h-72 rounded-xl flex flex-col justify-center items-center">
          <h1>Let us know your location</h1>
          <div className="flex flex-col items-center mt-4">
            <button
              class="mb-4 px-4 py-1 w-20 text-sm hover:text-green-600 hover:bg-white font-semibold rounded-full border hover:border-green-200 
             text-white bg-green-600 border-transparent focus:outline-none focus:ring-2
              focus:ring-green-600 focus:ring-offset-2"
              onClick={autoDetectLocation}
            >
              Sure
            </button>
          </div>
          <h1 className="text-center">Or</h1>
          <div className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Enter your city manually"
              className="cityInput my-6 w-52 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 
              focus:ring-blue-400 focus:border-transparent text-gray-500 text-sm"
              onChange={(e) => setInputCity(e?.target?.value)}
              onKeyDown={onKeyPress}
            />
            <button
              class="my-4 mx-1 px-4 py-1 w-20 text-sm hover:text-blue-600 font-semibold rounded-full border hover:border-blue-200 
             text-white bg-blue-600 hover:bg-white border-transparent focus:outline-none focus:ring-2
              focus:ring-blue-600 focus:ring-offset-2"
              onClick={getLocation}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
