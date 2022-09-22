export const TEMPLATE_TITLE = `
  <li>
    <div class="alias">Alias</div>
    <div class="target">Target</div>
    <div class="action">Action</div>
  </li>
`;

export const TEMPLATE_SHOW = `
  <li>
    <div class="alias">%ALIAS%</div>
    <div class="target">%TARGET%</div>
    <div class="action">
      <button class="remove">
        <img src="./images/trash.png" class="remove-button" />
      </button>
    </div>
  </li>
`;

export const TEMPLATE_ADD = `
  <li>
    <div class="alias">
      <input id="alias" placeholder="alias" />
    </div>
    <div class="target">
      <input id="target-value" placeholder="https://" />
      <img src="./images/trash.png" class="clean-input" id="clean-input" />
    </div>
    <div class="action">
      <button id="save">Add</button>
    </div>
  </li>
`;
