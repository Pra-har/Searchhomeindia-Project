"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export default function CityDropdown({
  value,
  options = [],
  onChange,
  className = "",
  menuClassName = "",
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const safeValue = useMemo(() => String(value || ""), [value]);
  const activeOption = useMemo(
    () => options.find((item) => item.slug === safeValue) || options[0],
    [options, safeValue]
  );

  useEffect(() => {
    const onOutsideClick = (event) => {
      if (!wrapRef.current?.contains(event.target)) setOpen(false);
    };
    const onEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onOutsideClick);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutsideClick);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  return (
    <div className={`city-dropdown ${className}`.trim()} ref={wrapRef}>
      <button
        type="button"
        className={`city-dropdown-trigger${open ? " is-open" : ""}`}
        onClick={() => setOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="city-dropdown-label">{activeOption?.label || "All India"}</span>
        <i className="icon-CaretDown" />
      </button>

      {open ? (
        <div className={`city-dropdown-menu ${menuClassName}`.trim()} role="listbox">
          {options.map((item) => {
            const isActive = item.slug === safeValue;
            return (
              <button
                type="button"
                key={`city-opt-${item.slug}`}
                className={`city-dropdown-option${isActive ? " is-active" : ""}`}
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onChange?.(item.slug);
                  setOpen(false);
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
