import queryString from "query-string";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export const useUrl = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const addQueryToUrl = (newQuery: {}) => {
    let query: any = queryString.parse(params.toString());
    if (!query) query = {};

    query = { ...query, ...newQuery };

    const url = queryString.stringifyUrl({
      url: pathname,
      query,
    });

    router.push(url);
  };

  const getValue = (field: string) => {
    return params.get(field);
  };

  return { addQueryToUrl, getValue };
};

export default useUrl;
