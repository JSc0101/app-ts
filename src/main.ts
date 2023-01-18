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

  renderTask(task);
  $taskForm.reset();
  $title.focus();
});

window.addEventListener('DOMContentLoaded', () => {
  task = JSON.parse(localStorage.getItem('task') || '[]');
  renderTask(task);
})

const renderTask = (task: Array<Task>) =>  {
  $taskList!.innerHTML = '';
  
  task.forEach(task => {
    const $card = document.createElement('div');
    $card.className = 'bg-zinc-800 mb-1 p-4 roundend-lg hover:bg-zinc-900 hover:cursor-pointer';

    const $headerTitle = document.createElement('header');
    $headerTitle.className = 'flex justify-between items-center'
    const $title = document.createElement('h2');
    $title.textContent = task.title;

    const $delete = document.createElement('button');
    $delete.textContent = 'DELETE';
    $delete.className = 'bg-red-500 px-2 py-1 roundend-md'

    const $description = document.createElement('p');
    $description.textContent = task.description;

    

    $headerTitle.append($title);
    $headerTitle.append($delete);
    $card.append($headerTitle);
    $card.append($description);
    $taskList?.append($card);
  })
}