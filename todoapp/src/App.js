import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './App.css';

function App() {
  //formulaire
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  
  //stocker la liste des taches
  const [tasks, setTasks] = useState([]);

  //charger les taches stockées
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')); 
    if (storedTasks) { //not none
      setTasks(storedTasks);
    }
  }, []);

  //actualiser la liste des taches
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks)); 
  }, [tasks]);

  // soumission du formulaire -> ajouter une nouvelle tache
  const onSubmit = (data) => {
    setTasks([...tasks, { text: data.task, completed: false }]); 
    reset();
  };

  // basculer l'état d'une tache
  const doneOrNotYet = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task);
    setTasks(updatedTasks); // update
  };

  //supprimer une tache en fonction de son index
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((task, i) => i !== index); 
    setTasks(updatedTasks);
  };

  // Retour du composant avec le rendu JSX
  return (
    <div className="App">
      <h1>Todo App</h1>
      {/* Formulaire pour ajouter une nouvelle tache */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          placeholder="Add a task" // Placeholder pour indiquer Ã  l'utilisateur ce qu'il doit entrer
          {...register('task', { required: true })} // Enregistre le champ du formulaire avec une validation (obligatoire)
        />
        {errors.task && <p style={{ color: 'red' }}>Task is required.</p>} {/* Affiche un message d'erreur si le champ est vide */}
        <button type="submit">Add Task</button> {/* Bouton pour soumettre le formulaire */}
      </form>

      {/* Liste des taches */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}> {/* Chaque tache est un element de liste */}
            <input
              type="checkbox" // Case Ã  cocher pour marquer la tache comme complÃ©tÃ©e
              checked={task.completed} // Le statut coché est basÃ© sur l'état de la tache
              onChange={() => doneOrNotYet(index)} // Appelle la fonction doneOrNotYet lorsqu'on coche/decroche
            />
            <span className={task.completed ? 'completed' : 'not-completed'}>
              {task.text} {/* Affiche le texte de la tache */}
            </span>
            <button className="delete-btn" onClick={() => deleteTask(index)}>Delete</button> {/* Bouton pour supprimer la tache */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
