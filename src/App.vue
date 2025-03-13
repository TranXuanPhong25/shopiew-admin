<template>
  <n-layout has-sider class="h-full">
    <!-- Full height -->
    <!-- Sidebar -->
    <n-layout-sider
      class="!fixed h-screen left-0 top-0 z-10 transition-all duration-300"
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      show-trigger="bar"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      Menu :D
      <n-menu
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :render-label="renderMenuLabel"
        :render-icon="renderMenuIcon"
        :expand-icon="expandIcon"
      />
    </n-layout-sider>

    <!-- Main Layout -->
    <n-space
      vertical
      class="w-full p-4 bg-gray-100 !space-y-3 transition-all duration-300 "
      :style="{ marginLeft: collapsed ? '64px' : '240px' }"
    >
      <!-- Take full height of screen minus sider -->
      <n-flex class="p-4 bg-white rounded-full" justify="space-between">
        <div>
          <NInput placeholder="Search" round size="large" />
        </div>
        <n-flex justify="justify-center">
          <NotificationDropdown />
          <AvatarDropdown />
        </n-flex>
      </n-flex>
      <div class="p-4 bg-white min-h-screen rounded-2xl">
        <RouterView />
      </div>
    </n-space>
  </n-layout>
</template>

<script lang="ts">
import type { MenuOption } from 'naive-ui'
import { BookmarkOutline, CaretDownOutline } from '@vicons/ionicons5'
import { defineComponent, h, ref } from 'vue'
import { NIcon } from 'naive-ui'
import AvatarDropdown from '@/components/ui/AvatarDropdown.vue'
import NotificationDropdown from '@/components/ui/NotificationDropdown.vue'

const menuOptions: MenuOption[] = [
  {
    label: 'Hear the Wind Sing',
    key: 'hear-the-wind-sing',
    href: 'https://en.wikipedia.org/wiki/Hear_the_Wind_Sing',
  },
  {
    label: 'Pinball 1973',
    key: 'pinball-1973',
    disabled: true,
    children: [
      {
        label: 'Rat',
        key: 'rat',
      },
    ],
  },
  {
    label: 'A Wild Sheep Chase',
    key: 'a-wild-sheep-chase',
    disabled: true,
  },
  {
    label: 'Dance Dance Dance',
    key: 'Dance Dance Dance',
    children: [
      {
        type: 'group',
        label: 'People',
        key: 'people',
        children: [
          {
            label: 'Narrator',
            key: 'narrator',
          },
          {
            label: 'Sheep Man',
            key: 'sheep-man',
          },
        ],
      },
      {
        label: 'Beverage',
        key: 'beverage',
        children: [
          {
            label: 'Whisky',
            key: 'whisky',
            href: 'https://en.wikipedia.org/wiki/Whisky',
          },
        ],
      },
      {
        label: 'Food',
        key: 'food',
        children: [
          {
            label: 'Sandwich',
            key: 'sandwich',
          },
        ],
      },
      {
        label: 'The past increases. The future recedes.',
        key: 'the-past-increases-the-future-recedes',
      },
    ],
  },
]

export default defineComponent({
  components: { NotificationDropdown, AvatarDropdown },
  setup() {
    return {
      menuOptions,
      collapsed: ref(true),
      renderMenuLabel(option: MenuOption) {
        if ('href' in option) {
          return h('a', { href: option.href, target: '_blank' }, [option.label as string])
        }
        return option.label as string
      },
      renderMenuIcon(option: MenuOption) {
        // return render placeholder for indent
        if (option.key === 'sheep-man') return true
        // return falsy, don't render icon placeholder
        if (option.key === 'food') return null
        return h(NIcon, null, { default: () => h(BookmarkOutline) })
      },
      expandIcon() {
        return h(NIcon, null, { default: () => h(CaretDownOutline) })
      },
    }
  },
})
</script>
