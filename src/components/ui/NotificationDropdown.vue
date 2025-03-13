<template>
  <n-dropdown :options="options" trigger="click">
    <n-button circle quaternary size="medium">
      <n-icon size="28">
        <BellIcon />
      </n-icon>
    </n-button>
  </n-dropdown>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { NIcon } from 'naive-ui'
import {
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  PersonCircleOutline as UserIcon,
  NotificationsOutline as BellIcon
} from '@vicons/ionicons5'

// Function to render icons inside dropdown
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// Options for dropdown menu
const options = [
  {
    label: 'Profile',
    key: 'profile',
    icon: renderIcon(UserIcon)
  },
  {
    label: 'Edit Profile',
    key: 'editProfile',
    icon: renderIcon(EditIcon)
  },
  {
    label: 'Logout',
    key: 'logout',
    icon: renderIcon(LogoutIcon)
  }
]
</script>
