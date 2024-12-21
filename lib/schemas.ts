import { z } from 'zod'

/**
 * Regular expression for validating Semantic Versioning (SemVer) format.
 *
 * Format: MAJOR.MINOR.PATCH[-PRERELEASE][+BUILD]
 * - MAJOR, MINOR, PATCH: non-negative integers without leading zeros
 * - PRERELEASE: optional, dot-separated identifiers (alphanumeric and hyphens)
 * - BUILD: optional metadata (alphanumeric and hyphens)
 *
 * Examples:
 * - Valid: 2.1.0, 1.0.0-alpha, 1.0.0-beta.11, 2.1.0+build.123
 * - Invalid: 2.1, 02.1.0, 2.1.0., 2.1.0-
 */
export const semverRegex =
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/

export const notificationSchema = z
  .object({
    type: z.enum(['platform_update', 'comment_tag', 'access_granted', 'join_workspace']),
    personName: z.string().trim().optional(),
    releaseNumber: z
      .string()
      .regex(semverRegex, 'Must be a valid semantic version (e.g., 2.1.0)')
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'platform_update') {
        return data.releaseNumber != null && data.personName == null
      }
      return data.personName != null && data.personName.length > 0 && data.releaseNumber == null
    },
    (data) => ({
      message:
        data.type === 'platform_update'
          ? 'Please enter a release number.'
          : 'Please enter a person name.',
    })
  )

export type NotificationInput = z.infer<typeof notificationSchema>
