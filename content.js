let showingButton = false

function getJson() {
  const divElement = document.querySelector(".druids_misc_dangerous-html");
  const json = divElement.textContent.match(/{.*}/)[0];
  return json;
}

function makeThePostRequest(data) {
  fetch("https://dummyjson.com/todos/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      todo: data,
      completed: false,
      userId: 5,
    }),
  })
    .then((res) => res.json())
    .then((res) => alert(JSON.stringify(res, null, 2)));
}

function addButton() {
  let divElement = document.querySelectorAll(".druids_margin--top-lg")[0];

  const buttonElement = document.createElement("button");
  buttonElement.textContent = "Create a branch with this";

  buttonElement.addEventListener("click", () => {
    makeThePostRequest(getJson());
  });

  divElement.appendChild(buttonElement);
}

// Define a function to handle mutations in the DOM
function onDomMutation() {
  const elementList = document.querySelectorAll(".druids_misc_dangerous-html")
  if (elementList.length == 51) {
    const element = elementList[50]
    if (!showingButton && element) {
      showingButton = true
      addButton()
    }
  } else {
    showingButton = false
  }
}

// Create a MutationObserver to watch for mutations in the DOM
const observer = new MutationObserver(onDomMutation);

// Start observing the DOM for mutations in the body element
observer.observe(document.body, { childList: true, subtree: true });
