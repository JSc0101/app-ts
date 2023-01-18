import { v4 } from "uuid";
import "./css/index.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const $taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const $taskList = document.querySelector<HTMLDivElement>("#taskList");
interface Task {
  id: string;
  title: string;
  description: string;
}
let tasks: Array<Task> = [];

$taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const $title = $taskForm["title"] as unknown as HTMLInputElement;
  const $description = $taskForm[
    "description"
  ] as unknown as HTMLTextAreaElement;

  tasks.push({
    id: v4(),
    title: $title.value,
    description: $description.value,
  });
  localStorage.setItem("task", JSON.stringify(tasks));
  Toastify({
    text: "task save !",
  }).showToast();
  renderTask(tasks);
  $taskForm.reset();
  $title.focus();
});

window.addEventListener("DOMContentLoaded", () => {
  tasks = JSON.parse(localStorage.getItem("task") || "[]");
  renderTask(tasks);
});

const renderTask = (task: Array<Task>) => {
  $taskList!.innerHTML = "";

  task.forEach((task) => {
    const $card = document.createElement("div");
    $card.className =
      "bg-zinc-800 mb-1 p-4 roundend-lg hover:bg-zinc-900 hover:cursor-pointer";

    const $headerTitle = document.createElement("header");
    $headerTitle.className = "flex justify-between items-center";
    const $title = document.createElement("h2");
    $title.textContent = task.title;

    const $delete = document.createElement("button");
    $delete.textContent = "DELETE";
    $delete.className = "bg-red-500 px-2 py-1 roundend-md";

    $delete.addEventListener("click", () => {
      const index = tasks.findIndex((t) => t.id === task.id);
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      Toastify({
        text: "Task Delete"
      }).showToast();
      renderTask(tasks);
    });
    const $description = document.createElement("p");
    $description.textContent = task.description;

    $headerTitle.append($title);
    $headerTitle.append($delete);
    $card.append($headerTitle);
    $card.append($description);
    $taskList?.append($card);
  });
};