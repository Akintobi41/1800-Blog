import {Fragment} from 'react'
import { Link } from "react-router-dom";


function Support() {
  const listItems = ["Account", "Help", "Contact Us", 'Customer Support'];

  return (
    <>
     <div className="w-full p-6 md:w-1/2 lg:w-2/12">
        <div className="h-full">
          <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500">
            Support
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
  )
}

export default Support