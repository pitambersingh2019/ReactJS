import useCreateTask from "../../../hooks/useCreateTask";
import { useTasks } from "../../../context/useTasks";
import { useTasksPermissionsLevel } from "../../../context/useTasksPermissionsLevel";
import { Status, Task, UserForTask } from "../../../ts";

type UserListProps = {
  users: UserForTask[];
  task: Task;
};

export default function UsersList({ users, task }: UserListProps) {
  const { createTask } = useCreateTask();
  const { fetchTasks } = useTasks();

  const { currentUserId, level3, level2 } = useTasksPermissionsLevel();
  const isCreator = currentUserId === task.TaskCreateUser;

  const handleClick = async (user: UserForTask) => {
    const updatedTask: Task = {
      ...task,
      Assignee: user.ID,
      TaskStatus: Status["To Do"],
    };

    await createTask(updatedTask);
    fetchTasks();
  };

  const allowedUsers = users.filter((user) => {
    if (level3 || (level2 && !isCreator)) {
      return user.ID === currentUserId;
    }

    return user;
  });
  return (
    <>
      {allowedUsers.length > 0 ? (
        allowedUsers.map((user) => (
          <div className="item" key={user.ID} onClick={() => handleClick(user)}>
            {user.DisplayName}
          </div>
        ))
      ) : (
        <div className="no-users">No users</div>
      )}
    </>
  );
}
