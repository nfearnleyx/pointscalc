const crits = [
  ["Reusable code", "low"],
  ["Communication outside team", "low"],
  ["Learning required", "low"],
  ["Learning required", "medium"],
  ["Investigation", "low"],
  ["Investigation", "medium"],
  ["Custom code (one time use) / manual correct", "low"],
  ["Custom code (one time use) / manual correct", "medium"],
  ["UX required / translation required", "medium"],
  ["Feature toggle / multiple versions", "medium"],
  ["Requires creating mock data for edge cases (flow) identification", "medium"],
  ["Development across repositories", "high"],
  ["Scenarios to consider (business logic based on the overall behavior of application)", "high"]
];

const root = document.getElementById("root");
const effortElem = document.getElementById("effort");
const pointsElem = document.getElementById("points");

function sum(items) {
  return items.reduce(((a, b) => a + b), 0);
}

function levelToEffort(level) {
  const effortMap = {
    "low": 0.5,
    "medium": 1,
    "high": 2
  };
  return effortMap[level];
}

function effortToPoints(effort) {
  // effort: 0-1  1-2  2-2.5  2.5-3  3-3.5  3.5-4  4-5  5-
  //    fib: 1    2    3      5      8      13     21   undefined
  if (effort <= 1) {
    return 1;
  }
  else if (effort <= 2) {
    return 2;
  }
  else if (effort <= 2.5) {
    return 3;
  }
  else if (effort <= 3) {
    return 5;
  }
  else if (effort <= 3.5) {
    return 8;
  }
  else if (effort <= 4) {
    return 13;
  }
  else if (effort <= 5) {
    return 21;
  }
  else {
    return undefined;
  }
}

function getEffort() {
  let effort = sum(
    Array.from(document.getElementsByClassName("criteria"))
      .filter(c => c.checked)
      .map(c => levelToEffort(c.value))
  );
  return effort;
}

function calcPoints() {
  const effort = getEffort();
  const points = effortToPoints(effort);
  effortElem.textContent = String(effort);
  if (points === undefined) {
    pointsElem.textContent = "Over 21 points. Break it down!";
    return;
  }
  pointsElem.textContent = String(points);
}

function addCheckbox(criteria, effort) {
  const fullString = `${criteria} (${effort})`;
  const checkLabel = root.appendChild(document.createElement("label"));
  checkLabel.classList.add("list-group-item");
  checkLabel.classList.add("d-flex");
  checkLabel.classList.add("gap-2");
  checkLabel.for = fullString;
  const checkInput = checkLabel.appendChild(document.createElement("input"));
  checkInput.classList.add("criteria");
  checkInput.classList.add("form-check-input");
  checkInput.classList.add("flex-shrink-0");
  checkInput.type = "checkbox";
  checkInput.id = fullString;
  checkInput.value = effort;
  checkInput.onchange = calcPoints;
  const checkSpan = checkLabel.appendChild(document.createElement("span"));
  checkSpan.textContent = fullString;
}

function init() {
  crits.forEach(([criteria, effort]) => addCheckbox(criteria, effort));
  calcPoints();
}
init();
