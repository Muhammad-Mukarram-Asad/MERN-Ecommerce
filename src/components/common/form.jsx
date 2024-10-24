import React from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

const ComponentForm = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputByComponentType = (getControlItem) => {
    let value = formData[getControlItem.name] || "";
    let element = null;

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
            required={getControlItem.required}
          />
        );
        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) => ({
              ...formData,
              [getControlItem.name]: value,
            })}
          >
            <SelectTrigger>
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options.length > 0 &&
                getControlItem.options.map((option, index) => (
                  <SelectItem value={option} key={index}>
                    {option}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            type={getControlItem.type}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            required={getControlItem.required}
          />
        );
    }

    return element;
  };
  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3">
        {formControls.map((controlItem, index) => {
          return (
            <div key={index} className="grid w-full gap-1.5">
              <Label htmlFor={controlItem.name} className="mb-1 text-left">
                {controlItem.label}
              </Label>
              {renderInputByComponentType(controlItem)}
            </div>
          );
        })}
      </div>
      <button type="submit" className="mt-3 w-full text-white">
        {buttonText || "Submit"}
      </button>
    </form>
  );
};

export default ComponentForm;
