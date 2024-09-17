import {
  LineItemWithCategory,
  $36EnumsRecurrence,
} from "../../redux/api/endpoints/calculatingParrotApi";

// Function to get the recurrence multiplier based on the recurrence type
export function getRecurrenceMultiplier(recurrence: $36EnumsRecurrence) {
  const multipliers: Record<$36EnumsRecurrence, number> = {
    DAILY: 365, // Daily recurrence is multiplied by 365 for yearly calculation
    WEEKLY: 52, // Weekly recurrence is multiplied by 52 for yearly calculation
    MONTHLY: 12, // Monthly recurrence is multiplied by 12 for yearly calculation
    YEARLY: 1, // Yearly recurrence is multiplied by 1 for yearly calculation
    ONCE: 1, // One-time recurrence is considered as 1
  };

  return multipliers[recurrence] || 0; // Return the multiplier or 0 if not found
}

// Props type for the BudgetSummary component
type BudgetSummaryProps = {
  lineItems: LineItemWithCategory[];
  startingCapital: number;
};

// BudgetSummary component to calculate and display the budget summary
export function BudgetSummary({
  lineItems,
  startingCapital,
}: BudgetSummaryProps) {
  // Initialize income and expenses totals for week, month, and year
  const income = { week: 0, month: 0, year: 0 };
  const expenses = { week: 0, month: 0, year: 0 };

  // Iterate through each line item to calculate income and expenses
  lineItems.forEach((lineItem) => {
    const amount = lineItem.amount;
    const recurrence = lineItem.recurrence;
    const multiplier = getRecurrenceMultiplier(recurrence);

    // Calculate income and expenses based on the recurrence multiplier
    if (amount > 0) {
      income.week += amount * (multiplier / 52);
      income.month += amount * (multiplier / 12);
      income.year += amount * multiplier;
    } else {
      expenses.week += amount * (multiplier / 52);
      expenses.month += amount * (multiplier / 12);
      expenses.year += amount * multiplier;
    }
  });

  // Calculate the surplus for week, month, and year
  const surplus = {
    week: income.week + expenses.week,
    month: income.month + expenses.month,
    year: income.year + expenses.year,
  };

  // Calculate the percentage gain compared to the starting capital
  const percentageGain = {
    week: (surplus.week / startingCapital) * 100,
    month: (surplus.month / startingCapital) * 100,
    year: (surplus.year / startingCapital) * 100,
  };

  // Return the JSX to display the budget summary
  return (
    <div className="stats stats-vertical lg:stats-horizontal shadow py-2 my-4">
      <div className="stat">
        <div className="stat-title">Weekly Surplus</div>
        <div className="stat-value">{surplus.week.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {percentageGain.week.toFixed(0)}% increase
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Monthly Surplus</div>
        <div className="stat-value">{surplus.month.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {percentageGain.month.toFixed(0)}% increase
        </div>
      </div>

      <div className="stat">
        <div className="stat-title">Yearly Surplus</div>
        <div className="stat-value">{surplus.year.toFixed(0)} DKK</div>
        <div className="stat-desc">
          {percentageGain.year.toFixed(0)}% increase
        </div>
      </div>
    </div>
  );
}
