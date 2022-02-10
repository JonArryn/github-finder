import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  // context useState deprected in leiu of reducer
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // old state above moves into initialState as an object
  const initialState = {
    users: [],
    loading: false,
  };

  // destructure the reducer with state, dispatch
  // call useReducer(reducer, initialState)
  const [state, dispatch] = useReducer(githubReducer, initialState);

  // function that sets state which lives in reducer
  const fetchUsers = async () => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users`);
    const data = await response.json();

    // call dispatch function to pass switch case (action.type) and payload (data that is passed into reducer based on action.type case)
    dispatch({
      type: "GET_USERS",
      payload: data,
    });
  };

  const setLoading = () => dispatch({ type: "SET_LOADING" });
  return (
    <GithubContext.Provider
      // reducer requires that you now get the data you need from the state object defined in const [state, dispatch] = useReducer(reducer, initialState)
      value={{ users: state.users, loading: state.loading, fetchUsers }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
