import gql from 'graphql-tag';

// Query to fetch all the to-dos
const FETCH_TODOS = gql`
  query fetch_todos{
    todos {
      id
      task
      completed
      user_id
    }
  }
`;

// Mutation to insert a to-do.
const INSERT_TODO = gql`
  mutation insert_todos ($objects: [todos_insert_input!]){
    insert_todos(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

// Mutation to update a to-do
const UPDATE_TODO = gql`
  mutation update_todos{
    update_todos(where: {id: {_eq: $todo_id}} _set: {completed: $completed}) {
      affected_rows
    }
  }
`;

// Mutation to delete a to-do
const DELETE_TODO = gql`
  mutation delete_todos{
    delete_todos(where: {id: {_eq: $todo_id}}) {
      affected_rows
    }
  }
`;

// Export all the queries and mutations
export {
  INSERT_TODO,
  FETCH_TODOS,
  UPDATE_TODO,
  DELETE_TODO
}