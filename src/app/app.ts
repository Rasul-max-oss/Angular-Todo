import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})

export class App implements OnInit {
  taskValue = new FormControl('');
  showEditModal = false;
  editTaskIndex: number | null = null;
  editTaskTitle = '';
  editTaskCompleted = false;
  isDarkTheme = false;
  
  tasks: any[] = [
    { id: 1, title: 'Изучить Angular', completed: false },
    { id: 2, title: 'Создать компонент', completed: true },
    { id: 3, title: 'Добавить роутинг', completed: false }
  ];

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkTheme = true;
      document.body.classList.add('dark-theme');
    }
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }

  openEditModal(index: number) {
    this.editTaskIndex = index;
    this.editTaskTitle = this.tasks[index].title;
    this.editTaskCompleted = this.tasks[index].completed;
    this.showEditModal = true;
  }

  addTask() {
    const value = this.taskValue.value?.trim();
    
    if (value) {
      this.tasks.push({
        id: this.tasks.length + 1,
        title: value,
        completed: false
      });
      this.taskValue.setValue('');
    }
  }

  deleteTask(i: number) {
    this.tasks.splice(i, 1);
  }

  closeEditModal() {
    this.showEditModal = false;
    this.editTaskIndex = null;
    this.editTaskTitle = '';
    this.editTaskCompleted = false;
  }

  saveTask() {
    if (this.editTaskIndex != null && this.editTaskTitle.trim()) {
      this.tasks[this.editTaskIndex].title = this.editTaskTitle.trim();
      this.tasks[this.editTaskIndex].completed = this.editTaskCompleted;
      this.closeEditModal();
    }
  }

  
}