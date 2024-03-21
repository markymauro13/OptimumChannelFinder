document.getElementById("channelInput").onkeyup = findChannel;
document.getElementById("oneChannelPerLine").onclick = findChannel;
document.getElementById("packageType").onchange = findChannel;

function findChannel() {
  let results = [];
  let usedChannels = [];
  let channelSearch = document.getElementById("channelInput").value;
  let packageType = document.getElementById("packageType").value;
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
  let jsonMaxChannel = Math.max(...Object.keys(channelData.channels).map(Number));
  for (let i = 0; i <= jsonMaxChannel; i++) {
    let currentChannel = channelData.channels[i];
    if (currentChannel !== undefined) {
      let currentName = currentChannel.name.toLowerCase();
      let currentPackages = currentChannel.packages;
      if (currentName.includes(channelSearch.toLowerCase())) {
        let packageSupported = currentPackages.includes(packageType) || packageType === "all";
        if (packageSupported) {
          results.push(currentChannel.name + resultMiddle + i);
          usedChannels.push(currentChannel.name.replaceAll(" ", "_"));
        }
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
  let html = document.lastChild;
  let currentTheme = html.getAttribute("data-bs-theme");
  if (currentTheme === "dark") {
    html.setAttribute("data-bs-theme", "light");
    document.getElementById("themeButton").innerText = "Dark Mode";
  } else {
    html.setAttribute("data-bs-theme", "dark");
    document.getElementById("themeButton").innerText = "Light Mode";
  }
}
