<template>
    <div class="overflow-x-auto">

        <table class="table-auto w-full divide-y divide-gray-200">
            <!-- Table body -->
            <tbody class="text-sm">
                <!-- Row -->
                <tr>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[10%]">
                        <input type="checkbox" class="form-checkbox" v-model="orderItem.selected" />
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">Medicine:
                            <a :href="`/medicine/${orderItem?.medicine?.slug}`" class="underline font-bold"> {{
                                    orderItem?.medicine?.brand_name
                            }}</a>
                        </div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[18%]">
                        <div class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                            Quantity: <span class="font-bold">{{ orderItem?.quantity }}</span></div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[18%]">
                        <div class="text-center">Unit Price: <span class="font-bold"> Rs. {{
                                orderItem?.last_sales_price
                        }}</span></div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[26%]">
                        <div class="text-left">Total Price: <span class="font-bold">Rs. {{
                                orderItem?.total_order_amount
                        }}</span></div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[18%]">
                        <div v-if="quantityToAllocate > 0"
                            class="text-xs inline-flex font-medium bg-red-100 text-red-600 rounded-full text-center px-2.5 py-1">
                            Unallocated</div>
                        <div v-else
                            class="text-xs inline-flex font-medium bg-green-100 text-green-600 rounded-full text-center px-2.5 py-1">
                            Allocated</div>
                    </td>
                    <td class="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-[18%]">
                        <div class="flex items-end">
                            <button class="text-gray-400 hover:text-gray-500 transform"
                                :class="{ 'rotate-180': orderItem.accordionOpen }" @click.prevent="showPurchaseItems()"
                                :aria-expanded="orderItem.accordionOpen" aria-controls="description-01">
                                <span class="sr-only">Menu</span>
                                <svg class="w-8 h-8 fill-current" viewBox="0 0 32 32">
                                    <path d="M16 20l-5.4-5.4 1.4-1.4 4 4 4-4 1.4 1.4z" />
                                </svg>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr v-show="orderItem.accordionOpen" class="">
                    <td colspan="10" class="px-2 first:pl-5 last:pr-5 py-3">

                        <div v-if="!loading && purchaseItems.length > 0">
                            <div class="flex justify-end mb-2 gap-5">
                                <div>
                                    <button @click="allocateForItem"
                                        class="btn-sm allocate-border   hover:bg-indigo-600 text-indigo-600 hover:text-white mt-5">Allocate
                                    </button>
                                </div>
                                <div class="flex flex-col gap-2">
                                    <div>
                                        Quantity Allocated: <span class="font-bold">{{ quantityAllocated }}</span>
                                    </div>
                                    <div>
                                        Quantity to Allocate: <span class="font-bold">{{ quantityToAllocate }}</span>
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-sm font-medium mb-1" for="country">Filter Order
                                        Items</label>
                                    <select class="form-select" v-model="selectedFilter">
                                        <option value="manufacture_date">Manufacture Date(Low - High)</option>
                                        <option value="-manufacture_date">Manufacture Date(High - Low)</option>
                                        <option value="expiry_date">Expiry Date(Low - High)</option>
                                        <option value="-expiry_date">Expiry Date(High - Low)</option>
                                        <option value="quantity">Quantity(Low - High)</option>
                                        <option value="-quantity">Quantity(High - Low)</option>
                                        <option value="mrp">MRP(Low - High)</option>
                                        <option value="-mrp">MRP(High - Low)</option>
                                        <option value="margin">Margin(Low - High)</option>
                                        <option value="-margin">Margin(High - Low)</option>
                                        <option value="cost_price">Cost Price(Low - High)</option>
                                        <option value="-cost_price">Cost Price(High - Low)</option>
                                        <option value="sales_price">Sales Price(Low - High)</option>
                                        <option value="-sales_price">Sales Price(High - Low)</option>
                                    </select>
                                </div>
                            </div>
                            <div v-for="purchaseItem in purchaseItems" :key="purchaseItem?.id">
                                <PurchaseItem :purchase-item="purchaseItem" :quantity-to-allocate="quantityToAllocate"
                                    class="ml-[50px]"></PurchaseItem>
                            </div>
                            <div class="flex justify-center">
                                <button v-show="nextPage" @click="loadNextPage()"
                                    class="btn bg-indigo-500 hover:bg-indigo-600 text-white m-2">More Items</button>
                            </div>
                        </div>
                    </td>
                </tr>

            </tbody>
        </table>
        <div v-if="loading" class=" w-full ml-1 m-5">
            <Loader :loading="loading"></Loader>
        </div>
    </div>
</template>

<script setup>
import Loader from '../utils/Loader.vue';
import PurchaseItem from './PurchaseItem.vue';


const props = defineProps(["orderItem", "autoAllocate"])
const emit = defineEmits(["allocated"])
const purchaseItems = ref([])
const loading = ref(false)
const nextPage = ref(null)

const apiURL = useApiURL()

const selectedFilter = ref('expiry_date')


function showPurchaseItems() {
    props.orderItem.accordionOpen = !props.orderItem.accordionOpen

    if (purchaseItems.value.length == 0) {
        getPurchaseItems()
    }
}

async function getPurchaseItems() {
    loading.value = true
    var url = `/admin-api/meds/purchaseitem/?medicine=${props.orderItem.medicine.slug}`
    if (selectedFilter.value != "") {
        url += `&ordering=${selectedFilter.value}`
    }
    var response = await useBaseFetch(url)
    response.results.forEach((item) => {
        item.allocation = 0
    })
    purchaseItems.value = response.results
    nextPage.value = response.next
    loading.value = false
}

async function loadNextPage() {
    var url = nextPage.value.replace("http", "https").replace(apiURL.value, "")
    console.log(url)
    var response = await useBaseFetch(url)
    response.results.forEach((each) => {
        purchaseItems.value.push(each)
    })
    nextPage.value = response.next
    loading.value = false
}

watch(selectedFilter, (newFilter) => {
    getPurchaseItems()
})

const quantityAllocated = computed(() => {
    var total = 0
    purchaseItems.value.forEach((each) => {
        total += each.allocation
    })
    return total
})

const quantityToAllocate = computed(() => {
    if (props.orderItem) {
        return props.orderItem.quantity - quantityAllocated.value
    }
    return 0
})

watch(quantityToAllocate, (toAllocate) => {
    if (toAllocate == 0){
        var items = []
        purchaseItems.value.forEach((item) => {
            if (item.allocation > 0){
                items.push(item)
            }
        })
        props.orderItem.supplyItems = items
        props.orderItem.allocated = true
        emit("allocated", true)
    }
    else{
        emit("allocated", false)
    }
})


function allocateForItem() {
    if (quantityToAllocate.value > 0) {
        for (var purchaseItem of purchaseItems.value) {
            if (purchaseItem.quantity >= quantityToAllocate.value) {
                purchaseItem.allocation = quantityToAllocate.value
            }
            else {
                purchaseItem.allocation = purchaseItem.quantity
            }
            console.log("quantity to allocate", quantityToAllocate.value)
            if (quantityToAllocate.value <= 0) break
        }
    }
}

const autoAllocate = computed(() => props.autoAllocate)

watch(autoAllocate, async (allocate) => {
    if (allocate) {
        loading.value = true
        var url = `/admin-api/meds/purchaseitem/?medicine=${props.orderItem.medicine.slug}&ordering=expiry_date&limit=10000`
        
        var response = await useBaseFetch(url)
        response.results.forEach((item) => {
            item.allocation = 0
        })
        purchaseItems.value = response.results
        allocateForItem()
        loading.value = false
    }
})

</script>

<style>
.allocate-border {
    border: 2px solid;
    border-color: rgb(79 70 229 / var(--tw-bg-opacity));
}
</style>