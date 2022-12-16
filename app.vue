<template>
    <NuxtLayout>
        <div class="flex h-screen overflow-hidden bg-gray-100">
            <SideBar></SideBar>
            <NuxtPage class="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden bg-white" />
        </div>
    </NuxtLayout>
</template>