// remove for production #############################
document.getElementById("provider").selectedIndex = 1;
updateProvider();
// ###################################################

document.getElementById("channelInput").onkeyup = findChannel;
document.getElementById("oneChannelPerLine").onclick = findChannel;
document.getElementById("packageType").onchange = findChannel;
document.getElementById("provider").onchange = updateProvider;
document.getElementById("themeButton").onclick = toggleTheme;

function updateProvider() {
  let currentProvider = document.getElementById("provider").value;
  let selectElement = document.getElementById("packageType");
  if (currentProvider === "") {
    selectElement.innerHTML = '<option value="all">All Packages</option>';
    findChannel();
    return;
  }
  let packages = Object.keys(window[currentProvider].packages);
  for (let i = 0; i < packages.length; i++) {
    let option = document.createElement("option");
    option.text = packages[i];
    option.value = packages[i];
    selectElement.add(option);
  }
  findChannel();
}

function findChannel() {
  let currentProvider = window[document.getElementById("provider").value];
  let channelSearch = document.getElementById("channelInput").value;
  let packageType = document.getElementById("packageType").value;
  let channelCheckbox = document.getElementById("oneChannelPerLine").checked;
  let cInnerTextMid = " is on channel ";
  const classes = 'class="container mt-3"';
  if (channelSearch === "" || currentProvider === undefined) {
    // if (currentProvider !== undefined) {
    //   document.getElementById("channelInput").focus();
    // }
    document.getElementById("channelResults").innerText = "";
    return;
  }
  if (!channelCheckbox) {
    cInnerTextMid = " is on channel(s) ";
  }
  let jsonChannels = Object.keys(currentProvider.channels);
  document.getElementById("channelResults").innerText = "";
  for (let i = 0; i < jsonChannels.length; i++) {
    let currentChannelNumber = jsonChannels[i];
    let currentChannel = currentProvider.channels[currentChannelNumber];
    if (currentChannel !== undefined) {
      let currentName = currentChannel.name.toLowerCase();
      let currentPackages = currentChannel.packages;

      if (currentName.includes(channelSearch.toLowerCase())) {
        let packageSupported = currentPackages.includes(packageType) || packageType === "all";
        if (packageSupported) {
          let cID = currentChannel.name.replaceAll(" ", "_");
          let cInnerText = currentChannel.name + cInnerTextMid + currentChannelNumber;
          let channelUsed = document.getElementById(cID);

          if (channelCheckbox || channelUsed === null) {
            let channelHTML = "<div " + classes + ' id="' + cID + '">' + cInnerText + "</div>";
            document.getElementById("channelResults").innerHTML += channelHTML;
          } else {
            let formattedResult = cInnerText.slice(cID.length + cInnerTextMid.length);
            document.getElementById(cID).innerText += ", " + formattedResult;
          }
        }
      }
    }
  }

  if (document.getElementById("channelResults").innerText == "") {
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
    document.getElementById("themeIcon").setAttribute("href", "#moon-stars-fill");
  } else {
    html.setAttribute("data-bs-theme", "dark");
    document.getElementById("themeIcon").setAttribute("href", "#sun-fill");
  }
}
