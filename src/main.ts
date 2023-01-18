import "./index.css";
const $taskForm = document.querySelector<HTMLFormElement>("#taskForm");
const $taskList = document.querySelector<HTMLDivElement>("#taskList");
interface Task {
  title: string;
  description: string;
}
let task: Array<Task> = [];

$taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const $title = $taskForm["title"] as unknown as HTMLInputElement;
  const $description = $taskForm["description"] as unknown as HTMLTextAreaElement;

  task.push( { title: $title.value, description: $description.value } );
  localStorage.setItem("task", JSON.stringify(task));
});

window.addEventListener('DOMContentLoaded', () => {
  task = JSON.parse(localStorage.getItem('task') || '[]');
  renderTask(task);
})

const renderTask = (task: Array<Task>) =>  {
  task.forEach(task => {
    const $card = document.createElement('div');
    const $headerTitle = document.createElement('header');
    const $title = document.createElement('h2');
    $title.textContent = task.title;

    const $description = document.createElement('p');
    $description.textContent = task.description;

    $headerTitle.append($title);
    $card.append($headerTitle);
    $card.append($description);
    $taskList?.append($card);
  })
}