import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer";

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
  // context useState deprected in leiu of reducer
  // const [users, setUsers] = useState([]);
  // const [loading, setLoading] = useState(true);

  // old state above moves into initialState as an object
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  // destructure the reducer with state, dispatch
  // use reducer takes in two arguments, the reducer itself and initial state
  // call useReducer(reducer, initialState)
  // destructure reducer and pull out state and dispatch
  const [state, dispatch] = useReducer(githubReducer, initialState);

  return (
    <GithubContext.Provider
      // reducer requires that you now get the data you need from the state object defined in const [state, dispatch] = useReducer(reducer, initialState)
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
