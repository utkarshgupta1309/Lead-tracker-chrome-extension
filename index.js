const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const olEl = document.getElementById("ol-el");
const deleteAllBtn = document.getElementById("delete-all-btn");
const saveTabBtn = document.getElementById("save-tab-btn");
const gif = document.getElementById("gif");

//leads variable
var myLeads = JSON.parse(localStorage.getItem("myLeads")) || [];
console.log(typeof myLeads);

inputBtn.addEventListener("click", () => {
  const newLead = inputEl.value;
  if (newLead !== "") {
    myLeads.push(newLead);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    inputEl.value = "";
    renderLeads();
  } else {
    window.alert("Input field is empty");
  }
});

saveTabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const newObj = {
      favicon: tabs[0].favIconUrl,
      url: tabs[0].url,
      title: tabs[0].title,
    };
    myLeads.push(newObj);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
    renderGif();
  });
});

deleteAllBtn.addEventListener("dblclick", () => {
  localStorage.clear();
  myLeads = [];
  renderLeads();
});

// const renderLeads = () => {
//   olEl.innerHTML = "";
//   myLeads.forEach((lead) => {
//     const renderLead = document.createElement("li");
//     renderLead.innerText = lead;
//     olEl.appendChild(renderLead);
//   });
// };

const renderLeads = () => {
  var listItems = "";
  myLeads.forEach((lead) => {
    listItems += `<li>
     <a target='_blank' href = '${lead.url}'>
        <img src="${lead.favicon}" id='favicon'/>
        ${lead.title}
    </a>
    </li>`;
  });

  olEl.innerHTML = listItems;
};

const renderGif = () => {
  gif.style.display = "block";
  setInterval(() => {
    gif.style.display = "none";
  }, 4000);
};

renderLeads();
