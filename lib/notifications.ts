import { InfoCircledIcon, PersonIcon } from '@radix-ui/react-icons'
import type { Notification, NotificationType } from '@/lib/schemas'
import { COLORS } from './colors'

export const notificationQueryConfig = {
  listStaleTime: 1000 * 3, // 3 seconds
  listRefetchInterval: 1000 * 3,
  unreadStaleTime: 1000 * 2, // 2 seconds
  unreadRefetchInterval: 1000 * 2,
  pageSize: 10,
} as const

export type NotificationTypeConfig = {
  label: string
  Icon: typeof InfoCircledIcon | typeof PersonIcon
  color: string
  getText: (notification: Notification) => string
  route?: string
}

export const notificationTypes: Record<NotificationType, NotificationTypeConfig> = {
  platform_update: {
    label: 'Platform Update',
    Icon: InfoCircledIcon,
    color: COLORS.BLUE,
    getText: () => `New features - see what's new`,
  },
  comment_tag: {
    label: 'Comment Tag',
    Icon: PersonIcon,
    color: COLORS.VIOLET,
    getText: (n) => `${n.personName} tagged you in a comment`,
    route: '/comments',
  },
  access_granted: {
    label: 'Access Granted',
    Icon: PersonIcon,
    color: COLORS.EMERALD,
    getText: (n) => `${n.personName} shared a chat with you`,
    route: '/chats',
  },
  join_workspace: {
    label: 'Join Workspace',
    Icon: PersonIcon,
    color: COLORS.AMBER,
    getText: (n) => `${n.personName} joined your workspace`,
    route: '/workspace',
  },
}
