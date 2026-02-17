import React from "react";
// import LayoutHandler from "./LayoutHandler";
import DropdownSelect from "../common/DropdownSelect";
// import PropertyGridItems from "./PropertyGridItems";
import PropertyListItems from "./PropertyListItems";
import FilterSidebarLeft from "./FilterSidebarLeft";
import Sidebar from "./Sidebar";

export default function Properties({ defaultGrid = false }) {
  return (
    <>
    <section className="section-property-layout">
      <div className="tf-container">
        <div className="row">
         <div className="col-12">
            <div className="box-title">
              <h2>Properties in city</h2>
              <div className="right">
                <div
                    className="filter-popup"
                    data-bs-toggle="offcanvas"
                    href="#filter-sidbar-left"
                    role="button"
                  >
                    Filter
                    <div className="icons">
                      <svg
                        width={20}
                        height={20}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M21 4H14"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10 4H3"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 12H12"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 12H3"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 20H16"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12 20H3"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M14 2V6"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8 10V14"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M16 18V22"
                          stroke="#1b6c9f"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>
                {/* <ul className="nav-tab-filter group-layout" role="tablist">
                  <LayoutHandler defaultGrid={defaultGrid} />
                </ul> */}
                <DropdownSelect
                  addtionalParentClass="select-filter list-sort"
                  options={["Sort by (Default)", "Newest", "Oldest"]}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-8">
            <div className="flat-animate-tab">
              <div className="tab-content">
                <div
                  className={`tab-pane ${!defaultGrid ? " active show" : ""}`}
                  id="listLayout"
                  role="tabpanel"
                >
                  <div className="wrap-list">
                    <PropertyListItems />
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="wrap-pagination">
              <p className="text-1">Showing 1-8 of 42 results.</p>
              <ul className="wg-pagination">
                <li className="arrow">
                  <a href="#">
                    <i className="icon-arrow-left" />
                  </a>
                </li>
                <li>
                  <a href="#">1</a>
                </li>
                <li className="active">
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">...</a>
                </li>
                <li>
                  <a href="#">20</a>
                </li>
                <li className="arrow">
                  <a href="#">
                    <i className="icon-arrow-right" />
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </section>
    <FilterSidebarLeft />
    </>
  );
}
