import React from "react";

/**
 * On importe 5 paramètres destructurés depuis le composant parent (TodoList)
 * 1) completed = l'état (true / false) de la valeur "completed" de la todo en cours de traitement
 * 2) id = l'id de la todo en cours de traitement
 * 3) title = le message de la todo en cours de traitement
 * 4) toggleTodo = la méthode toggleTodo dont la logique réside dans le composant App, puis passé au composant TodoList
 * 5) deleteTodo = la méthode deleteTodo dont la logique réside dans le composant App, puis passé au composant TodoList
 */
export default function TodoItem({
  completed,
  id,
  title,
  toggleTodo,
  deleteTodo,
}) {
  return (
    <li>
      <label>
        {/* On associe l'état de la checkbox (checked ou !checked) à la valeur de completed
         * correspondant à la todo en cours de traitement.
         *
         * Dans "onChange", on passe une lamba qui prend l'évenement en paramètre et qui appelle la fonction toggleTodo
         * Cette fonction va prendre en paramètre l'id de la todo en cours ainsi que l'état coché/!coché de la checkbox
         */}
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {/* On affiche le contenu de todo.title passé en paramètre destructuré du composant.
         * De cette façon on peut juste faire "title" et non "todo.title".
         * C'est possible puisque dans le composant parent (TodoList), on passe {...todo} au composant enfant.
         */}
        {title}
      </label>
      {/* Au clique de ce btn, on call une lambda qui va appeler deleteTodo et qui prend l'id de la todo en cours en paramètre */}
      <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
