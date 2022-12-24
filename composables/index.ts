export const useCurrentPage = () => {
  return useState("currentPage", () => "Dashboard");
};

export const useApiURL = () =>
  useState("apiURL", () => "http://localhost:8000");

export const useBaseFetch = (url: string, options = {}) => {
  if (!options.headers) {
    var token = localStorage.getItem("auth_token");
    if (token) options.headers = { Authorization: `Token ${token}` };
  }
  return $fetch(`http://localhost:8000${url}`, options);
};

export const useNextPage = () => useState("nextPage", () => null);
export const usePreviousPage = () => useState("previousPage", () => null);
export const usePageCount = () => useState("pageCount", () => null);
export const useSelectedPaginationPage = () =>
  useState("selectedPaginationPage", () => null);
