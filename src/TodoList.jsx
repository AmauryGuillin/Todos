import React from "react";
import TodoItem from "./TodoItem";

/**
 * On importe 3 paramètres destructurés depuis le composant App
 * todos = la liste des todos
 * toggleTodo = méthode qui gère les checkbox
 * deleteTodo = méthode qui gère la suppression d'une todo
 */
export default function TodoList({ todos, toggleTodo, deleteTodo }) {
  /**
   * Ici, on ne fait que structurer la liste des todos via un "ul/li"
   * La particularité est que les "li" sont contenu dans un autre componsant : TodoItem
   * Pour afficher chaque composant todos, on map une fonction sur todos qui pour chaque élément contenu dans todos,
   * cela nous retourne un componsant TodoItem.
   *
   * On effectue un affichage conditionel :
   * Si la liste "todos" est vide alors on affiche "No Todos"
   * Dans le cas contraire, on affiche rien.
   *
   * On va passer TodoItem plusieurs propriétés
   * 1) ...todo = on passe toutes les propriétés de la todo en cours de traitement dans le .map
   * 2) key = on passe l'id de la todo en guise de key puisque chaque élément displayed avec angular doit être
   * associé à une key UNIQUE.
   * 3) toggleTodo = on passe la méthode toggleTodo dont la logique réside dans le composant App
   * 4) deleteTodo = on passe la m"thode deleteTodo dont la logique réside dans le composant App
   */
  return (
    <ul className="list">
      {/* cette syntaxe uniquement si on évalue un booleen */}
      {todos.length === 0 && "No Todos"}
      {/* sinon, on fait du ternaire */}
      {todos.map((todo) => {
        return (
          <TodoItem
            {...todo}
            key={todo.id}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        );
      })}
    </ul>
  );
}
