import { Component, Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Student {
  id: number;
  name: string;
  department: string;
  marks: number;
}

// TODO 1: mark this class as an injectable service, available app-wide
export class StudentsService {
  // TODO 2: get HttpClient with inject()

  // TODO 3: getAll() asks GET http://localhost:3000/students and returns the Observable
}

// TODO 4: make this a component with selector 'app-student-list'
export class StudentListComponent {
  // TODO 5: inject StudentsService
  // TODO 6: a signal holding an empty array of students
  // TODO 7: constructor that calls the service and stores the answer in the signal
}

// TODO 8: the template shows each student with @for, tracked by id
