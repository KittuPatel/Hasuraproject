import React, { Component } from 'react';
import {DELETE_TODO, FETCH_TODOS} from './queries';
import { graphql, Mutation } from 'react-apollo';
import {Button} from 'react-native';

// The "update" prop is used to update the cache after the mutation so that the mutations reflect in the UI
const DeleteButton = (props) => {
  return (
    <Mutation
      mutation={DELETE_TODO}
      update= {(cache) => {
        const data = cache.readQuery({ query: FETCH_TODOS});
        cache.writeQuery({
          query: FETCH_TODOS,
          data: {
            ...data,
            todos: data.todos.filter((todo) => (props.todo.id !== todo.id))
          }
        })
      }}
    >
      {(delete_todos, {data}) => (
        <Button
          title="Delete"
          style={props.style}
          onPress={() => {
            // "delete_todos" function takes a variable object to perform a mutation
            delete_todos({
              variables: {
                todo_id: props.todo.id
              }
            });
          }}
        />
      )}
    </Mutation>
  )
}

export default DeleteButton;