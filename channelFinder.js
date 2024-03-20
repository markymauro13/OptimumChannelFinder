document.getElementById("channelName").onkeyup = findChannel;

function findChannel() {
  let results = [];
  let usedChannels = [];
  let channelSearch = document.getElementById("channelName").value;
  const resultMiddle = " is on channel ";
  if (channelSearch === "") {
    document.getElementById("channelResults").innerText = "Missing input";
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
        //document.getElementById("channelResults").innerText = currentChannel.name + " is on channel number " + i;
      }
    }
  }
  document.getElementById("channelResults").innerText = "";
  for (let i = 0; i < results.length; i++) {
    let channelID = usedChannels[i];
    let tempChannel = document.getElementById(channelID);
    if (tempChannel === null) {
      document.getElementById("channelResults").innerHTML += '<div id="' + channelID + '" class="channelList">' + results[i] + "</div>";
    } else {
      let formattedResult = results[i].slice(channelID.length + resultMiddle.length);
      document.getElementById(channelID).innerText += ", and " + formattedResult;
    }
  }
  if (results.length === 0) {
    document.getElementById("channelResults").innerText = "No results found";
  }
}
