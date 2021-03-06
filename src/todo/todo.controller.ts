import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('todo')
export class TodoController {
  @Get()
  gettodo() {
    console.log('Récuperer la liste todo');
    return 'Liste todo';
  }
  @Post()
  addtodo() {
    console.log('Ajouter un todo au liste todo');
    return 'add todo';
  }
  @Put()
  modifiertodo() {
    console.log('modifier l un des todo la liste todo');
    return 'modifier todo';
  }
  @Delete()
  supprimertodo() {
    console.log('supprimer un todo de la liste todo');
    return 'supprimer todo';
  }
}
