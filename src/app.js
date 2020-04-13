const express = require("express");
const cors = require("cors");
const {uuid} = require('uuidv4');

// const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];


app.get("/repositories", (request, response) => {
  // TODO
  const {title} = request.query;
  const results = (title !== undefined) ? repositories.filter(repository => repositories.title.includes(title)): repositories;
  if(results.length === 0){
    return response.status(204).json(results);
  }else{
    return response.json(results);
  }
});

app.post("/repositories", (request, response) => {
  // TODO
  const {title,url,techs} = request.body;

  const repository = {id:uuid(), title, url,techs,likes:0};

  repositories.push(repository);

  return response.json(repository);

});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title,url,techs} = request.body;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex >= 0){
    const newRepository = {
      id,
      title,
      url,
      techs,
      likes:repositories[repositoryIndex].likes
    }
    repositories[repositoryIndex] = newRepository;
    return response.json(newRepository);
  }else{
    return response.status(400).json({erro:'Repository not found'});
  }
  
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex >= 0){
    repositories.splice(repositoryIndex,1);
    return response.status(204).json('');
  }else{
    return response.status(400).json({erro:'repository not found'});
  }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
   
  const repository = repositories.find(repository => repository.id === id);
  
  if(repository != undefined){
      repository.likes = repository.likes + 1;
      return response.json(repository);
    
  }else{
    return response.status(400).json({erro:'repository not found'});
  }
  
  
});

module.exports = app;
