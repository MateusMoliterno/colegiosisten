import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sistema Acadêmico';

  aluno = { matricula: 0, nome: '', dataNascimento: '', turma: '' };
  professor = { id: 0, nome: '', areaAtuacao: '', telefone: '' };
  turma = { codigo: '', nome: '', periodo: '', idProfessor: 0 };

  alunos: any[] = [];
  professores: any[] = [];
  turmas: any[] = [];

  matriculaParaExcluir: number = 0;
  idProfessorParaExcluir: number = 0;
  codigoTurmaParaExcluir: string = '';

  constructor() {
    this.carregarDados();
  }

  carregarDados() {
    this.alunos = JSON.parse(localStorage.getItem('alunos') || '[]');
    this.professores = JSON.parse(localStorage.getItem('professores') || '[]');
    this.turmas = JSON.parse(localStorage.getItem('turmas') || '[]');
  }

  salvarDados() {
    localStorage.setItem('alunos', JSON.stringify(this.alunos));
    localStorage.setItem('professores', JSON.stringify(this.professores));
    localStorage.setItem('turmas', JSON.stringify(this.turmas));
  }

  adicionarAluno() {
    if (!this.aluno.matricula || !this.aluno.nome || !this.aluno.dataNascimento || !this.aluno.turma) {
      alert('Preencha todos os campos do aluno!');
      return;
    }
    if (this.alunos.some(a => a.matricula === this.aluno.matricula)) {
      alert('Já existe um aluno com esta matrícula!');
      return;
    }
    this.alunos.push({ ...this.aluno });
    this.salvarDados();
    this.aluno = { matricula: 0, nome: '', dataNascimento: '', turma: '' };
  }

  editarAluno(aluno: any) {
    const novoNome = prompt('Novo nome:', aluno.nome);
    const novaDataNascimento = prompt('Nova data de nascimento:', aluno.dataNascimento);
    const novaTurma = prompt('Nova turma:', aluno.turma);

    if (novoNome && novaDataNascimento && novaTurma) {
      aluno.nome = novoNome;
      aluno.dataNascimento = novaDataNascimento;
      aluno.turma = novaTurma;
      this.salvarDados();
    }
  }

  deletarAluno(matricula: number) {
    this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
    this.salvarDados();
  }

  deletarAlunoPorId() {
    this.deletarAluno(this.matriculaParaExcluir);
    this.matriculaParaExcluir = 0;
  }

  adicionarProfessor() {
    if (!this.professor.id || !this.professor.nome || !this.professor.areaAtuacao || !this.professor.telefone) {
      alert('Preencha todos os campos do professor!');
      return;
    }
    if (this.professores.some(p => p.id === this.professor.id)) {
      alert('Já existe um professor com este ID!');
      return;
    }
    this.professores.push({ ...this.professor });
    this.salvarDados();
    this.professor = { id: 0, nome: '', areaAtuacao: '', telefone: '' };
  }

  editarProfessor(professor: any) {
    const novoNome = prompt('Novo nome:', professor.nome);
    const novaAreaAtuacao = prompt('Nova área de atuação:', professor.areaAtuacao);
    const novoTelefone = prompt('Novo telefone:', professor.telefone);

    if (novoNome && novaAreaAtuacao && novoTelefone) {
      professor.nome = novoNome;
      professor.areaAtuacao = novaAreaAtuacao;
      professor.telefone = novoTelefone;
      this.salvarDados();
    }
  }

  deletarProfessor(id: number) {
    this.professores = this.professores.filter(professor => professor.id !== id);
    this.salvarDados();
  }

  deletarProfessorPorId() {
    this.deletarProfessor(this.idProfessorParaExcluir);
    this.idProfessorParaExcluir = 0;
  }

  adicionarTurma() {
    if (!this.turma.codigo || !this.turma.nome || !this.turma.periodo || !this.turma.idProfessor) {
      alert('Preencha todos os campos da turma!');
      return;
    }
    if (this.turmas.some(t => t.codigo === this.turma.codigo)) {
      alert('Já existe uma turma com este código!');
      return;
    }
    this.turmas.push({ ...this.turma });
    this.salvarDados();
    this.turma = { codigo: '', nome: '', periodo: '', idProfessor: 0 };
  }

  editarTurma(turma: any) {
    const novoNome = prompt('Novo nome:', turma.nome);
    const novoPeriodo = prompt('Novo período:', turma.periodo);
    const novoIdProfessor = prompt('Novo ID do professor:', turma.idProfessor);

    if (novoNome && novoPeriodo && novoIdProfessor) {
      turma.nome = novoNome;
      turma.periodo = novoPeriodo;
      turma.idProfessor = parseInt(novoIdProfessor, 10);
      this.salvarDados();
    }
  }

  deletarTurma(codigo: string) {
    this.turmas = this.turmas.filter(turma => turma.codigo !== codigo);
    this.salvarDados();
  }

  deletarTurmaPorId() {
    this.deletarTurma(this.codigoTurmaParaExcluir);
    this.codigoTurmaParaExcluir = '';
  }
}

