import React, { Component } from 'react';
import {INSERT_TODO, FETCH_TODOS} from './queries';
import { graphql, Mutation } from 'react-apollo';
import {Button, Keyboard} from 'react-native';

// The "update" prop is used to update the cache after the mutation so that the mutations reflect in the UI
const AddButton = (props) => {
  return (
    <Mutation
      mutation={INSERT_TODO}
      update= {(cache, {data: {insert_todos}}) => {
        const data = cache.readQuery({ query: FETCH_TODOS});
        const newTodo = {
          task: props.task,
          completed: false,
          user_id: props.userId,
          id: insert_todos.returning[0].id
        }
        data.todos.push(newTodo);
        cache.writeQuery({query: FETCH_TODOS, data})
      }}
    >
      {(insert_todos, {data}) => (
        <Button
          title="Insert Todo"
          style={props.style}
          onPress={() => {
            // "insert_todos" function takes a variable object to perform a mutation
            insert_todos({
              variables: {
                objects: [{
                  task: props.task,
                  completed: false,
                  user_id: props.userId
                }]
              }
            });
            // Clear the keyboard
            props.handleTextChange("");
            // Dismiss the keyboard
            Keyboard.dismiss();
          }}
        />
      )}
    </Mutation>
  )
}

// Export the component
export default AddButton;