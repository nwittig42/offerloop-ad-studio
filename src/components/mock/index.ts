import {BrowserTabsPain} from './BrowserTabsPain';
import {BusyworkMontage} from './BusyworkMontage';
import {RejectionsPain} from './RejectionsPain';
import {JobCardApply} from './JobCardApply';
import {FindContacts} from './FindContacts';
import {EmailDraft} from './EmailDraft';
import {InboxDrafts} from './InboxDrafts';
import {StatStack} from './StatStack';

/** Animated mock-UI scenes; plans reference these by key via `type: 'mockup'`. */
export const mockups = {
  browserTabsPain: BrowserTabsPain,
  busyworkMontage: BusyworkMontage,
  rejectionsPain: RejectionsPain,
  jobCardApply: JobCardApply,
  findContacts: FindContacts,
  emailDraft: EmailDraft,
  inboxDrafts: InboxDrafts,
  statStack: StatStack,
} as const;

export type MockupName = keyof typeof mockups;
