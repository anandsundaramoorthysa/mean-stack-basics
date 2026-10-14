import * as vscode from 'vscode';
import { Course, Lesson, Track } from './types';
import { ProgressStore } from './progress';

export type Node = { kind: 'track'; track: Track } | { kind: 'lesson'; lesson: Lesson };

export class CourseTree implements vscode.TreeDataProvider<Node> {
  private readonly emitter = new vscode.EventEmitter<Node | undefined>();
  readonly onDidChangeTreeData = this.emitter.event;

  constructor(private course: Course, private store: ProgressStore) {}

  refresh(): void {
    this.emitter.fire(undefined);
  }

  getTreeItem(node: Node): vscode.TreeItem {
    if (node.kind === 'track') {
      const sum = this.store.trackSummary(this.course, node.track.id);
      const complete = sum.total > 0 && sum.done === sum.total;
      const firstOpen = this.course.tracks.find((t) => {
        const s = this.store.trackSummary(this.course, t.id);
        return s.total > 0 && s.done < s.total;
      });
      const state = firstOpen?.id === node.track.id ? vscode.TreeItemCollapsibleState.Expanded : vscode.TreeItemCollapsibleState.Collapsed;
      const item = new vscode.TreeItem(node.track.title, state);
      item.id = `track:${node.track.id}`;
      item.description = `${sum.done}/${sum.total}`;
      item.tooltip = new vscode.MarkdownString(`**${node.track.title}**\n\n${node.track.summary}`);
      item.iconPath = new vscode.ThemeIcon(complete ? 'pass-filled' : node.track.legacy ? 'archive' : 'folder');
      item.contextValue = complete ? 'trackComplete' : 'track';
      return item;
    }
    const lesson = node.lesson;
    const done = this.store.done(lesson);
    const started = !done && (this.store.get(lesson.id).attempts > 0 || Object.keys(this.store.get(lesson.id).quiz).length > 0);
    const number = lesson.folder.slice(0, 2);
    const item = new vscode.TreeItem(`${number}  ${lesson.title}`, vscode.TreeItemCollapsibleState.None);
    item.id = `lesson:${lesson.id}`;
    item.description = `${lesson.minutes} min`;
    item.tooltip = new vscode.MarkdownString(`**${lesson.title}**\n\n${lesson.summary}`);
    item.iconPath = new vscode.ThemeIcon(done ? 'pass-filled' : started ? 'circle-large-filled' : 'circle-large-outline');
    item.contextValue = 'lesson';
    item.command = { command: 'meanStackBasics.openLesson', title: 'Open Lesson', arguments: [lesson.id] };
    return item;
  }

  getChildren(node?: Node): Node[] {
    if (!node) return this.course.tracks.filter((t) => this.course.lessons.some((l) => l.track === t.id)).map((track) => ({ kind: 'track', track }));
    if (node.kind === 'track') {
      return this.course.lessons.filter((l) => l.track === node.track.id).map((lesson) => ({ kind: 'lesson', lesson }));
    }
    return [];
  }

  getParent(node: Node): Node | undefined {
    if (node.kind === 'lesson') {
      const track = this.course.tracks.find((t) => t.id === node.lesson.track);
      return track ? { kind: 'track', track } : undefined;
    }
    return undefined;
  }
}
