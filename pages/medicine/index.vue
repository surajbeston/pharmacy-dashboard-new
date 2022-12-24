<template>
    <div>
        <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

            <main>
                <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                    <!-- Page header -->
                    <div class="mb-5">
                        <!-- Title -->
                        <h1 class="text-2xl md:text-3xl text-gray-800 font-bold">Medicines</h1>
                    </div>
                    <div>
                        <div class="max-w-xl mb-5 relative">
                            <div class="relative">
                                <label for="app-search" class="sr-only">Search</label>
                                <input v-model="searchText" id="app-search" @blur="hideSuggestions()"
                                    @keyup.enter="search()" class="form-input w-full  py-3 focus:border-gray-300"
                                    style="padding-left: 35px"
                                    placeholder="Search medicine, generic name or manufacturer" autocomplete="off" />
                                <button class="absolute inset-0 right-auto group" type="submit" aria-label="Search"
                                    @click="search()">
                                    <svg class="w-4 h-4 shrink-0 fill-current text-gray-400 group-hover:text-gray-500 ml-3 mr-2"
                                        viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                                        <path
                                            d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                                    </svg>
                                </button>
                            </div>
                            <div class="relative">
                                <div class="bg-white rounded-sm shadow-md z-10 absolute w-[36rem]">
                                    <div v-if="showSuggestions">
                                        <div v-for="suggestion in suggestions" :key="suggestion">
                                            <button tabindex="0" @click="searchSuggestion(suggestion)"
                                                class="flex items-center justify-between w-full hover:bg-gray-50 py-2 px-3 cursor-pointer">
                                                {{ suggestion }}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <!-- Page content -->
                    <div class="flex flex-wrap -m-1">
                        <div v-for="recent in recentSearches" :key="recent.id"
                            class="inline-flex min-w-40 px-4 m-1 py-2 rounded-sm text-sm bg-white shadow-lg border border-gray-200 text-gray-600 ">
                            <div class="flex w-full justify-between items-start ">
                                <div @click="search(recent.text)" class="flex cursor-pointer">
                                    <div> {{ recent.text }}</div>
                                </div>
                                <button class="opacity-70 hover:opacity-80 ml-3 mt-[3px]"
                                    @click="removeSearch(recent.id)">
                                    <div class="sr-only">Close</div>
                                    <svg class="w-4 h-4 fill-current">
                                        <path
                                            d="M7.95 6.536l4.242-4.243a1 1 0 111.415 1.414L9.364 7.95l4.243 4.242a1 1 0 11-1.415 1.415L7.95 9.364l-4.243 4.243a1 1 0 01-1.414-1.415L6.536 7.95 2.293 3.707a1 1 0 011.414-1.414L7.95 6.536z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div v-if="recentSearches.length > 0" @click="removeAllSearch()"
                            class="inline-flex min-w-40 px-4 m-1 py-2 rounded-sm text-sm bg-white shadow-lg border border-gray-200 text-gray-600 cursor-pointer">
                            <div class="flex w-full justify-between items-start">
                                <div class="flex">

                                    <div> Remove All</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ManufacturerDropdown @selected-manufacturer-id="filterByManufacturer"></ManufacturerDropdown>
                    <div v-if="!loading" class="mt-8">

                        <!-- <h2 class="text-xl leading-snug text-gray-800 font-bold mb-5" x-text="headText">
                        </h2> -->
                        <div class="grid grid-cols-12 gap-6">
                            <div v-for="medicine in medicines" :key="medicine.slug"
                                class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-gray-200 overflow-hidden">
                                <div class="flex flex-col h-full">
                                    <img class="w-full h-[200px] object-contain"
                                        :src="getImage(medicine?.extras?.image)" width="286" height="160"
                                        alt="Application 01" />
                                    <div class="grow flex flex-col p-5">
                                        <div class="grow">
                                            <header class="mb-3">
                                                <h3 class="text-lg text-gray-800 font-semibold">{{ medicine.brand_name
                                                }}</h3>
                                            </header>
                                            <div class="flex flex-wrap justify-between items-center mb-4">
                                                <div>
                                                    <div
                                                        class="inline-flex text-sm font-medium bg-green-100 text-green-600 rounded-full text-center px-2 py-0.5">
                                                        <span>{{ medicine?.generic_name.strength }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul class="text-sm space-y-2 mb-5">
                                                <li class="flex items-center">
                                                    <div>Manufacturer: <span>{{ medicine?.manufacturer?.name }}</span>
                                                    </div>
                                                </li>
                                                <li class="flex items-center">
                                                    <div>Display Name: <span>{{ medicine?.extras?.display_name }}</span>
                                                    </div>
                                                </li>
                                                <li class="flex items-center">
                                                    <div>Available:
                                                        <span v-if="medicine.available" class="text-green-500">
                                                            <i class="fa-solid fa-check"></i>
                                                            <span>(Yes)</span>
                                                        </span>
                                                        <span v-else class="text-red-500">
                                                            <i class="fa-solid fa-xmark"></i>
                                                            <span>(No)</span>
                                                        </span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div>
                                            <a class="btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                                :href="getEditLink(medicine)">Edit Medicine</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="loading" role="status" class="flex justify-center mt-10">
                        <svg aria-hidden="true"
                            class="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor" />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>

                </div>
            </main>
            <Pagination :data="paginationData" @another-page="gotoAnotherPage" ></Pagination>
        </div>
        
    </div>


</template>

<script setup>
import ManufacturerDropdown from '~~/components/utils/ManufacturerDropdown.vue';


const thisCurrentPage = useCurrentPage()

const loading = ref([true])
const medicines = ref([])
const pageCount = usePageCount()
const nextPage = useNextPage()
const previousPage = usePreviousPage()

const showSuggestions = ref(false)
const suggestions = ref([])
const paginationData = ref({})

async function gotoAnotherPage(url){
    loading.value = true
    paginationData.value =  await useBaseFetch(url)
    medicines.value = paginationData.value.results
    loading.value = false
}


// watch(response, (newResponse) => {
//     console.log(newResponse)
//     medicines.value = newResponse.results
//     count.value = newResponse.count
//     nextPage.value = newResponse.next
//     previouspage.value = newResponse.previous
// })

const searchText = ref('')

async function search() {
    loading.value = true
    if (searchText.value) {
        medicines.value = await useBaseFetch("/meds/medicine/search/", {
            method: 'POST',
            body: { query: searchText.value }
        })
        console.log(medicines.value[0])
    }
    else {
        paginationData.value = await useBaseFetch("/admin-api/meds/medicine/")
        medicines.value = paginationData.value.results
    }
    loading.value = false
    showSuggestions.value = false
}


onMounted(async () => {
    thisCurrentPage.value = "Medicine"
    getRecentSearches()
    search()
})


// Suggestion section


function searchSuggestion(suggestion) {
    searchText.value = suggestion
    search()
}

function hideSuggestions() {
    setTimeout(() => {
        showSuggestions.value = false
    }, 300);

}

async function getSuggestions() {
    if (searchText.value){
        suggestions.value = await useBaseFetch(`/meds/medicine/suggestions/`, {
            method: 'POST',
            body: { query: searchText.value }
        })
        showSuggestions.value = true
        console.log(suggestions.value)
    }
}

watch(searchText, (newValue) => {
    getSuggestions()
})



// Recent Search section



const recentSearches = ref([])
async function getRecentSearches() {
    console.log("reached here")
    var data = await useBaseFetch("/meds/search-text/")
    console.log(data)
    recentSearches.value = data.results
}

async function removeSearch(id) {
    await useBaseFetch(`/meds/search-text/${id}/remove`)
    getRecentSearches()
}

async function removeAllSearch() {
    await useBaseFetch(`/meds/search-text/remove_all/`)
    getRecentSearches()
}

// Manufacturer Section

const selectedManufacturer = ref(null)
const manufacturers = ref('')


async function getManufacturers() {
    loading.value = true
    var response = await useBaseFetch(`/admin-api/meds/manufacturer?limit=10000&offset=0`)
    manufacturers.value = response.results.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0)
    loading.value = false
}



function getImage(image) {
    if (image) {
        return `https://pharmacy-ecom.fly.dev/static/medicines/${image}`
    }
    else {
        return '../images/medicine2.svg'
    }
}

function getEditLink(medicine) {
    return `/medicine/${medicine.slug}`
}

</script>
