document.getElementById("channelName").onkeyup = findChannel;
document.getElementById("oneChannelPerLine").onclick = findChannel;

function findChannel() {
  let results = [];
  let usedChannels = [];
  let channelSearch = document.getElementById("channelName").value;
  let channelCheckbox = document.getElementById("oneChannelPerLine").checked;
  const resultMiddle = " is on channel ";
  const classes = 'class="container mt-3" id="';
  if (channelSearch === "") {
    document.getElementById("channelError").innerText = "Missing input";
    document.getElementById("channelResults").innerText = "";
    return;
  }
  let jsonLength = Math.max(...Object.keys(channelData.channels).map(Number));
  for (let i = 0; i <= jsonLength; i++) {
    let currentChannel = channelData.channels[i];
    if (currentChannel !== undefined) {
      let currentName = currentChannel.name.toLowerCase();
      if (currentName.includes(channelSearch.toLowerCase())) {
        results.push(currentChannel.name + resultMiddle + i);
        usedChannels.push(currentChannel.name.replaceAll(" ", "_"));
      }
    }
  }
  document.getElementById("channelResults").innerText = "";
  for (let i = 0; i < results.length; i++) {
    let channelID = usedChannels[i];
    let tempChannel = document.getElementById(channelID);
    if (channelCheckbox || tempChannel === null) {
      document.getElementById("channelResults").innerHTML += "<div " + classes + channelID + '" class="channelList">' + results[i] + "</div>";
    } else {
      let formattedResult = results[i].slice(channelID.length + resultMiddle.length);
      document.getElementById(channelID).innerText += ", and " + formattedResult;
    }
  }
  if (results.length === 0) {
    document.getElementById("channelError").innerText = "No results found";
    document.getElementById("channelResults").innerText = "";
    return;
  }
  document.getElementById("channelError").innerText = "";
}

function toggleTheme() {
  let body = document.getElementById("main");
  let currentTheme = body.getAttribute("data-bs-theme");
  if (currentTheme === "dark") {
    body.setAttribute("data-bs-theme", "light");
  } else {
    body.setAttribute("data-bs-theme", "dark");
  }
}
