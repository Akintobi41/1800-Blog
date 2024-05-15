import Logo from "../../../logo/Logo";

function Copyright() {
  const year = new Date().getFullYear();

  return (
    <>
      <div className="w-full py-4 md:w-1/2 lg:w-5/12">
        <div className="flex h-full flex-col justify-between">
          <div className="mb-4 inline-flex items-center">
            <Logo width="100px" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              &copy; Copyright {year}. All Rights Reserved by AkinTheDev.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Copyright;
