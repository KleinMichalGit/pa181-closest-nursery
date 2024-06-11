import { FormProvider, useForm } from "react-hook-form";
import { useLanguageContext } from "@/contexts/language-context";

type StatisticsModalSearchBarProps = {
  setSearch: (search: string) => void;
  searchId: string;
};

type SearchType = {
  search: string;
};

const Search = ({ setSearch, searchId }: StatisticsModalSearchBarProps) => {
  const searchForm = useForm<SearchType>();
  const { translations } = useLanguageContext();

  return (
    <FormProvider {...searchForm}>
      <form
        onSubmit={searchForm.handleSubmit((data) => setSearch(data.search))}
      >
        <div>
          <label htmlFor={searchId} className="sr-only">
            {translations.search}
          </label>
          <input
            type="text"
            id={searchId}
            className="p-2.5 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 max-w-60"
            placeholder={translations.search}
            {...searchForm.register("search")}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default Search;
