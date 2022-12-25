export const useCurrentPage = () => {
  return useState("currentPage", () => "Dashboard");
};

export const useApiURL = () =>
  useState("apiURL", () => "http://localhost:8000");

export const useBaseFetch = (url: string, options = {}) => {
  if (!options.headers) {
    var token = useCookie('auth_token');
    if(!token.value){
      const router = useRouter()
      router.push("/")
    }
    if (token.value) options.headers = { Authorization: `Token ${token.value}` };
  }
  return $fetch(`http://localhost:8000${url}`, options);
};

export const useNextPage = () => useState("nextPage", () => null);
export const usePreviousPage = () => useState("previousPage", () => null);
export const usePageCount = () => useState("pageCount", () => null);
export const useSelectedPaginationPage = () =>
  useState("selectedPaginationPage", () => null);

