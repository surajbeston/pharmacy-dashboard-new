export const useCurrentPage = () => {
  return useState("currentPage", () => "Dashboard");
};

export const useApiURL = () =>
  useState("apiURL", () => "http://localhost:8000");

export const useImageRoot = () =>
  useState("imageRoot", () => "https://pharmacy-ecom.fly.dev");

export const useUploadedImageRoot = 
  () => useState("uploadedImageRoot", () => "http://localhost:8000")

export const useBaseFetch = (url: string, options = {}) => {
  const router = useRouter()
  if (!options.headers) {
    var token = useCookie('auth_token');
    if (!token.value) {
      router.push("/")
    }
    if (token.value) options.headers = { Authorization: `Token ${token.value}` };
  }
  const fetching = useFetching()
  return $fetch(`http://localhost:8000${url}`, {
    ...options,

    onRequest({ request, options }) {
      fetching.value = true
    },

    onResponse({ request, response, options }) {
      fetching.value = false
    },
    onResponseError({ request, response, options }) {
      fetching.value = false
      var responseData = response._data
      var showTexts = []
      if (responseData) {
        console.log(responseData)
        if (typeof (responseData) == 'object') {
          Object.keys(responseData).forEach((key) => {
            if (typeof (responseData[key]) == 'object') {
              var showText = ""
              responseData[key].forEach((text) => {
                showText += text + " "
              })
              var cleanKey = key.split("_").join(" ").toLocaleUpperCase()
              showTexts.push(cleanKey + " : " + showText)
            }
            else {
              console.log(responseData[key])
              if (responseData[key] == 'Invalid token.') {
                console.log("reached here")
                console.log("reached here 2")
              }
              showTexts.push(key + " : " + responseData[key])
            }
          })
        }
        else {
          showTexts = [responseData]
        }
      }
      else {
        showTexts = ["Something went wrong!"]
      }
      const fetchErrors = useFetchErrors()
      fetchErrors.value = showTexts
    }
  })
};

export const useFetchErrors = () => useState("fetchErrors", () => []);
export const useSuccessMessages = () => useState("successMessages", () => []);
export const useFetching = () => useState("fetching", () => false);


export const useNextPage = () => useState("nextPage", () => null);
export const usePreviousPage = () => useState("previousPage", () => null);
export const usePageCount = () => useState("pageCount", () => null);
export const useSelectedPaginationPage = () =>
  useState("selectedPaginationPage", () => null);

