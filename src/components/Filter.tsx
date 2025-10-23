import React, { useState } from "react";
import { DistrictOptions } from "../data/DistrictOptions.ts";
import { getDistrict } from "../services/getDistrict.ts";
import { useMapUpdate } from "../providers/MapProvider.tsx";

const FilterComponent: React.FC = () => {
  const [formValues, setFormValues] = useState({
    district: DistrictOptions.length > 0 ? DistrictOptions[0].key : "",
    resolution: 0,
  });

  const [expanded, setExpanded] = useState(true); // estado de expansão

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: name === "resolution" ? Number(value) : value,
    }));
  };

  const { updateMap } = useMapUpdate();

  const handleFilter = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const districtsToRender = getDistrict(
      formValues.district,
      formValues.resolution
    );
    updateMap(districtsToRender);
  };

  return (
      <details className="dropdown filter-card">
        <summary>Filter</summary>
        <form className="card row">
          <div className="">
            <label className="mb">District</label>
            <select
            className="col-12"
              name="district"
              onChange={handleChange}
              value={formValues.district}
            >
              {DistrictOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.value}
                </option>
              ))}
            </select>
          </div>

          <div className="">
            <label className="mb">Algorithm tolerance</label>
            <input
              type="number"
              name="resolution"
              value={formValues.resolution}
              onChange={handleChange}
              className="col-6"
              step="0.00001"
            />
          </div>

          <button
            onClick={handleFilter}
            className="button primary mt-1"
            type="button"
          >
            Apply Filter
          </button>
        </form>
      </details>
  );
};

export default FilterComponent;
