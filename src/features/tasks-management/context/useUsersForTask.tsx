import { createContext, useCallback, useContext, useState } from "react";
import { api } from "../../api/api";
import { API_URLS } from "../../api/urls";
import { APIStatus, APIUsers, UserForTask } from "../ts";

type UsersForTaskState = {
  users: UserForTask[] | undefined;
  fetchUsersForTask: () => void;
  status: APIStatus;
  error: unknown | undefined;
};

type UsersForTaskContextProviderProps = {
  children: React.ReactNode;
};

const UsersForTaskContext = createContext<UsersForTaskState | undefined>(
  undefined
);

const UsersForTaskContextProvider = ({
  children,
}: UsersForTaskContextProviderProps) => {
  const [status, setStatus] = useState<APIStatus>("idle");
  const [users, setUsers] = useState<UserForTask[] | undefined>(undefined);
  const [error, setError] = useState<unknown>(undefined);

  const fetchUsersForTask = useCallback(async () => {
    try {
      setStatus("loading");
      const values = await api
        .post<APIUsers>(API_URLS.getUsersForTask, {
          SourceTaskCreationPlatform: 1,
        })
        .then((res) => res.data);
      setUsers(values.ResponseDictionaryDT.Users);
      setStatus("success");
      setError(undefined);
      if (values.error) {
        setError(values.error.ErrorMessage);
        setStatus("error");
      }
    } catch (err) {
      setError(err);
      setStatus("error");
    }
  }, []);

  return (
    <UsersForTaskContext.Provider
      value={{ users, fetchUsersForTask, status, error }}
    >
      {children}
    </UsersForTaskContext.Provider>
  );
};

const useUsersForTask = () => {
  const context = useContext(UsersForTaskContext);
  if (context === undefined) {
    throw new Error(
      "useUsersForTask must be used within the UsersForTaskContextProvider"
    );
  }

  return context;
};

export { UsersForTaskContextProvider, useUsersForTask };
