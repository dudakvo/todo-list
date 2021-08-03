import { IProps } from "./types";

export default function Filter(props: IProps) {
  const { handleFilter, filter } = props;
  return (
    <input
      type="text"
      onChange={handleFilter}
      value={filter}
      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 
  block  sm:text-sm border-gray-300 rounded-md w-9/12 m-auto"
      placeholder="filter"
    />
  );
}
