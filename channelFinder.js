document.getElementById("channelInput").onkeyup = findChannel;
document.getElementById("oneChannelPerLine").onclick = findChannel;

function findChannel() {
  let results = [];
  let usedChannels = [];
  let channelSearch = document.getElementById("channelInput").value;
  let channelCheckbox = document.getElementById("oneChannelPerLine").checked;
  let resultMiddle = " is on channel ";
  const classes = 'class="container mt-3"';
  if (channelSearch === "") {
    document.getElementById("channelError").innerText = "Missing input";
    document.getElementById("channelResults").innerText = "";
    return;
  }
  if (!channelCheckbox) {
    resultMiddle = " is on channel(s) ";
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
      document.getElementById("channelResults").innerHTML += "<div " + classes + ' id="' + channelID + '">' + results[i] + "</div>";
    } else {
      let formattedResult = results[i].slice(channelID.length + resultMiddle.length);
      document.getElementById(channelID).innerText += ", " + formattedResult;
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
  let html = document.getRootNode().lastChild;
  let currentTheme = html.getAttribute("data-bs-theme");
  if (currentTheme === "dark") {
    html.setAttribute("data-bs-theme", "light");
    document.getElementById("themeButton").innerText = "Dark Mode";
  } else {
    html.setAttribute("data-bs-theme", "dark");
    document.getElementById("themeButton").innerText = "Light Mode";
  }
}
