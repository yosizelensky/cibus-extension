// ==UserScript==
// @name        Cibus extension
// @namespace   Violentmonkey Scripts
// @match       https://consumers.pluxee.co.il/*
// @grant       none
// @version     1.0
// @author      -
// @description 20/09/2024, 15:19:45
// ==/UserScript==

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function addDomain(domain) {
  console.log(`Adding domain ${domain}`);

  while (true) {
    var friends = document.querySelector(".cib-btn");
    friends.click();

    await sleep(1000);

    var input = document.querySelector(".mat-input-element");
    if (input == null) {
      console.log("Cannot find the input field");
      return;
    }

    var confirmButton = document.querySelectorAll(".cib-btn")[2];
    if (confirmButton == null || confirmButton.textContent != " אישור ") {
      console.log("Cannot find the confirm button");
      return;
    }

    input.value = domain;
    input.dispatchEvent(new Event("input", { bubbles: true }));

    await sleep(2000);

    var users = document.querySelectorAll(".friends-add");
    if (users.length == 0) {
      console.log("No users found");
      break;
    }

    for (var i = 0; i < users.length; i++) {
      var user = users[i];
      console.log(user);
      user.dispatchEvent(new Event("click", { bubbles: true }));
    }

    confirmButton.click();
    await sleep(1000);

    if (users.length < 10) {
      break;
    }
  }

  var xButton = document.querySelector(".search-panel > a");
  if (xButton != null) {
    xButton.click();
  }
}

async function addEveryone() {
  await addDomain("wiz");
  await addDomain("com");
}

async function main() {
  while (true) {
    await sleep(1000);
    if (document.querySelector("#addEveryoneButton") != null) {
      continue;
    }

    var friends = document.querySelector(".cib-btn");
    if (friends == null || friends.textContent.trim() != "להוספת חברים") {
      continue;
    }

    var addEveryoneButton = friends.cloneNode(true);
    addEveryoneButton.id = "addEveryoneButton";
    addEveryoneButton.textContent = "להוספת כל החברים";
    addEveryoneButton.onclick = addEveryone;
    friends.insertAdjacentElement("afterend", addEveryoneButton);
  }
}

main();
