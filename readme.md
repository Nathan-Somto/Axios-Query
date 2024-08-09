# 🚀 Axios-Query

`axios-query` is a package designed to integrate [React Query](https://react-query.tanstack.com/) with [Axios](https://axios-http.com/). It provides a set of custom hooks and components for easy data fetching, mutation, and state management in React applications.

## Features ✨

- **Custom React Query Hooks**: Integrated with Axios for data fetching and state management.
- **Custom Error and Loading Components**: Easily customize loading and error states. 🔄
- **Popular Toast Package Support**: Integrates with popular toast libraries such as [react-toastify](https://fkhadra.github.io/react-toastify/), [react-hot-toast](https://react-hot-toast.com/), and [sonner](https://sonner.dev/). 📣
- **Dead Simple Configurations**: Easily configure and customize your setup. ⚙️

## Installation 📦

To install `axios-query`, use npm or yarn:

```bash
npm install axios-query
# or
yarn add axios-query
```

## Get Started 🚀
1. Setup `AxiosQueryProvider`
First, wrap your application with the AxiosQueryProvider to provide the necessary context for the hooks.
```tsx
import { AxiosQueryProvider } from "axios-query";
import { customAxiosInstance } from "./axios";
import { myErrorComp, myLoadingComp } from "./components";

const config = {
  reactQuerySettings: {
    // Same configurations as using useQueryClient
  },
  axiosSettings: {
    axiosInstance: customAxiosInstance,
    options: {
      // Axios request configurations
    },
  },
  toastSettings: {
    package: "react-hot-toast",
    options: {
      // Options to customize your chosen toast package
    },
  },
  // Global configs
  errorComp: myErrorComp,
  loadingComp: myLoadingComp,
  displayToast: false, 
  formatErrorMessage: true, 
};

function App() {
  return (
    <AxiosQueryProvider config={config}>
      <>
        <TodoForm />
        <Todos />
      </>
    </AxiosQueryProvider>
  );
}
```

2. Using the `useQuery` Hook
Fetch data with the useQuery hook and customize loading and error components:
```tsx
import { useQuery } from "axios-query";

type TodoResponse = {
  todos: {
    id: string;
    name: string;
  }[];
};

export function Todos() {
  const { Loader, Error, data } = useQuery<TodoResponse>({
    route: "/todos",
    queryKey: ["todos"],
    loadingComp: () => <div>Loading Todos.. </div>, // Set custom components per hook usage
  });

  return (
    <>
      {Loader && <Loader />}
      {Error && <Error />}
      <ul>
        {data?.todos.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
}
```

3. Using the `useMutate` Hook
Perform mutations and handle success and error states:
```tsx
import { useInvalidate, useMutate } from "axios-query";

export function TodoForm() {
  const invalidateQueries = useInvalidate();
  const { isPending, mutate: createTodo } = useMutate({
    method: "post",
    route: "/todos",
    onSuccess(res) {
      invalidateQueries({ queryKey: ["todos"] });
    },
    displayToast: true, // Disables the global config for this component
    retryCount: 3,
    toastMessages: {
      success: "Created todo successfully!",
      failed: "Failed to create todo",
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createTodo({ name: "publish package", id: 2 });
      }}
    >
      <input name="todo" />
      <button type="submit">Create Todo</button>
    </form>
  );
}
```
## Documentation 📚
For detailed documentation and examples, please refer to the [documentation](http://www.gthub.com/nathan-somto/axios-query/docs).

## Contributing 🤝
We welcome contributions to axios-query. If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -am 'Add new feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.