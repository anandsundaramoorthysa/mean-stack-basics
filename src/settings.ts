import * as vscode from 'vscode';
import { AiConfig } from './ai/client';

export interface Settings {
  courseFolder: string;
  aiEnabled: boolean;
  ai: AiConfig;
  aiDailyLimit: number;
}

export function readSettings(): Settings {
  const c = vscode.workspace.getConfiguration('meanStackBasics');
  const param = c.get<string>('ai.maxTokensParam', 'max_tokens');
  return {
    courseFolder: c.get<string>('courseFolder', ''),
    aiEnabled: c.get<boolean>('ai.enabled', false),
    aiDailyLimit: c.get<number>('ai.dailyLimit', 50),
    ai: {
      baseUrl: c.get<string>('ai.baseUrl', 'http://localhost:11434/v1'),
      model: c.get<string>('ai.model', ''),
      maxTokens: c.get<number>('ai.maxTokens', 400),
      maxTokensParam: param === 'max_completion_tokens' ? 'max_completion_tokens' : 'max_tokens',
    },
  };
}
