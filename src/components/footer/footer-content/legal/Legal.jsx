import { Link } from "react-router-dom";
import { Fragment } from "react";

function Legal() {
  const listItems = ["Terms & Conditions", "Privacy Policy", "Licensing"];
  return (
    <>
      <div className="w-full md:w-1/2 lg:w-3/12">
        <div className="h-full">
          <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
            Legals
          </h3>
          <ul>
            {listItems.map((list) => (
              <Fragment key={list}>
                <li className="mb-4">
                  <Link
                    className=" text-base font-medium text-gray-900 hover:text-gray-700"
                    to="/"
                  >
                    {list}
                  </Link>
                </li>
              </Fragment>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Legal;
