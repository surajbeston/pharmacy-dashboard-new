<template>
    <div>
        {{thisCurrentPage}}
    </div>
</template>

<script setup >

const thisCurrentPage = useCurrentPage()

onMounted(() => {
    thisCurrentPage.value = "Dashboard"
})
</script>

