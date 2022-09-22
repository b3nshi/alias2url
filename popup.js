import Aliases from "./modules/aliases.js";
import {
  TEMPLATE_ADD,
  TEMPLATE_SHOW,
  TEMPLATE_TITLE,
} from "./modules/templates.js";

const renderPage = () => {
  const db = new Aliases(chrome.storage.sync);
  const aliasesContainer = document.getElementById("aliases");
  var currentURL = "";

  const getCurrentURL = () => {
    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, (tabs) => {
      currentURL = tabs[0].url;
    });
  };

  const removeButtonClick = (event) => {
    const parentElement =
      event.target.parentElement.parentElement.parentElement;
    const result = db.removeAlias(
      parentElement.querySelector(".alias").textContent
    );

    if (result) {
      populateList();
    } else {
      alert("The alias doesn't exist");
    }
  };

  const cleanInputsButtonClick = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    parentElement.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  };

  const saveButtonClick = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    const newAlias = parentElement.querySelector(".alias input").value;
    const newTarget = parentElement.querySelector(".target input").value;

    if (!newAlias || !newTarget) {
      alert("Please complete all the fields");
      return;
    }

    const result = db.addAlias(newAlias, newTarget);

    if (result) {
      populateList();
    } else {
      alert("Alias already exist!");
    }
  };

  const populateList = () => {
    db.loadStore().then((aliasesList = {}) => {
      aliasesContainer.innerHTML = "";

      aliasesContainer.insertAdjacentHTML("beforeend", TEMPLATE_TITLE);

      Object.keys(aliasesList).forEach((alias) => {
        const aliasElement = TEMPLATE_SHOW.replace(
          "%ALIAS%",
          `#${alias}`
        ).replace("%TARGET%", aliasesList[alias]);
        aliasesContainer.insertAdjacentHTML("beforeend", aliasElement);
      });

      if (Object.keys(aliasesList).length === 0) {
        aliasesContainer.insertAdjacentHTML(
          "beforeend",
          '<li class="empty">Create your first #alias</li>'
        );
      }

      aliasesContainer.insertAdjacentHTML("beforeend", TEMPLATE_ADD);

      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", removeButtonClick);
      });

      document
        .querySelector("#save")
        .addEventListener("click", saveButtonClick);

      document
        .querySelector("#clean-input")
        .addEventListener("click", cleanInputsButtonClick);

      document.querySelector("#target-value").value = currentURL;
    });
  };
  getCurrentURL();
  populateList();
};

document.addEventListener("DOMContentLoaded", renderPage);
