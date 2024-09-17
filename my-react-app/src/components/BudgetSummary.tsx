import {
  LineItemWithCategory,
  $36EnumsRecurrence,
} from "../redux/api/endpoints/calculatingParrotApi";

const getRecurrenceMultiplier = (
  recurrence: $36EnumsRecurrence,
  interval: "week" | "month" | "year"
) => {
  const multipliers: Record<
    "week" | "month" | "year",
    Record<string, number>
  > = {
    week: { DAILY: 7, WEEKLY: 1, MONTHLY: 1 / 4.34, YEARLY: 1 / 52, ONCE: 1 },
    month: { DAILY: 30, WEEKLY: 4, MONTHLY: 1, YEARLY: 1 / 12, ONCE: 1 },
    year: { DAILY: 365, WEEKLY: 52, MONTHLY: 12, YEARLY: 1, ONCE: 1 },
  };

  return multipliers[interval][recurrence] || 0;
};

type BudgetSummaryProps = {
  lineItems: LineItemWithCategory[];
  startingCapital: number;
};

export function BudgetSummary({
  lineItems,
  startingCapital,
}: BudgetSummaryProps) {
  const totals = { week: 0, month: 0, year: 0 };

  lineItems.forEach((lineItem) => {
    const amount = lineItem.amount;
    const recurrence = lineItem.recurrence;

    totals.week += amount * getRecurrenceMultiplier(recurrence, "week");
    totals.month += amount * getRecurrenceMultiplier(recurrence, "month");
    totals.year += amount * getRecurrenceMultiplier(recurrence, "year");
  });

  const savings = {
    week: startingCapital - totals.week,
    month: startingCapital - totals.month,
    year: startingCapital - totals.year,
  };

  const percentageGain = {
    week: ((savings.week - startingCapital) / startingCapital) * 100,
    month: ((savings.month - startingCapital) / startingCapital) * 100,
    year: ((savings.year - startingCapital) / startingCapital) * 100,
  };

  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow py-2 my-4">
      <div className="stat">
        <div className="stat-title">Weekly</div>
        <div className="stat-value">{totals.week.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {savings.week.toFixed(2)} ({percentageGain.week.toFixed(2)}%)
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Monthly</div>
        <div className="stat-value">{totals.month.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {savings.month.toFixed(2)} ({percentageGain.month.toFixed(2)}%)
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Yearly</div>
        <div className="stat-value">{totals.year.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {savings.year.toFixed(2)} ({percentageGain.year.toFixed(2)}%)
        </div>
      </div>
    </div>
  );
}
