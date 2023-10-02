import React, { useState } from "react";

export default function NewTodoForm({ addTodo }) {
  // Ici on gère l'état de la variable newItem car c'est ici qu'est stocké la code pour le formulaire d'ajout d'une nouvelle todo
  const [newItem, setNewItem] = useState("");

  /**
   * Méthode déclenchée uniquement au subit du form
   *
   * Cette fonction prend en paramètre un evenement (le formulaire associé)
   * on dégage le comportement par défaut du formulaire pour éviter un reload de page
   * on vérifie que le "newItem" ne soit pas vide
   * s'il est vide alors on ne renvoie rien.
   * sinon, on call la méthode "addTodo" (importé depuis les paramètres destructurés du component { addTodo }, le corps de méthode résidant dans le composant App) et on lui passe "newItem" en paramètre
   *
   * On clean le champ text à la fin avec un setNewItem("") pour plus d'UX
   */
  function handleSubmit(e) {
    e.preventDefault();
    if (newItem === "") return;
    addTodo(newItem);
    setNewItem("");
  }
  return (
    // On indique avec "onSumit" la méthode a run au moment du submit justement
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          id="item"
          value={newItem} //on bind la variable à l'input
          onChange={(e) => setNewItem(e.target.value)} //on associe une fonction qui va run à chaque entrée de l'utilisateur. Cette fonction va changer la variable "newItem" en fonction de la valeur dans l'input (e.target.value) et trigger un rerender
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}

/**
 * -------------- RECAPITULATIF --------------
 * On surveille l'état de la variable "newItem" avec le hook useState
 * On associe l'état de cette variable à la valeur contenu dans l'input de type text dans le formulaire
 * (value + onChange OBLIGATOIRES)
 * dans "value" on passe la variable à écouter (ici newItem)
 * dans "onChange" on passe une lambda qui va prendre un évenement en paramètre et qui va retouner une fonction.
 * Cette fonction sera le setter de la variable à écouter (newItem) et prendra en paramètre la valeur contenu à un instant t dans l'input (e.target.value).
 *
 * De cette façon, à chaque fois que l'utilisateur va taper une lettre sur son clavier, la valeur de "newItem" va changer.
 * React va détecter ce changement et va déclencher un rerender du composant afin de mettre à jour l'UI et afficher la nouvelle valeur de "newItem" dans l'input.
 *
 * Quand l'utilisateur à terminé de taper sa todo et appuis sur le btn "Add", cela déclenchera la méthode "handleSubmit".
 * Cette méthode va vérifier que le contenu de la todo n'est pas vide puis run la méthode "addTodo" dont la logique est contenue dans le composant App.
 * Enfin, le l'input texte sera nettoyé via "setNewItem("")"
 */
