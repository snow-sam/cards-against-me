'use server'

import fs from 'fs/promises';
import path from 'path';

export const getQuestion = async (): Promise<string> => {
    const questions = path.join(process.cwd(), 'public', 'data.json');
    try {
      const data = await fs.readFile(questions, 'utf8');
      const dataJson = JSON.parse(data);
      return dataJson['question'];
    } catch (error) {
      console.error('Error reading the JSON file:', error);
      return '';
    }
}

export const getPlayerDeck = async (): Promise<string[]> => {
    const questions = path.join(process.cwd(), 'public', 'data.json');
    try {
      const data = await fs.readFile(questions, 'utf8');
      const dataJson = JSON.parse(data);
      return dataJson['answers'];
    } catch (error) {
      console.error('Error reading the JSON file:', error);
      return [];
    }
}