import {BrowserTabsPain} from './BrowserTabsPain';
import {ColdOpenTabs} from './ColdOpenTabs';
import {ScoutTypingIntro} from './ScoutTypingIntro';
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
  coldOpenTabs: ColdOpenTabs,
  scoutTypingIntro: ScoutTypingIntro,
  busyworkMontage: BusyworkMontage,
  rejectionsPain: RejectionsPain,
  jobCardApply: JobCardApply,
  findContacts: FindContacts,
  emailDraft: EmailDraft,
  inboxDrafts: InboxDrafts,
  statStack: StatStack,
} as const;

export type MockupName = keyof typeof mockups;
