<template>
    <div>
        <OrderBatchAccordion></OrderBatchAccordion>
        <pre>{{ order }}</pre>
    </div>
</template>

<script setup>

import OrderBatchAccordion from "~/components/order/OrderBatchAccordion.vue"

const router = useRouter()
const orderId = ref(null)

const order = ref({})

onMounted(() => {
    const route = useRoute()

    if (route.params.order){
        orderId.value = route.params.order
        getOrder(orderId.value)
    }
    else{
        router.replace("/")
    }
})

async function getOrder(id) {
    order.value = await useBaseFetch(`/admin-api/meds/orderbatch/${id}/`)

}

</script>