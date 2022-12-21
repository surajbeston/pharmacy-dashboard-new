<template>
    <div class="relative">
        <div @mouseover="showTooltip = true" @mouseleave="showTooltip = false">
            <slot>

            </slot>
        </div>
        <div v-show="showTooltip" class="z-10 absolute left-1/2 transform -translate-x-1/2" :class="{'top-full': bottom, 'bottom-full': !bottom}">
            <div class="bg-white border border-gray-200 p-2 rounded shadow-lg overflow-hidden mb-2">
                <div class="text-xs whitespace-nowrap">{{ text }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(["text", "bottom"])
const showTooltip = ref(false)

</script>