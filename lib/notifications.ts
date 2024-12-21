import { InfoCircledIcon, PersonIcon } from '@radix-ui/react-icons'
import type { NotificationType } from '@prisma/client'
import type { Notification } from '@/providers/notifications'
import { COLORS } from './colors'

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
