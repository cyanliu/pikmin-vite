type TotalsContainerProps = {
  totalMushiesLeft: number;
  totalDays: number;
};

// The totals here are calculated assuming that going *into* the current step/day, you have all of the tickets and remaining attempts
// totalDays required = 0 means you can complete this today
// totalDays required = 1 means you can complete it by tomorrow
export default function TotalsContainer({
  totalMushiesLeft: totalMushiesLeft,
  totalDays,
}: TotalsContainerProps) {
  return (
    <>
      <div className="totals-container">
        <div className="totals-row">
          <span>Total mushies left: {totalMushiesLeft}</span>
          <span>
            Additional days required to complete the round: {totalDays}
          </span>
        </div>
      </div>
    </>
  );
}
