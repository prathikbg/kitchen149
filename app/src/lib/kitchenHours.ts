// Kitchen 149 hours: opens 6 PM, closes 2 AM next day.
// Shared status helper so LiveClock + HungryWeGotYou stay in sync.

export type KitchenStatus = {
  isOpen: boolean;
  /** rough urgency tier — used to color status pills */
  tier: 'open' | 'closing-soon' | 'closed' | 'opening-soon';
  /** Short status label, e.g. "Kitchen open" / "Closes in 47m" */
  label: string;
  /** Long-form sub label, e.g. "Ordering until 2:00 AM" */
  sub: string;
  /** Brand color for the active state */
  color: string;
};

const OPEN_HOUR = 18; // 6 PM
const CLOSE_HOUR = 2; // 2 AM (next day)

function fmtDuration(totalMin: number): string {
  if (totalMin <= 0) return '0m';
  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function getKitchenStatus(now: Date = new Date()): KitchenStatus {
  const h = now.getHours();
  const m = now.getMinutes();
  const mins = h * 60 + m;
  const openMins = OPEN_HOUR * 60;
  const closeMins = (24 + CLOSE_HOUR) * 60; // 26:00 == 2 AM next day

  // Kitchen open window: [18:00, 26:00) when viewed on the "open day"
  // We're "inside the window" if either (h >= 18) OR (h < 2)
  const isOpen = h >= OPEN_HOUR || h < CLOSE_HOUR;

  if (isOpen) {
    // Time until close (in mins). If h < 2, closeMins refers to today's 2 AM, not +24.
    const effectiveNow = h < CLOSE_HOUR ? mins + 24 * 60 : mins;
    const untilClose = closeMins - effectiveNow;
    const closingSoon = untilClose <= 60;
    return {
      isOpen: true,
      tier: closingSoon ? 'closing-soon' : 'open',
      label: closingSoon ? `Closes in ${fmtDuration(untilClose)}` : 'Kitchen open · ordering now',
      sub: `Last orders at 2:00 AM`,
      color: closingSoon ? '#FB923C' : '#E11D48',
    };
  }

  // Closed: compute time until 6 PM today
  const untilOpen = openMins - mins;
  const openingSoon = untilOpen <= 120;
  return {
    isOpen: false,
    tier: openingSoon ? 'opening-soon' : 'closed',
    label: openingSoon ? `Opens in ${fmtDuration(untilOpen)}` : `We open at 6 PM`,
    sub: openingSoon ? 'Ordering resumes shortly' : 'Serving Bengaluru till 2 AM',
    color: openingSoon ? '#FACC15' : '#A3A3A3',
  };
}
