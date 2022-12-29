<template>
    <div class="px-6 py-8 bg-gray-50 border border-gray-200 rounded-sm">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <nav class="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
                <ul class="flex justify-center">
                    <li v-if="previousPage" class="ml-3 first:ml-0">
                        <a class="btn bg-white border-gray-200 text-indigo-500 cursor-pointer"
                            @click="gotoPreviousPage()">&lt;-
                            Previous</a>
                    </li>
                    <li v-if="nextPage" class="ml-3 first:ml-0">
                        <a class="btn bg-white border-gray-200 hover:border-gray-300 text-indigo-500 cursor-pointer"
                            @click="gotoNextPage()">Next -&gt;</a>
                    </li>
                </ul>
            </nav>
            <div class="text-sm text-gray-500 text-center sm:text-left">
                Showing <span class="font-medium text-gray-600">{{ paginationOffsetLeft }}</span>
                to
                <span class="font-medium text-gray-600">{{ paginationOffsetRight }}</span> of
                <span class="font-medium text-gray-600">{{ pageCount }}</span> results
            </div>
        </div>
    </div>
</template>

<script setup>


const props = defineProps(["data"])

const emit = defineEmits(["anotherPage"])

const pageCount = usePageCount()
const nextPage = useNextPage()
const previousPage = usePreviousPage()
const apiURL = useApiURL()

const paginationOffsetLeft = ref(0)
const paginationOffsetRight = ref(0)

function gotoNextPage() {
    if (nextPage) {
        emit("anotherPage", cleanLink(nextPage.value))
    }
}

function gotoPreviousPage() {
    if (previousPage) {
        emit("anotherPage", cleanLink(previousPage.value))
    }
}

function cleanLink(link) {
    if (!(link.includes("localhost") || link.includes("127.0.0.1"))) {
        var newLink = link.replace('http', 'https')
    }
    else {
        var newLink = link
    }
    return newLink.replace(apiURL.value, "")
}

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

watch(props, (next) => {
    console.log("watching next page")
    if (nextPage.value) {
        var limit = getParameterByName("limit", nextPage.value)
        var offset = getParameterByName("offset", nextPage.value)

        paginationOffsetLeft.value = offset - limit + 1
        paginationOffsetRight.value = offset
    }
    else if (previousPage.value) {
        var limit = getParameterByName("limit", previousPage.value)
        var offset = getParameterByName("offset", previousPage.value)

        paginationOffsetLeft.value = parseInt(offset) + parseInt(limit) + 1
        paginationOffsetRight.value = parseInt(offset) + parseInt(limit) + parseInt(limit)
    }
})

watch(props, (data) => {
    if (data) {
        pageCount.value = data.data.count
        nextPage.value = data.data.next
        previousPage.value = data.data.previous
    }
})

</script>