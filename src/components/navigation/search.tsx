//import { HiOutlineMagnifyingGlass, HiOutlineMicrophone } from "react-icons/hi2";
import { FormProvider, useForm } from "react-hook-form";

type StatisticsModalSearchBarProps = {
  setSearch: (search: string) => void;
};

type SearchType = {
  search: string;
};

const Search = ({ setSearch }: StatisticsModalSearchBarProps) => {
  const searchForm = useForm<SearchType>();

  return (
    <FormProvider {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit((data) => setSearch(data.search))}
      >
        <div>
          <input
            type="text"
            className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 max-w-60"
            placeholder="Search..."
            {...searchForm.register("search")}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Search;
