<template>
    <NuxtLayout>
        <div class="flex h-screen overflow-hidden bg-gray-100">
            <SideBar></SideBar>
            <div class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white">
                <HorizontalLoader class="mt-5" :loading="fetching"></HorizontalLoader>
                <FetchErrors></FetchErrors>
                <Success></Success>
                <NuxtPage />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup>
import FetchErrors from '~~/components/alert/FetchErrors.vue';
import Success from './components/alert/Success.vue';
import HorizontalLoader from '~/components/utils/HorizontalLoader.vue';

const fetching = useFetching()
</script>