import {TasksList} from "./TasksList"
import {Task,getTags} from "./Task"

/*var toDoList = new ToDoList();
toDoList.add("Entrada1");
console.log(toDoList.getTasksNamList());*/

describe("Test", () => {
  var toDoList = new TasksList();
  it("Deberia devolver un array de lenght 0", () => {
    expect(toDoList.getTasksNamesList()).toEqual([]);
  });
  it("Deberia agregar el elemento", () => {
    toDoList.add("Entrada1");
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada1"]);
  });
  it("Deberia agregar otro elemento conservando los anteriores", () => {
    toDoList.add("Entrada2");
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada1","Entrada2"]);
  });
  it("Deberia agregar otro elemento conservando los anteriores", () => {
    expect(toDoList.getTasksNamesList().length).toEqual(2);
  });
  it("No deberia agregar ningun  elemento", () => {
    toDoList.add("");
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada1","Entrada2"]);
  });
  it("No deberia agregar ningun  elemento (espacios)", () => {
    toDoList.add(" ");
    toDoList.add("  ");
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada1","Entrada2"]);
  });
  
});

describe("Edit task", () => {
  var task = new Task("Entada1");
  it("Deberia devolver undefined", () => {
    expect(task.setTask()).toEqual();
  });
  it("Deberia devolver Entrada2", () => {
    task.setTask("Entada2")
    expect(task.getName()).toEqual("Entada2");
  });
});

describe("Remove a task form the list", () => {
  var toDoList = new TasksList()
  toDoList.add("Entrada1");
  toDoList.add("Entrada2");
  toDoList.add("Entrada3");
  toDoList.add("Entrada4");
  it("Deberia eliminar un elemento de la lista", () => {
    toDoList.removeTask(1);
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada2","Entrada3","Entrada4"]);
  });
  it("No deberia eliminar un elemento de la lista", () => {
    toDoList.removeTask("");
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada2","Entrada3","Entrada4"]);
  });
  it("Deberia eliminar un elemento de la lista", () => {
    toDoList.removeTask(3);
    expect(toDoList.getTasksNamesList()).toEqual(["Entrada2","Entrada4"]);
  });
});

describe("Search task from a list", () => {
  var toDoList = new TasksList()
  toDoList.add("Entrada1");
  toDoList.add("Entrada2");
  toDoList.add("Entrada3");
  var task;
  it("Deberia devolver undefined", () => {
    expect(toDoList.searchByName()).toEqual();
  });
  it("Deberia devolver Entrada1", () => {
    task = toDoList.searchByName("Entrada1")
    expect(task.getName()).toEqual("Entrada1");
  });
  it("Deberia devolver Entrada3", () => {
    task = toDoList.searchByName("Entrada3")
    expect(task.getName()).toEqual("Entrada3");
   });
});

describe("Search task from a list by desciption", () => {
  var toDoList = new TasksList();

  toDoList.add("Entrada1", "Descripcion 1");
  toDoList.add("Entrada2", "Descripcion 2");
  toDoList.add("Entrada3", "Descripcion 3");
  
  var task;
  it("Deberia devolver una lista vacia", () => {
    var emptyTaskList = toDoList.filterByDescription("no coincide")
    expect(emptyTaskList.getTasksList()).toEqual([]);
  });
  it("Deberia devolver Entrada1", () => {
    task = toDoList.filterByDescription("Descripcion 1")
    expect(task.getTasksList()[0].getName()).toEqual("Entrada1");
  });
  it("Deberia devolver Entrada3", () => {
    task = toDoList.filterByDescription("Descripcion 3")
    expect(task.getTasksList()[0].getName()).toEqual("Entrada3");
   });
   it("Deberia devolver Entrada1, Entrada2, Entrada3", () => {
    task = toDoList.filterByDescription("Descr")
    var taskNamesLists = task.getTasksList().map(x =>  x.getName());
    expect(taskNamesLists).toEqual(["Entrada1", "Entrada2", "Entrada3"]);
   });
   it("Deberia devolver Entrada1, Entrada2, Entrada3 no siendo case sensitive", () => {
    task = toDoList.filterByDescription("descr")
    var taskNamesLists = task.getTasksList().map(x =>  x.getName());
    expect(taskNamesLists).toEqual(["Entrada1", "Entrada2", "Entrada3"]);
   });
});


describe("Add description to the tasks", () => {
  var toDoList = new TasksList()
  toDoList.add("Entrada1", "desc 1");
  toDoList.add("Entrada2", "desc 2");
  toDoList.add("Entrada3", "");
  toDoList.add("Entrada4", "desc 4");
  it("Ingresar una tarea que tenga una descripcion", () => {
    expect(toDoList.searchByName("Entrada1").getDescription()).toEqual("desc 1");
  });
  it("Se debe perimitir añadir una tarea sin descripcion", () => {
    expect(toDoList.searchByName("Entrada3").getDescription()).toEqual("");
  });
  it("Ingresar una tarea que tenga una descripcion", () => {
    expect(toDoList.searchByName("Entrada4").getDescription()).toEqual("desc 4");
  });
  });

describe("Edit task from list.", () =>{
    var toDoList = new TasksList()
    toDoList.add("Entrada1", "desc1");
    toDoList.add("Entrada2", "desc2");
    toDoList.add("Entrada3", "desc3");
    var task;
    it("Deberia devolver la lista sin ninguna modificacion", () => {
      toDoList.editTask(5);
      expect(toDoList.getTasksNamesList()).toEqual(["Entrada1", "Entrada2", "Entrada3"]);
    });
    it("Deberia editar la tarea Entrada1 con los datos de la tarea task.", () => {
      task = new Task(null,"Editar entrada1", "Editar des1");
      toDoList.editTask(1, task);
      expect(toDoList.getTasksNamesList()).toEqual(["Editar entrada1", "Entrada2", "Entrada3"]);
    });
    it("Deberia editar la tarea Entrada3 con los datos de la tarea task.", () => {
      task = new Task(null,"Editar entrada3", "Editar des3");
      toDoList.editTask(3, task)
      expect(toDoList.getTasksNamesList()).toEqual(["Editar entrada1", "Entrada2", "Editar entrada3"]);
    });
    it("Deberia editar la tarea Entrada3 con los datos de la tarea task.", () => {
      task = new Task(null,"Entrada3", null);
      toDoList.editTask(3, task)
      expect(toDoList.getTasksNamesList()).toEqual(["Editar entrada1", "Entrada2", "Entrada3"]);
    });
    it("Deberia editar la tarea Entrada3 con los datos de la tarea task.", () => {
      task = new Task(null,null, null);
      toDoList.editTask(3, task)
      expect(toDoList.getTasksNamesList()).toEqual(["Editar entrada1", "Entrada2", "Entrada3"]);
    });
});

describe("Debe devolver una lista de objetos (Task) con las task creadas", () => {
  var tasksList = new TasksList();
  var task1Name = "Task1";
  var task1Desc = "Description Task1";
  var task2Name = "Task2";
  var task2Desc = "Description Task2";
  it("Añadir tarea y descripción", () => {
    tasksList.add(task1Name,task1Desc);
    expect(tasksList.getTasksList()).toEqual([new Task(1,task1Name,task1Desc)]);
  });
  it("Añadir tarea y descripción sobre tareas previas", () => {
    tasksList.add(task2Name,task2Desc);
    expect(tasksList.getTasksList()).toEqual([new Task(1,task1Name,task1Desc), new Task(2,task2Name,task2Desc)]);
  });
});

describe("Debe devolver una lista con las task creadas (Ahora con categoria)", () => {
  let tasksList = new TasksList();
  it("Añadir tarea, descripción y categoria", () => {
    tasksList.add("Task1","Desc 1","Category 1");
    expect(tasksList.getTasksList()).toEqual([new Task(1,"Task1","Desc 1","Category 1")]);
  });
  it("Añadir tarea y descripción y categoria undefined", () => {
    tasksList.add("Task2","Desc 2",undefined);
    expect(tasksList.getTasksList()).toEqual([new Task(1,"Task1","Desc 1","Category 1"),
    new Task(2,"Task2","Desc 2")]);
  });
});

describe("Debe devolver una lista con las task creadas", () => {
  var tasksList = new TasksList();
  var task1Name = "Task1";
  var task1Desc = "Description Task1";
  var task1Date = "1995-02-11";
  tasksList.add(task1Name,task1Desc,null,task1Date);
  it("Añadir tarea y descripción", () => {
    expect(tasksList.getTasksList()).toEqual([new Task(1,task1Name,task1Desc,null,task1Date)]);
  });
  it("Añadir tarea y descripción", () => {
    expect(tasksList.getTask(1).getDeadline()).toEqual("1995-02-11");
  });
});

describe("Debe devolver una lista con las task creadas (Ahora con categoria)", () => {
  let tasksList = new TasksList();
  it("Añadir tarea, descripción y categoria", () => {
    tasksList.add("Task1","Desc 1","Category 1");
    expect(tasksList.getTasksList()).toEqual([new Task(1,"Task1","Desc 1","Category 1")]);
  });
  it("Editar solo categoria", () => {
    let task = new Task(null,null,null,"Category 30");
    tasksList.editTask(1,task);
    expect(tasksList.getTasksList()).toEqual([new Task(1,"Task1","Desc 1","Category 30")]);
  });
});


describe("getTags debe: ", () => {
  it("Extraer cada una de las #tag en un arreglo", () => {
    let description = 'Esta es una descripcion de ejemplo #gym para probar si extrae las tags #lol'
    let tagsFound = getTags(description);
    expect(tagsFound).toEqual(['#gym','#lol']);
  });
  it("Devolver en un arreglo vacio, por ausencia de tags", () => {
    let description = 'Esta es una descripcion de ejemplo sin tags para extraer';
    let tagsFound = getTags(description);
    expect(tagsFound).toEqual([]);
  });
});

describe("Task.extractTags() debe: ", () => {
  it("Extraer cada una de las #tag presentes en la descripción de una tarea, y almacenarlas en el atributo tags", () => {
    var task1Name = "Task1";
    var task1Desc = 'Esta es una descripcion de ejemplo #gym para probar si extrae las tags #lol';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date)
    task.extractTags();
    expect(task['tags']).toEqual(['#gym','#lol']);
  });
  it("Extraer cada una de las #tag sin repetir duplicados", () => {
    var task1Name = "Task1";
    var task1Desc = 'Esta es una descripcion de ejemplo #gym para probar si extrae #gym las tags #lol';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date)
    task.extractTags();
    expect(task['tags']).toEqual(['#gym','#lol']);
  });
  it("Devolver en un arreglo vacio, por ausencia de tags", () => {
    var task1Name = "Task1";
    var task1Desc =  'Esta es una descripcion de ejemplo sin tags para extraer';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date)
    task.extractTags();
    expect(task['tags']).toEqual([]);
  });
  
  it("Devolver en una cadena con los tags", () => {
    var task1Name = "Task1";
    var task1Desc =  'Esta es una descripcion de ejemplo #gym para probar si extrae las tags #lol';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date)
    task.extractTags();
    expect(task.getTagsStr()).toEqual('#gym #lol');
  });
  it("Devolver en una cadena vacia por ausencia de tags", () => {
    var task1Name = "Task1";
    var task1Desc =  'Esta es una descripcion de ejemplo sin tags para extraer';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date)
    task.extractTags();
    expect(task.getTagsStr()).toEqual('');
  });
  
});

describe("Get categorie from a task.", () => {
  var task = new Task();
  var newTask;
  it("Deberia devolver undefinea", () => {
    expect(task.getCategory()).toEqual();
  });
  it("Deberia devolver Cat1", () => {
    newTask = new Task(1, "Entrada1", "", "Cat1", "");
    task.set(newTask);
    expect(task.getCategory()).toEqual("Cat1");
  });
  it("Deberia devolver Cat3", () => {
    newTask = new Task(1, "Entrada3", "", "Cat3", "");
    task.set(newTask);
    expect(task.getCategory()).toEqual("Cat3");
  });
});

describe("Search task from a list by category", () => {
  var toDoList = new TasksList();
  toDoList.add("Entrada1", "", "Cat1", "");
  toDoList.add("Entrada2", "", "Cat2", "");
  toDoList.add("Entrada3", "", "Cat3", "");
  toDoList.add("Entrada4", "", "Cat3", "");
  var tasks; 
  it("Deberia devolver undefine", () => {
    tasks = toDoList.filterByCategory("h");
    expect(tasks.getTasksNamesList()).toEqual([]);
  });
  it("Deberia devolver Entrada1", () => {
    tasks = toDoList.filterByCategory("Cat1");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada1"]);
  });
  it("Deberia devolver la tareas que coincidan con la categoria", () => {
    tasks = toDoList.filterByCategory("Cat2");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada2"]);
  });
  it("Deberia devolver la tareas que coincidan con la categoria", () => {
    tasks = toDoList.filterByCategory("Cat3");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada3", "Entrada4"]);
  });
});

/*describe("Debe devolver una lista con las task que aun estan pendientes", () => {
  let tasksList = new TasksList();
  it("Devolver una lista con tareas mostrando el estado de las tareas creadas", () => {
    tasksList.add("Task1","Desc 1","Category 1", null);
    tasksList.add("Task2","Desc 2",null, null);
    expect(tasksList.getTasksList()).toEqual([new Task(1,"Task1","Desc 1","Category 1",null,false),new Task(2,"Task2","Desc 2",null,null,false)]);
  });
  it("Devolver una lista con tareas aun no completadas, despues de completar la tarea 2", () => {
    tasksList.CompleteTask(2,true);
    expect(tasksList.getTasksListIncompletes()).toEqual([new Task(1,"Task1","Desc 1","Category 1",null,false)]);
  });
});*/

describe("Search task from a list by tags", () => {
  var toDoList = new TasksList();
  toDoList.add("Entrada1", "desc 1 #tag1", "", "");
  toDoList.add("Entrada2", "desc 1 #tag1", "", "");
  toDoList.add("Entrada3", "desc 1 #tag2", "", "");
  toDoList.add("Entrada4", "desc 1 #tag3", "", "");
  var tasks; 
  it("Deberia devolver una lista vacia", () => {
    tasks = toDoList.filterByTag("#notatag");
    expect(tasks.getTasksNamesList()).toEqual([]);
  });
  it("Deberia devolver Entrada2", () => {
    tasks = toDoList.filterByTag("#tag2");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada3"]);
  });
  it("Deberia devolver la tareas que coincidan con la etiqueta", () => {
    tasks = toDoList.filterByTag("#tag3");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada4"]);
  });
  it("Deberia devolver la tareas que coincidan con la etiqueta", () => {
    tasks = toDoList.filterByTag("#tag1");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada1", "Entrada2"]);
  });
});

describe("addTags debe: ", () => {
  it("Agregar los tags especificados en una string a la lista de tags", () => {
    var task1Name = "Task1";
    var task1Desc =  'Esta es una descripcion de ejemplo #gym para probar si extrae las tags #lol';
    var task1Date = "1995-02-11";
    var task = new Task(1,task1Name,task1Desc,null,task1Date);
    task.extractTags();
    task.addTags('#tagFromAddTags #iLoveCode');
    expect(task.getTagsStr()).toEqual('#gym #lol #tagFromAddTags #iLoveCode');
  });
});

function automaticTaskListGenerator(numberOfTaskToAdd){
  var i = 0;
  var taskName = "Task ";
  var taskDesc =  'Example description ';
  var taskDate = "1995-02-11";
  var taskList = new TasksList();
  var task;
  while(i<numberOfTaskToAdd){
    task = new Task(null,taskName+(i+1),taskDesc+(i+1),null,taskDate+(i+1));
    taskList.addTask(task);
    i=i+1;
  }
  return taskList;
}

describe("filterTasksBy debe: ", () => {
  var taskList = automaticTaskListGenerator(3);
  var matchedTaskList;
  it("Filtrar una lista de tasks segun el campo especificado y las expresiones (pattern) buscadas 1", () => {
    matchedTaskList = taskList.filterTasksBy('name','1');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[0]]);
  });
  it("Filtrar una lista de tasks segun el 'name' y las expresiones (pattern) buscadas 2", () => {
    matchedTaskList = taskList.filterTasksBy('name','2');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[1]]);
  });
  it("Filtrar una lista de tasks segun la 'description' y las expresiones (pattern) buscadas 2", () => {
    matchedTaskList = taskList.filterTasksBy('description','2');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[1]]);
  });
  it("Devolver todas las task (que tengan 'Task' en el 'name')", () => {
    matchedTaskList = taskList.filterTasksBy('name','Task');
    expect(matchedTaskList.getTasksList()).toEqual(taskList.getTasksList());
  });
  it("Devolver una lista vacia de task (no hay ni una coincidencia)", () => {
    matchedTaskList = taskList.filterTasksBy('name','e');
    expect(matchedTaskList.getTasksList()).toEqual([]);
  });
});

describe("filterByName debe: ", () => {
  var taskList = automaticTaskListGenerator(3);
  var matchedTaskList;
  it("Filtrar una lista de tasks segun el 'name' y las expresiones (pattern) buscadas 1", () => {
    matchedTaskList = taskList.filterByName('1');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[0]]);
  });
  it("Filtrar una lista de tasks segun el 'name' y las expresiones (pattern) buscadas 2", () => {
    matchedTaskList = taskList.filterByName('2');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[1]]);
  });
  it("Devolver todas las task (que tengan 'Task' en el 'name')", () => {
    matchedTaskList = taskList.filterByName('Task');
    expect(matchedTaskList.getTasksList()).toEqual(taskList.getTasksList());
  });
  it("Devolver una lista on la Task 1", () => {
    matchedTaskList = taskList.filterByName('Task 1');
    expect(matchedTaskList.getTasksList()).toEqual([taskList.getTasksList()[0]]);
  });
  it("Devolver una lista vacia de task (no hay ni una coincidencia)", () => {
    matchedTaskList = taskList.filterByName('e');
    expect(matchedTaskList.getTasksList()).toEqual([]);
  });
});

describe("Get deadline from a task: ", () =>{
  var task = new Task();
  var newTask;
  it("Deberia devolver undefinea", () => {
    expect(task.getDeadline()).toEqual();
  });
  it("Deberia devolver 29/11/2021", () => {
    newTask = new Task(1, "Entrada1", "", "", "29/11/2021");
    task.set(newTask);
    expect(task.getDeadline()).toEqual("29/11/2021");
  });
  it("Deberia devolver 29/11/2020", () => {
    newTask = new Task(1, "Entrada2", "", "", "29/11/2020");
    task.set(newTask);
    expect(task.getDeadline()).toEqual("29/11/2020");
  });
});

describe("Search task from a list by deadline", () => {
  var toDoList = new TasksList();
  toDoList.add("Entrada1", "", "", "2022-11-29T16:29");
  toDoList.add("Entrada2", "", "", "2021-11-29T16:29");
  toDoList.add("Entrada3", "", "", "2019-11-29T16:29");
  toDoList.add("Entrada4", "", "", "2019-11-29T16:29");
  var tasks; 
  it("Deberia devolver undefine", () => {
    tasks = toDoList.filterByDeadline("h");
    expect(tasks.getTasksNamesList()).toEqual([]);
  });
  it("Deberia devolver Entrada1", () => {
    tasks = toDoList.filterByDeadline("2022-11-29");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada1"]);
  });
  it("Deberia devolver la tareas que coincidan con la categoria", () => {
    tasks = toDoList.filterByDeadline("2021-11-29");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada2"]);
  });
  it("Deberia devolver la tareas que coincidan con la categoria", () => {
    tasks = toDoList.filterByDeadline("2019-11-29");
    expect(tasks.getTasksNamesList()).toEqual(["Entrada3", "Entrada4"]);
  });
});
