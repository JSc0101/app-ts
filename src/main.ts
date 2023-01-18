import "./index.css";
const taskForm = document.querySelector<HTMLFormElement>("#taskForm");

interface Task {
  title: string;
  description: string;
}
const task: Task[] = [];

taskForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  const $title = taskForm["title"] as unknown as HTMLInputElement;

  const $description = taskForm[
    "description"
  ] as unknown as HTMLTextAreaElement;

  task.push({
    title: $title.value,
    description: $description.value,
  });

  localStorage.setItem("task", JSON.stringify(task));
});
