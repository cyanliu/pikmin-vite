type TotalsContainerProps = {
  totalMushies: number;
  totalDays: number;
};

export default function TotalsContainer({
  totalMushies,
  totalDays,
}: TotalsContainerProps) {
  return (
    <>
      <div className="totals-container">
        <div className="totals-row">
          <span>Total mushies left: {totalMushies}</span>
          <span>Total days required: {totalDays}</span>
        </div>
      </div>
    </>
  );
}
