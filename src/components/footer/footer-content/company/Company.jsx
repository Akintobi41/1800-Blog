import { Link } from "react-router-dom";
import { Fragment } from "react";

function Company() {
  const listItems = ["Features", "Pricing", "Affiliate Program", "Press Kit"];

  return (
    <>
      <div className="w-full py-4 md:w-1/2 lg:w-2/12">
        <div className="h-full">
          <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
            Company
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

export default Company;
