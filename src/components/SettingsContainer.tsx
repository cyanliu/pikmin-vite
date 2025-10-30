type SettingsContainerProps = {
  onSettingsChange: any;
  onCurrentProgressChange: any;
  ticketCount: number;
  // ties filter state to visual appearance of checkbox
  // hopefully making the filter state the sole source of truth on
  // checkbox checked-ness in this component
  // and also whether or not the tasks appear in the stage component
  filterState: boolean[];
};

export default function SettingsContainer({
  onSettingsChange,
  onCurrentProgressChange,
  ticketCount,
  filterState,
}: SettingsContainerProps) {
  //todo: type these
  // passes index of toggled filter back up to state management in app.tsx
  // mapping from id of input to index of array
  const idToIdxMapping: { [inputId: string]: number } = {
    "expedition-task": 0,
    "flower-task": 1,
    "mushroom-task": 2,
    "pikmin-task": 3,
    "walk-task": 4,
  };

  function handleFilterClick(id: string): any {
    let idx = idToIdxMapping[id];
    onSettingsChange(idx);
  }

  function handleStepUpdate(val: string) {
    onCurrentProgressChange("step", val);
  }

  function handleTicketUpdate(val: string) {
    onCurrentProgressChange("ticket", val);
  }

  // function handleMushiesUpdate(val: string) {
  //   onCurrentProgressChange("mushies", val);
  // }

  return (
    <>
      <div className="settings-container">
        <div className="curr-step-container">
          <div>
            <label htmlFor="current-step">Current Step:</label>
            <select
              id="current-step"
              onChange={(event) => {
                let stepGoal = event.currentTarget.value;
                handleStepUpdate(stepGoal);
              }}
            >
              <option value={"1.1"}>1.1</option>
              <option value={"1.2"}>1.2</option>
              <option value={"1.3"}>1.3</option>
              <option value={"1.4"}>1.4</option>
              <option value={"2.1"}>2.1</option>
              <option value={"2.2"}>2.2</option>
              <option value={"2.3"}>2.3</option>
              <option value={"2.4"}>2.4</option>
              <option value={"3.1"}>3.1</option>
              <option value={"3.2"}>3.2</option>
              <option value={"3.3"}>3.3</option>
              <option value={"3.4"}>3.4</option>
              <option value={"4.1"}>4.1</option>
              <option value={"4.2"}>4.2</option>
              <option value={"4.3"}>4.3</option>
              <option value={"4.4"}>4.4</option>
            </select>
          </div>
          <div>
            <label htmlFor="tickets-input">Extra tickets:</label>
            <input
              type="number"
              id="tickets-input"
              onChange={(event) => {
                console.log(event);
                handleTicketUpdate;
              }}
              value={ticketCount}
              min={0}
            ></input>
          </div>
        </div>
        <div className="filters-container">
          <div className="filters">
            <input
              type="checkbox"
              id="expedition-task"
              name="expedition"
              checked={filterState[0]}
              onChange={(event) => {
                handleFilterClick(event.target.id);
              }}
            />
            <label htmlFor="expedition-task">Expedition</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="flower-task"
              name="flower"
              checked={filterState[1]}
              onChange={(event) => {
                handleFilterClick(event.target.id);
              }}
            />
            <label htmlFor="flower-task">Flower</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="mushroom-task"
              name="mushroom"
              checked={filterState[2]}
              onChange={(event) => {
                handleFilterClick(event.target.id);
              }}
            />
            <label htmlFor="mushroom-task">Mushroom</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="pikmin-task"
              name="pikmin"
              checked={filterState[3]}
              onChange={(event) => {
                handleFilterClick(event.target.id);
              }}
            />
            <label htmlFor="pikmin-task">Pikmin</label>
          </div>
          <div className="filters">
            <input
              type="checkbox"
              id="walk-task"
              name="walk"
              checked={filterState[4]}
              onChange={(event) => {
                handleFilterClick(event.target.id);
              }}
            />
            <label htmlFor="walk-task">Walk</label>
          </div>
        </div>
      </div>
    </>
  );
}
