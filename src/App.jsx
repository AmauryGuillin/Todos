import React, { useEffect, useState } from "react";
import "./styles.css";
import NewTodoForm from "./NewTodoForm";
import TodoList from "./TodoList";

export default function App() {
  /**
   * Au lieu de passer un état initial dans le useState on passe une fonction
   * Cette fonction va, au premier rendu, aller rechercher le contenu de "ITEMS" dans le localStorage, le parser puis ranger le contenu dans la variable "todos"
   * Si aucune valeur n'est stockée dans le localStorage, alors la fonction renvoie un tableau vide
   */
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];

    return JSON.parse(localValue);
  });

  /**
   * le useEffect est utiliser pour différentes conditions
   * 1) je recherche à effectuer des actions lors du premier rendu (je retourne un tableau vide en 2nd paramètre)
   * 2) je recherche à monitorer l'état d'une variable et effectuer des actions au moment où l'état de la variable change
   *
   * /!\ Parfois besoin d'implémenter un retour à ce hook, pour effectuer des actions de nettoyage. /!\
   *
   * Ici, on monitore l'état de la variable "todos"
   * a chaque fois que todos va changer, ce hook sera call
   * à chaque call, on va stocker dans le localStorage la nouvelle valeur de "todos" après avoir sérialisé le JSON en format String
   */
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  //Fonction globale pour ajouter une todo
  function addTodo(title) {
    /**
     * prend en argument les valeurs précédentes (currentTodos)
     * retourne toutes les valeurs précédentes (...curerentTodos) + un nouvel objet
     *
     * si on ne prend pas en argument les valeurs précédents alors on aura qu'un seul item dans le tableau quoi qu'il arrive
     * car à chaque rerendering, react va reprendre l'état initial de la variable qui est un tableau vide.
     *
     * Ici, on reprend l'état précédent de la variable et non l'état initial. L'état précédent contient 0 ou x valeurs dans le tableau.
     */
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  /**
   * on récupère l'id et l'état de complétion (true / false) de la todo en paramètres
   * on appel setTodos et on lui demande, en paramètres, de récupérer les todos actuelles (currentTodos)
   * on retourne la liste actuelle actualisés ->
   * on map une fonction sur la liste, cette fonction va rechercher pour chaque élement si l'id en paramètre correspond à un id contenu dans la liste actuelle
   * si oui : on retourne la liste complete actualisée avec la nouvelle valeur de completed pour l'id correspondant
   * si non : on retourne la liste actuelle sans changement
   */
  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }

        return todo;
      });
    });
  }

  //Fonction globale pour supprimer une todo
  function deleteTodo(id) {
    /**
     * 1 paramètre de la méthode -> l'id de la todo à supprimer
     * On call la méthode setTodo
     * on lui passe une lambda en paramètre
     * cette lamba va prendre en paramètre la liste actuelle des todos puis retourner une la liste actuelle des todos mais filtrée.
     * Le filtre indique qu'on veut retourner une liste qui ne contient pas la todo associée à l'id en paramètre de la méthode.
     */
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm addTodo={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
