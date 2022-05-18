import { GroupedTasks, Status, Task, TaskPriority } from "../ts";

export const groupTasksByStatus = (tasks: Task[]): GroupedTasks => {
  return tasks.reduce((result, task) => {
    const statusName = Status[task.TaskStatus];
    result[statusName] = result[statusName] || [];
    result[statusName].push(task);
    return result;
  }, {} as GroupedTasks);
};

export const groupTasksByAssignee = (tasks: Task[]) => {
  return tasks.reduce((result, task) => {
    const assigneeName = task.AssigneeDisplayName || "Unassigned";
    result[assigneeName] = result[assigneeName] || [];
    result[assigneeName].push(task);
    return result;
  }, {} as GroupedTasks);
};

export const groupTasksByPriority = (tasks: Task[]) => {
  return tasks.reduce((result, task) => {
    const priority = TaskPriority[task.TaskPriorityID];
    result[priority] = result[priority] || [];
    result[priority].push(task);
    return result;
  }, {} as GroupedTasks);
};

export const groupTasksBySubject = (tasks: Task[]) => {
  return tasks.reduce((result, task) => {
    const subjectName = task.SubjectTrans;
    result[subjectName] = result[subjectName] || [];
    result[subjectName].push(task);
    return result;
  }, {} as GroupedTasks);
};
