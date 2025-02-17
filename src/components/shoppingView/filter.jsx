import React, { Fragment } from "react";
import { filterOptions } from "@/config";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Separator } from "../ui/separator";

const ProductFilter = ({ filters, handleFilters }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>
      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((key) => {
          return (
            <Fragment key={key}>
              <h3 className="text-base font-normal">{key}</h3>
              <div className="grid gap-2 mt-2">
                {filterOptions[key].map((item) => {
                  return (
                    <Label
                      key={item.id}
                      className="flex font-medium items-center gap-2 cursor-pointer"
                    >
                      <Checkbox
                        onCheckedChange={() => handleFilters(key, item.id)}
                        checked={filters[key]?.includes(item.id)}
                      />
                      <span>{item.label}</span>
                    </Label>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProductFilter;
