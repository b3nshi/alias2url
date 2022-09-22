import Aliases from "./modules/aliases.js";

const renderPage = () => {
  const db = new Aliases(chrome.storage.sync);
  var aliasesContainer = document.getElementById("aliases");
  var templateAdd = document.getElementById("template-add");
  var templateShow = document.getElementById("template-show");
  var templateTitle = document.getElementById("template-title");
  var currentURL = "";

  const getCurrentURL = () => {
    const query = { active: true, currentWindow: true };

    chrome.tabs.query(query, (tabs) => {
      currentURL = tabs[0].url;
    });
  };

  const removeButtonClick = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    db.removeAlias(parentElement.querySelector(".alias").textContent);
    populateList();
  };

  const cleanInputsButtonClick = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    parentElement.querySelectorAll("input").forEach((input) => {
      input.value = "";
    });
  };

  const saveButtonClick = (event) => {
    const parentElement = event.target.parentElement.parentElement;
    db.addAlias(
      parentElement.querySelector(".alias input").value,
      parentElement.querySelector(".target input").value
    );
    populateList();
  };

  const populateList = () => {
    db.loadStore().then((aliasesList = {}) => {
      aliasesContainer.innerHTML = "";

      aliasesContainer.insertAdjacentHTML("beforeend", templateTitle.innerHTML);

      Object.keys(aliasesList).forEach((alias) => {
        templateShow.querySelector(".alias").innerHTML = `#${alias}`;
        templateShow.querySelector(".target").innerHTML = aliasesList[alias];
        aliasesContainer.insertAdjacentHTML(
          "beforeend",
          templateShow.innerHTML
        );
      });

      if (Object.keys(aliasesList).length === 0) {
        aliasesContainer.insertAdjacentHTML(
          "beforeend",
          '<li class="empty">Create your first #alias</li>'
        );
      }

      aliasesContainer.insertAdjacentHTML("beforeend", templateAdd.innerHTML);

      document.querySelectorAll(".remove").forEach((button) => {
        button.addEventListener("click", removeButtonClick);
      });

      document
        .querySelectorAll(".save")[1]
        .addEventListener("click", saveButtonClick);

      document
        .querySelectorAll(".clean-input")[1]
        .addEventListener("click", cleanInputsButtonClick);

      document.querySelectorAll(".target-value")[1].value = currentURL;
    });
  };
  getCurrentURL();
  populateList();
};

document.addEventListener("DOMContentLoaded", renderPage);
